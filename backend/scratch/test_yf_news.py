import yfinance as yf

def test_yf_news():
    ticker = yf.Ticker("^GSPC")
    news = ticker.news
    print(f"News found for ^GSPC: {len(news)}")
    for item in news[:2]:
        print(f"- {item.get('title')}")

    ticker2 = yf.Ticker("AAPL")
    news2 = ticker2.news
    print(f"News found for AAPL: {len(news2)}")
    for item in news2[:2]:
        print(f"- {item.get('title')}")

if __name__ == "__main__":
    test_yf_news()
