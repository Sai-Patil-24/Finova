from duckduckgo_search import DDGS

try:
    with DDGS() as ddgs:
        results = [r for r in ddgs.text("latest financial news", max_results=3)]
        print(f"Results found: {len(results)}")
        for r in results:
            print(f"- {r['title']}")
except Exception as e:
    print(f"Error: {e}")
