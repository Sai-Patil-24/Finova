from duckduckgo_search import DDGS

def test_search(query):
    print(f"Searching for: {query}")
    try:
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=5))
            if not results:
                print("No results found.")
                return
            for r in results:
                print(f"Title: {r.get('title')}")
                print(f"Snippet: {r.get('body')[:100]}...")
                print("-" * 20)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_search("latest financial news")
