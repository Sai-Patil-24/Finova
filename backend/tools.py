from langchain_community.tools import ArxivQueryRun, WikipediaQueryRun
from langchain_core.tools import tool
from langchain_community.utilities import ArxivAPIWrapper, WikipediaAPIWrapper
import yfinance as yf
from duckduckgo_search import DDGS

@tool
def search_tool(query: str) -> str:
    """
    Search the web for general information and latest news.
    Args:
        query: The search query string.
    """
    try:
        with DDGS() as ddgs:
            # Using text search with a bit more results for better coverage
            results = list(ddgs.text(query, max_results=5))
            if not results:
                return f"No search results found for '{query}'. The search engine might be temporarily unavailable."
            
            output = []
            for r in results:
                output.append(f"Title: {r.get('title', 'No Title')}\nSource: {r.get('href', 'No URL')}\nSnippet: {r.get('body', 'No Content')}\n")
            
            return "\n---\n".join(output)
    except Exception as e:
        return f"Search error for '{query}': {str(e)}"
arxiv_tool = ArxivQueryRun(api_wrapper=ArxivAPIWrapper())
wiki_tool = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper())

@tool
def get_stock_price(ticker: str) -> str:
    """
    Fetches the current stock price for a given ticker symbol.
    For Indian stocks use NSE suffix: RELIANCE.NS, TCS.NS, INFY.NS
    For BSE use: RELIANCE.BO
    For US stocks: AAPL, GOOGL, TSLA
    """
    try:
        ticker = ticker.strip().upper()
        stock = yf.Ticker(ticker)
        hist = stock.history(period="1d")

        if hist.empty:
            return f"No price data found for '{ticker}'. Please check the ticker symbol."

        price = hist["Close"].iloc[-1]
        currency = "₹" if ticker.endswith((".NS", ".BO")) else "$"
        info = stock.info
        name = info.get("longName") or info.get("shortName") or ticker
        change = hist["Close"].iloc[-1] - hist["Open"].iloc[-1]
        pct = (change / hist["Open"].iloc[-1]) * 100
        direction = "▲" if change >= 0 else "▼"
        return (
            f"{name} ({ticker}): {currency}{price:,.2f} "
            f"{direction} {abs(pct):.2f}% today"
        )
    except Exception as e:
        return f"Error fetching price for '{ticker}': {str(e)}"

@tool
def get_financial_news(topic: str) -> str:
    """
    Retrieves the latest financial news for a topic, with a focus on Indian markets.
    Args:
        topic: The financial topic, company name, or stock symbol.
    """
    try:
        clean_topic = topic.strip().upper()

        # Try yfinance news for ticker symbols (Indian: .NS/.BO or short alpha)
        if clean_topic.isalpha() and len(clean_topic) <= 10:
            # Try NSE ticker first
            for suffix in [".NS", ".BO", ""]:
                ticker = yf.Ticker(clean_topic + suffix)
                news = ticker.news
                if news:
                    formatted = []
                    for item in news[:5]:
                        title = item.get('title', '')
                        pub = item.get('publisher', '')
                        link = item.get('link', '')
                        formatted.append(f"• {title}\n  Source: {pub} | {link}")
                    return f"Latest news for {clean_topic}:\n\n" + "\n\n".join(formatted)

        # Indian-biased web search
        india_bias = "India BSE NSE Nifty Sensex SEBI RBI"
        search_query = f"{topic} {india_bias} latest news"
        search_results = search_tool.func(search_query)

        if "No search results" in search_results or not search_results.strip():
            # Final fallback: Nifty 50 index news
            nifty_news = yf.Ticker("^NSEI").news
            if nifty_news:
                formatted = []
                for item in nifty_news[:3]:
                    formatted.append(f"• {item.get('title', '')}\n  Source: {item.get('publisher', '')}")
                return "Indian Market Update (Nifty 50):\n\n" + "\n\n".join(formatted)

        return search_results
    except Exception as e:
        return f"Error fetching news for '{topic}': {str(e)}"

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
