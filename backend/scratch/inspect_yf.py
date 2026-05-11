import yfinance as yf

ticker = yf.Ticker("AAPL")
news = ticker.news
if news:
    print(f"Keys in first news item: {news[0].keys()}")
    print(f"Content: {news[0]}")
