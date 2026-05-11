import sys
sys.path.insert(0, ".")

from workflow import graph
from langchain_core.messages import HumanMessage

test_queries = [
    ("What happened in the stock market today?", "news"),
    ("I have 10 lakhs, where should I invest?", "investment"),
    ("Can you break down my portfolio: 50% NIFTY, 30% gold, 20% bonds?", "analysis"),
    ("I'm 30 years old and want to retire by 50, what should I do?", "advice"),
    ("What is the current price of Reliance Industries?", "research"),
    ("Tell me something interesting about the economy", "research"),
]

for query, expected in test_queries:
    initial_state = {
        "messages": [HumanMessage(content=query)],
        "agent_type": "auto"
    }
    result = graph.invoke(initial_state)
    final_msg = result["messages"][-1].content
    print(f"\nQ: {query}")
    print(f"Expected: {expected}")
    print(f"Response preview: {final_msg[:120]}...")
    print("-" * 60)
