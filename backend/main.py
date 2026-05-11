import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from langchain_core.messages import HumanMessage
from workflow import graph
from sqlalchemy.orm import Session
from database import init_db, get_db, User, ChatSession, ChatMessage
from datetime import datetime

app = FastAPI(title="Finova API", description="Finance AI Agent Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

class ChatRequest(BaseModel):
    message: str
    agent: str = "auto"
    web_search: bool = False   # If true, force a web search regardless of agent
    user_id: Optional[str] = None
    session_id: Optional[str] = None

@app.post("/chat")
async def chat_endpoint(request: ChatRequest, db: Session = Depends(get_db)):
    try:
        # Save user message if session is provided
        if request.user_id and request.session_id and db:
            # Create user if not exists
            user = db.query(User).filter(User.id == request.user_id).first()
            if not user:
                user = User(id=request.user_id)
                db.add(user)
                db.commit()
            
            # Create session if not exists
            session = db.query(ChatSession).filter(ChatSession.id == request.session_id).first()
            if not session:
                session = ChatSession(
                    id=request.session_id, 
                    user_id=request.user_id,
                    title=request.message[:30] + "..." if len(request.message) > 30 else request.message
                )
                db.add(session)
                db.commit()
            
            # Save user message
            user_msg = ChatMessage(session_id=request.session_id, role="user", content=request.message)
            db.add(user_msg)
            db.commit()

        # Fetch previous messages for context
        history_messages = []
        if request.session_id and db:
            past_msgs = db.query(ChatMessage).filter(ChatMessage.session_id == request.session_id).order_by(ChatMessage.created_at.asc()).all()
            from langchain_core.messages import HumanMessage, AIMessage
            for m in past_msgs:
                if m.role == "user":
                    history_messages.append(HumanMessage(content=m.content))
                elif m.role == "ai":
                    history_messages.append(AIMessage(content=m.content))
        
        # Add the current message
        history_messages.append(HumanMessage(content=request.message))

        initial_state = {
            "messages": history_messages,
            "agent_type": request.agent,
            "web_search": request.web_search,
            "steps": [],        # Tool activity log (filled by nodes)
        }

        response_state = graph.invoke(initial_state)

        final_message = response_state["messages"][-1].content
        steps = response_state.get("steps", [])
        usage = response_state.get("usage", {})

        # Save AI message
        if request.session_id and db:
            ai_msg = ChatMessage(session_id=request.session_id, role="ai", content=final_message)
            db.add(ai_msg)
            db.commit()

        return {
            "response": final_message,
            "steps": steps,       # e.g. ["🔍 Searching web for 'RELIANCE stock'", "📈 Got price: ₹2,450"]
            "usage": usage,       # e.g. {"node": "research", "tools_called": ["search_tool"]}
        }
    except Exception as e:
        print(f"ERROR in chat_endpoint: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/sessions/{user_id}")
def get_sessions(user_id: str, db: Session = Depends(get_db)):
    if not db:
        return []
    sessions = db.query(ChatSession).filter(ChatSession.user_id == user_id).order_by(ChatSession.created_at.desc()).all()
    return [{"id": s.id, "title": s.title, "created_at": s.created_at} for s in sessions]

@app.get("/sessions/messages/{session_id}")
def get_messages(session_id: str, db: Session = Depends(get_db)):
    if not db:
        return []
    messages = db.query(ChatMessage).filter(ChatMessage.session_id == session_id).order_by(ChatMessage.created_at.asc()).all()
    return [{"id": m.id, "role": m.role, "content": m.content, "created_at": m.created_at} for m in messages]

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Finova Backend is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
