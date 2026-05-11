import os
from dotenv import load_dotenv
from typing import TypedDict, Annotated, List
from langchain_groq import ChatGroq
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

load_dotenv()

_groq_key = os.getenv("GROQ_API_KEY")
if _groq_key:
    os.environ["GROQ_API_KEY"] = _groq_key

# Initialize LLM
try:
    llm = ChatGroq(model="llama-3.1-8b-instant", temperature=0.7, max_tokens=1024)
except Exception as e:
    print(f"Error initializing LLM: {e}")
    llm = None

# ─── Disclaimer ───────────────────────────────────────────────────────────────
DISCLAIMER = (
    "\n\n---\n"
    "*⚠️ This platform provides educational insights, not financial advice. "
    "Please consult a certified advisor before making investment decisions.*"
)

# ─── State ────────────────────────────────────────────────────────────────────
class State(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    agent_type: str
    web_search: bool          # Frontend "Search the web" toggle
    steps: List[str]          # Tool activity log shown in UI
    usage: dict               # Which node + tools were called

# ─── Shared Persona ───────────────────────────────────────────────────────────
PERSONA = (
    "Your name is Finova. You are a friendly, knowledgeable financial education assistant "
    "with a strong focus on Indian markets (NSE, BSE, Sensex, Nifty, SEBI regulations, RBI policies). "
    "Communicate like a smart friend who knows a lot about Indian and global finance — warm, direct, clear. "
    "Respond conversationally: acknowledge what the user asked, then answer naturally. "
    "Use markdown (bold, bullet points) only when it genuinely helps clarity — don't overdo it. "
    "Never start with 'As an AI'. Speak in first person and match the energy of the message.\n\n"
    "RESPONSE LENGTH RULES:\n"
    "- Casual greetings or simple yes/no: 1-2 sentences max.\n"
    "- Simple factual questions (price, definition): 2-4 sentences.\n"
    "- Moderate explanations: 3-5 short paragraphs or a brief list.\n"
    "- Complex questions (portfolio, multi-step advice): up to 250 words max.\n"
    "Never pad responses. If you've answered, stop."
)

# ─── Helper: Indian ticker resolver ───────────────────────────────────────────
def _resolve_indian_ticker(raw_ticker: str) -> str:
    """Append .NS (NSE) if the ticker looks Indian and doesn't already have a suffix."""
    t = raw_ticker.strip().upper()
    
    # Common Indian Indices mapping for yfinance
    indices = {
        "NIFTY": "^NSEI",
        "NIFTY50": "^NSEI",
        "NIFTY 50": "^NSEI",
        "SENSEX": "^BSESN",
        "BSESENSEX": "^BSESN",
        "BANKNIFTY": "^NSEBANK",
        "NIFTYBANK": "^NSEBANK",
    }
    if t in indices:
        return indices[t]

    known_indian = {
        "RELIANCE", "TCS", "INFY", "HDFC", "HDFCBANK", "ICICIBANK",
        "SBIN", "WIPRO", "BAJFINANCE", "LT", "TATAMOTORS", "TATASTEEL",
        "AXISBANK", "KOTAKBANK", "ITC", "ONGC", "ADANIENT", "ADANIPORTS",
        "MARUTI", "SUNPHARMA", "HINDALCO", "GRASIM", "NTPC", "POWERGRID",
        "HCLTECH", "TECHM", "ULTRACEMCO", "BRITANNIA", "NESTLEIND",
        "DRREDDY", "CIPLA", "DIVISLAB", "BAJAJFINSV", "HEROMOTOCO",
    }
    # If no exchange suffix and looks like Indian company name, use NSE
    if "." not in t and t in known_indian:
        return f"{t}.NS"
    return t


# ─── Nodes ────────────────────────────────────────────────────────────────────

def research_node(state: State):
    """Handles stock prices, financial research, and web search queries with robust fallbacks."""
    if not llm:
        return {"messages": [HumanMessage(content="Error: LLM not initialized.")], "steps": [], "usage": {}}
    try:
        from tools import get_stock_price, search_tool
        user_msg = state["messages"][-1].content
        web_search_forced = state.get("web_search", False)
        steps = []
        tool_result = ""

        # Plan: decide action
        planner_msg = llm.invoke([
            SystemMessage(content=(
                "Given the user's query, decide the best lookup approach for INDIAN markets primarily. "
                "Reply with ONLY one of these action lines:\n"
                "- STOCK:<TICKER_OR_INDEX> (e.g. STOCK:RELIANCE, STOCK:NIFTY) if asking for a price\n"
                "- SEARCH:<search query focusing on India> if asking a factual question\n"
                "- EXPLAIN:<topic> if asking for a concept explanation\n"
                "For Indian companies, prefer ticker without suffix or with .NS suffix."
            )),
            HumanMessage(content=user_msg)
        ])
        plan = planner_msg.content.strip().split("\n")[0]

        if plan.startswith("STOCK:"):
            raw_ticker = plan[6:].strip()
            ticker = _resolve_indian_ticker(raw_ticker)
            steps.append(f"📈 Fetching price for {ticker}")
            tool_result = get_stock_price.func(ticker)
            
            # If stock price fails, automatically fallback to search
            if "No price data" in tool_result or "Error" in tool_result:
                steps.append(f"🔍 Stock lookup failed, trying web search...")
                india_query = f"{user_msg} current market price India NSE BSE"
                search_res = search_tool.func(india_query)
                if "No search results" not in search_res:
                    tool_result = f"Note: Live price lookup failed, but found this: {search_res}"

        if (web_search_forced or plan.startswith("SEARCH:") or not tool_result) and not tool_result:
            query = plan[7:].strip() if plan.startswith("SEARCH:") else user_msg
            india_query = f"{query} India finance markets" if "india" not in query.lower() else query
            steps.append(f"🔍 Searching web for \"{query}\"")
            tool_result = search_tool.func(india_query)

        sys_msg = SystemMessage(content=(
            f"{PERSONA}\n\n"
            "You're helping with a research or data question about Indian/global markets. "
            "If data is provided below, use it for a clear direct answer. "
            "If no data (or search failed), answer from your internal knowledge but be transparent. "
            "Do not make specific buy/sell calls. "
            "**Length: 2-4 sentences for simple facts; up to 150 words for complex topics.**"
        ))
        context = f"User Question: {user_msg}"
        if tool_result:
            context += f"\n\n[Data retrieved from tools]: {tool_result}"

        response = llm.invoke([sys_msg, HumanMessage(content=context)])
        content = response.content + DISCLAIMER
        
        # Determine actual tools used for usage tracking
        tools_called = []
        if any("price" in s.lower() or "stock" in s.lower() for s in steps):
            tools_called.append("get_stock_price")
        if any("search" in s.lower() for s in steps):
            tools_called.append("search_tool")

        return {
            "messages": [HumanMessage(content=content)],
            "steps": steps,
            "usage": {"node": "research", "tools_called": tools_called},
        }
    except Exception as e:
        print(f"Error in research_node: {e}")
        return {"messages": [HumanMessage(content=f"Hmm, something went wrong. Could you try rephrasing? ({str(e)})")], "steps": [], "usage": {}}


def analysis_node(state: State):
    if not llm:
        return {"messages": [HumanMessage(content="Error: LLM not initialized.")], "steps": [], "usage": {}}
    try:
        from tools import analyze_portfolio
        user_msg = state["messages"][-1].content
        steps = ["📊 Running portfolio analysis"]

        portfolio_data = analyze_portfolio.func(user_msg)

        sys_msg = SystemMessage(content=(
            f"{PERSONA}\n\n"
            "You're helping someone understand their portfolio with a focus on Indian market instruments "
            "(Nifty, Sensex, mutual funds, SIPs, ELSS, etc.). Break it down clearly: "
            "allocation, diversification, general risk level, and key patterns. "
            "Be direct and specific. Don't make personalised buy/sell calls. "
            "**Length: 150-250 words. Use bullet points for breakdown, then a short summary.**"
        ))
        context = f"{user_msg}\n\n[Portfolio data]: {portfolio_data}"
        response = llm.invoke([sys_msg, HumanMessage(content=context)])
        content = response.content + DISCLAIMER
        return {
            "messages": [HumanMessage(content=content)],
            "steps": steps,
            "usage": {"node": "analysis", "tools_called": ["analyze_portfolio"]},
        }
    except Exception as e:
        print(f"Error in analysis_node: {e}")
        return {"messages": [HumanMessage(content=f"Something went wrong. Try again? ({str(e)})")], "steps": [], "usage": {}}


def advice_node(state: State):
    if not llm:
        return {"messages": [HumanMessage(content="Error: LLM not initialized.")], "steps": [], "usage": {}}
    try:
        sys_msg = SystemMessage(content=(
            f"{PERSONA}\n\n"
            "You're helping someone think through a financial question. "
            "Be warm and genuinely helpful — like a knowledgeable friend who understands Indian tax laws, "
            "SEBI regulations, and Indian financial products (NPS, PPF, ELSS, FD, RD, etc.). "
            "Cover key considerations and common approaches. Be honest about trade-offs. Don't be preachy. "
            "**Length: 150-200 words max. Be concise but complete.**"
        ))
        response = llm.invoke([sys_msg] + state["messages"])
        content = response.content + DISCLAIMER
        return {
            "messages": [HumanMessage(content=content)],
            "steps": ["💡 Generating personalised guidance"],
            "usage": {"node": "advice", "tools_called": []},
        }
    except Exception as e:
        print(f"Error in advice_node: {e}")
        return {"messages": [HumanMessage(content=f"LLM Error (Advice): {str(e)})")], "steps": [], "usage": {}}


def news_node(state: State):
    """Fetches financial news and synthesizes a response."""
    if not llm:
        return {"messages": [HumanMessage(content="Error: LLM not initialized.")], "steps": [], "usage": {}}
    try:
        from tools import get_financial_news
        user_msg = state["messages"][-1].content
        steps = [f"📰 Fetching financial news for \"{user_msg[:40]}\""]

        news_data = get_financial_news.func(user_msg)

        sys_msg = SystemMessage(content=(
            f"{PERSONA}\n\n"
            "You're giving a market news update focused on Indian markets (BSE, NSE, Sensex, Nifty, RBI). "
            "Be crisp and engaging — like a smart friend catching up on what's happening. "
            "Highlight the most important points from the news data. "
            "If data is limited, be transparent and add brief context. "
            "Don't make buy/sell calls. "
            "**Length: 3-5 bullet points max, each 1-2 lines. No long paragraphs.**"
        ))
        response = llm.invoke([sys_msg, HumanMessage(content=f"{user_msg}\n\n[News data]: {news_data}")])
        content = response.content + DISCLAIMER
        return {
            "messages": [HumanMessage(content=content)],
            "steps": steps,
            "usage": {"node": "news", "tools_called": ["get_financial_news"]},
        }
    except Exception as e:
        print(f"Error in news_node: {e}")
        return {"messages": [HumanMessage(content=f"Couldn't fetch the latest news. Try again in a moment!")], "steps": [], "usage": {}}


def investment_node(state: State):
    if not llm:
        return {"messages": [HumanMessage(content="Error: LLM not initialized.")], "steps": [], "usage": {}}
    try:
        sys_msg = SystemMessage(content=(
            f"{PERSONA}\n\n"
            "You're helping someone explore investment options in India and globally. "
            "Explain different instruments (SIP, ELSS, NPS, PPF, FD, RD, Nifty ETFs, REITs, etc.), "
            "how they work, their risk/return profile, tax implications under Indian law (Section 80C, LTCG, etc.), "
            "and what type of investor each suits. "
            "Be conversational. Don't tell them exactly what to buy. "
            "**Length: 150-200 words. Short intro + bullet points per option.**"
        ))
        response = llm.invoke([sys_msg] + state["messages"])
        content = response.content + DISCLAIMER
        return {
            "messages": [HumanMessage(content=content)],
            "steps": ["💰 Exploring investment options"],
            "usage": {"node": "investment", "tools_called": []},
        }
    except Exception as e:
        print(f"Error in investment_node: {e}")
        return {"messages": [HumanMessage(content=f"LLM Error (Investment): {str(e)}")], "steps": [], "usage": {}}


def general_node(state: State):
    """Handles greetings, casual chat, and non-financial queries."""
    if not llm:
        return {"messages": [HumanMessage(content="Error: LLM not initialized.")], "steps": [], "usage": {}}
    try:
        sys_msg = SystemMessage(content=(
            f"{PERSONA}\n\n"
            "The user is just chatting. Respond warmly and naturally in 1-2 sentences. "
            "If they greeted you, be friendly and invite them to ask a finance question. "
            "Do NOT launch into a financial lecture. Keep it short and human."
        ))
        response = llm.invoke([sys_msg] + state["messages"])
        return {
            "messages": [response],
            "steps": [],
            "usage": {"node": "general", "tools_called": []},
        }
    except Exception as e:
        print(f"Error in general_node: {e}")
        return {"messages": [HumanMessage(content="Hey! I'm Finova. What finance question can I help you with?")], "steps": [], "usage": {}}


# ─── LLM-Based Intent Router ──────────────────────────────────────────────────
_router_llm = ChatGroq(model="llama-3.1-8b-instant", temperature=0) if llm else None

ROUTER_SYSTEM_PROMPT = """You are a query classifier for Finova, an Indian financial education assistant.
Read the user's message and decide which agent should handle it.

Agents:
- general: Greetings (hello, hi, how are you), casual chat, thanks, or ANYTHING not finance-related.
- research: Stock prices, company data, financial concepts, definitions, factual questions.
- news: Recent market events, headlines, market updates, what happened today.
- analysis: Analysing a portfolio, comparing assets, evaluating investment mix.
- advice: Personal financial guidance, budgeting, retirement planning, goal-setting.
- investment: Exploring investment instruments — SIPs, mutual funds, FDs, bonds, ETFs, NPS, PPF.

IMPORTANT: Greetings ALWAYS → general. When in doubt between advice/investment, pick advice.

Reply with ONLY ONE word (lowercase): general, research, news, analysis, advice, investment"""


def router_node(state: State):
    """Pass-through; routing happens in the conditional edge."""
    return {}


def auto_route_decision(state: State) -> str:
    if not _router_llm:
        return "general"
    try:
        user_query = state["messages"][-1].content
        resp = _router_llm.invoke([
            SystemMessage(content=ROUTER_SYSTEM_PROMPT),
            HumanMessage(content=user_query)
        ])
        route = resp.content.strip().lower().split()[0] if resp.content.strip() else "general"
        print(f"[LLM Router] '{user_query[:60]}' → {route}")
        valid = {"general", "research", "news", "analysis", "advice", "investment"}
        return route if route in valid else "general"
    except Exception as e:
        print(f"[LLM Router] Error: {e}, fallback → general")
        return "general"


def route_request(state: State) -> str:
    agent_type = state.get("agent_type", "auto")
    mapping = {
        "data": "research", "price": "research", "learning": "research", "research": "research",
        "analysis": "analysis", "advice": "advice", "news": "news", "investment": "investment",
    }
    return mapping.get(agent_type, "auto")


# ─── Build Graph ──────────────────────────────────────────────────────────────
builder = StateGraph(State)

builder.add_node("router",     router_node)
builder.add_node("general",    general_node)
builder.add_node("research",   research_node)
builder.add_node("analysis",   analysis_node)
builder.add_node("advice",     advice_node)
builder.add_node("news",       news_node)
builder.add_node("investment", investment_node)

builder.add_conditional_edges(START, route_request, {
    "auto":       "router",
    "research":   "research",
    "analysis":   "analysis",
    "advice":     "advice",
    "news":       "news",
    "investment": "investment",
})

builder.add_conditional_edges("router", auto_route_decision, {
    "general":    "general",
    "research":   "research",
    "news":       "news",
    "analysis":   "analysis",
    "advice":     "advice",
    "investment": "investment",
})

builder.add_edge("general",    END)
builder.add_edge("research",   END)
builder.add_edge("analysis",   END)
builder.add_edge("advice",     END)
builder.add_edge("news",       END)
builder.add_edge("investment", END)

graph = builder.compile()