from workflow import graph
from langchain_core.messages import HumanMessage
import os

os.environ["PYTHONPATH"] = "."

def test_workflow(query):
    print(f"Testing workflow with query: {query}")
    initial_state = {
        "messages": [HumanMessage(content=query)],
        "agent_type": "auto"
    }
    try:
        response_state = graph.invoke(initial_state)
        print("\n--- FINAL RESPONSE ---")
        print(response_state["messages"][-1].content)
        print("----------------------")
    except Exception as e:
        print(f"Workflow Error: {e}")

if __name__ == "__main__":
    test_workflow("give me todays news update")
