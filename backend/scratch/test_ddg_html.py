from duckduckgo_search import DDGS

def test_ddg_html():
    print("Testing DDG with backend='html'")
    try:
        with DDGS() as ddgs:
            results = list(ddgs.text("latest financial news", backend='html', max_results=5))
            print(f"Results found: {len(results)}")
            for r in results:
                print(f"- {r.get('title')}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_ddg_html()
