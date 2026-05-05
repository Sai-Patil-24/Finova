import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_core.messages import HumanMessage
from workflow import graph

app = FastAPI(title="Finova API", description="Finance AI Agent Backend", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for dev. In prod, specify the exact frontend URL.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    agent: str = "auto"

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # Construct state for LangGraph
        initial_state = {
            "messages": [HumanMessage(content=request.message)],
            "agent_type": request.agent
        }
        
        # Invoke the graph
        response_state = graph.invoke(initial_state)
        
        # Extract the final message
        final_message = response_state["messages"][-1].content
        
        return {"response": final_message}
    except Exception as e:
        print(f"ERROR in chat_endpoint: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Finova Backend is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
