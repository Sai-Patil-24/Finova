from langchain_community.tools import ArxivQueryRun, WikipediaQueryRun
from langchain_core.tools import tool
from langchain_community.utilities import ArxivAPIWrapper, WikipediaAPIWrapper
import yfinance as yf
from duckduckgo_search import DDGS

@tool
def search_tool(query: str) -> str:
    """
    Search the web using DuckDuckGo.
    :param query: The search query.
    :return: Search results as text.
    """
    try:
        with DDGS() as ddgs:
            results = [r for r in ddgs.text(query, max_results=3)]
            if not results:
                return f"No search results found for '{query}'."
            return "\n".join([f"{r['title']}: {r['body']}" for r in results])
    except Exception as e:
        return f"Search error for '{query}': {str(e)}"
arxiv_tool = ArxivQueryRun(api_wrapper=ArxivAPIWrapper())
wiki_tool = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper())

# Custom tool for stock price
@tool
def get_stock_price(ticker: str) -> str:
    """
    Fetches the current stock price for a given ticker symbol.
    :param ticker: The stock ticker symbol in ALL CAPS (e.g., "AAPL", "GOOGL", "TSLA", "MSFT"). 
                  DO NOT pass the company name; only the ticker.
    :return: The current stock price as string
    """
    try:
        # Ensure ticker is uppercase and stripped
        ticker = ticker.strip().upper()
        stock = yf.Ticker(ticker)
        hist = stock.history(period="1d")
        
        if hist.empty:
            return f"No price data found for ticker '{ticker}'. Please ensure it is a valid stock symbol."
            
        price = hist["Close"].iloc[-1]
        return f"The current price for {ticker} is ${price:.2f}"
    except Exception as e:
        return f"Error fetching stock price for '{ticker}': {str(e)}"

# Simulated tools for various agents
@tool
def get_financial_news(topic: str) -> str:
    """
    Retrieves the latest financial news regarding a specific topic.
    :param topic: The topic of the news (e.g., "Tech Stocks", "Federal Reserve")
    :return: A summary of recent news.
    """
    return search_tool.invoke(f"latest financial news {topic}")

@tool
def analyze_portfolio(portfolio_str: str) -> str:
    """
    Analyzes a user's portfolio and provides insights.
    :param portfolio_str: Comma separated list of assets or general portfolio description.
    :return: An analysis report.
    """
    return f"Portfolio Analysis for [{portfolio_str}]: Your portfolio appears diversified. Consider increasing fixed income depending on risk tolerance."

@tool
def get_investment_advice(query: str) -> str:
    """
    Provides general investment advice based on user query.
    :param query: The user's question or financial goal.
    :return: Strategic advice.
    """
    return f"Advice on [{query}]: Maintain a long-term perspective and consider dollar-cost averaging. Remember to consult a certified advisor."

@tool
def get_investment_options(profile: str) -> str:
    """
    Suggests investment instruments based on a risk profile or goal.
    :param profile: The user's risk profile (e.g., "conservative", "aggressive").
    :return: A list of suggested instruments.
    """
    return f"For a '{profile}' profile, consider index funds (NIFTY 50 / S&P 500) for equity exposure, and government bonds or FDs for stability."

# Grouping tools by agent type
research_tools = [search_tool, wiki_tool, arxiv_tool, get_stock_price]
analysis_tools = [analyze_portfolio, get_stock_price]
advice_tools = [get_investment_advice]
news_tools = [get_financial_news]
investment_tools = [get_investment_options, get_stock_price]

# All tools combined if needed
all_tools = []
for t in research_tools + analysis_tools + advice_tools + news_tools + investment_tools:
    if t not in all_tools:
        all_tools.append(t)
