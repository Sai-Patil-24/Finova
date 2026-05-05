import os
from dotenv import load_dotenv
from typing import TypedDict, Annotated, Literal
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition

from tools import (
    research_tools,
    analysis_tools,
    advice_tools,
    news_tools,
    investment_tools,
    all_tools
)

load_dotenv()
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY")

# Initialize LLM with Gemini
try:
    llm = ChatGoogleGenerativeAI(model="gemini-3-flash-preview", temperature=0.1)
except Exception as e:
    print(f"Error initializing Gemini LLM: {e}")
    # Fallback or placeholder
    llm = None

# Define state
class State(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    agent_type: str  # e.g. 'auto', 'analysis', 'research', etc.

# Bind tools to specific agents
if llm:
    research_llm = llm.bind_tools(research_tools)
    analysis_llm = llm.bind_tools(analysis_tools)
    advice_llm = llm.bind_tools(advice_tools)
    news_llm = llm.bind_tools(news_tools)
    investment_llm = llm.bind_tools(investment_tools)
else:
    research_llm = analysis_llm = advice_llm = news_llm = investment_llm = None

# Define Nodes with better error handling
def research_node(state: State):
    """Handles data, price, learning, and general research queries."""
    if not research_llm:
        return {"messages": [HumanMessage(content="Error: LLM not initialized. Please check your GROQ_API_KEY.")]}
    try:
        sys_msg = SystemMessage(content="You are a financial research assistant. Use tools to gather data, fetch stock prices, or explain financial concepts.")
        response = research_llm.invoke([sys_msg] + state["messages"])
        return {"messages": [response]}
    except Exception as e:
        print(f"Error in research_node: {e}")
        return {"messages": [HumanMessage(content=f"⚠️ LLM Error (Research): {str(e)}")]}

def analysis_node(state: State):
    if not analysis_llm:
        return {"messages": [HumanMessage(content="Error: LLM not initialized.")]}
    try:
        sys_msg = SystemMessage(content="You are a financial analyst. Analyze portfolios and market conditions using your tools.")
        response = analysis_llm.invoke([sys_msg] + state["messages"])
        return {"messages": [response]}
    except Exception as e:
        print(f"Error in analysis_node: {e}")
        return {"messages": [HumanMessage(content=f"⚠️ LLM Error (Analysis): {str(e)}")]}

def advice_node(state: State):
    if not advice_llm:
        return {"messages": [HumanMessage(content="Error: LLM not initialized.")]}
    try:
        sys_msg = SystemMessage(content="You are a financial advisor. Provide structured, safe, and helpful financial advice.")
        response = advice_llm.invoke([sys_msg] + state["messages"])
        return {"messages": [response]}
    except Exception as e:
        print(f"Error in advice_node: {e}")
        return {"messages": [HumanMessage(content=f"⚠️ LLM Error (Advice): {str(e)}")]}

def news_node(state: State):
    if not news_llm:
        return {"messages": [HumanMessage(content="Error: LLM not initialized.")]}
    try:
        sys_msg = SystemMessage(content="You are a financial news reporter. Fetch the latest updates on the markets.")
        response = news_llm.invoke([sys_msg] + state["messages"])
        return {"messages": [response]}
    except Exception as e:
        print(f"Error in news_node: {e}")
        return {"messages": [HumanMessage(content=f"⚠️ LLM Error (News): {str(e)}")]}

def investment_node(state: State):
    if not investment_llm:
        return {"messages": [HumanMessage(content="Error: LLM not initialized.")]}
    try:
        sys_msg = SystemMessage(content="You are an investment strategist. Suggest instruments and evaluate investment profiles.")
        response = investment_llm.invoke([sys_msg] + state["messages"])
        return {"messages": [response]}
    except Exception as e:
        print(f"Error in investment_node: {e}")
        return {"messages": [HumanMessage(content=f"⚠️ LLM Error (Investment): {str(e)}")]}

def router_node(state: State):
    """If agent_type is 'auto', decide which agent should handle it based on the last message."""
    try:
        last_message = state["messages"][-1].content.lower()
        
        # Simple keyword routing for demonstration.
        if "news" in last_message or "update" in last_message:
            route = "news"
        elif "portfolio" in last_message or "analyze" in last_message:
            route = "analysis"
        elif "advice" in last_message or "should i" in last_message or "invest" in last_message:
            route = "advice"
        elif "instrument" in last_message or "option" in last_message:
            route = "investment"
        else:
            route = "research"
        
        if route == "news":
            return news_node(state)
        elif route == "analysis":
            return analysis_node(state)
        elif route == "advice":
            return advice_node(state)
        elif route == "investment":
            return investment_node(state)
        else:
            return research_node(state)
    except Exception as e:
        print(f"Error in router_node: {e}")
        return research_node(state) # Fallback to research

# Tool Node handles execution for all agents
tool_node = ToolNode(all_tools)

def route_request(state: State):
    agent_type = state.get("agent_type", "auto")
    
    # Map frontend agent types to backend agents
    if agent_type in ["data", "price", "learning", "research"]:
        return "research"
    elif agent_type == "analysis":
        return "analysis"
    elif agent_type == "advice":
        return "advice"
    elif agent_type == "news":
        return "news"
    elif agent_type == "investment":
        return "investment"
    else:
        return "auto" # default to router

# Custom routing from the LLM outputs to tools
def custom_tools_condition(state: State):
    last_msg = state["messages"][-1]
    if hasattr(last_msg, "tool_calls") and len(last_msg.tool_calls) > 0:
        return "tools"
    return END

# Build Graph
builder = StateGraph(State)

builder.add_node("router", router_node)
builder.add_node("research", research_node)
builder.add_node("analysis", analysis_node)
builder.add_node("advice", advice_node)
builder.add_node("news", news_node)
builder.add_node("investment", investment_node)
builder.add_node("tools", tool_node)

builder.add_conditional_edges(START, route_request, {
    "auto": "router",
    "research": "research",
    "analysis": "analysis",
    "advice": "advice",
    "news": "news",
    "investment": "investment"
})

builder.add_conditional_edges("router", custom_tools_condition, {"tools": "tools", END: END})
builder.add_conditional_edges("research", custom_tools_condition, {"tools": "tools", END: END})
builder.add_conditional_edges("analysis", custom_tools_condition, {"tools": "tools", END: END})
builder.add_conditional_edges("advice", custom_tools_condition, {"tools": "tools", END: END})
builder.add_conditional_edges("news", custom_tools_condition, {"tools": "tools", END: END})
builder.add_conditional_edges("investment", custom_tools_condition, {"tools": "tools", END: END})

# After tools complete, go back to the original agent.
def synthesizer_node(state: State):
    if not llm:
        return {"messages": [HumanMessage(content="Error: LLM not initialized.")]}
    try:
        sys_msg = SystemMessage(content="You are a helpful financial AI. Synthesize the tool results into a user friendly response.")
        response = llm.invoke([sys_msg] + state["messages"])
        return {"messages": [response]}
    except Exception as e:
        print(f"Error in synthesizer_node: {e}")
        return {"messages": [HumanMessage(content=f"⚠️ LLM Error (Synthesis): {str(e)}")]}

builder.add_node("synthesizer", synthesizer_node)
builder.add_edge("tools", "synthesizer")
builder.add_edge("synthesizer", END)

graph = builder.compile()

graph = builder.compile()