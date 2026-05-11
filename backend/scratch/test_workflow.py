from workflow import graph
from langchain_core.messages import HumanMessage

def test_workflow(query):
    print(f"Testing workflow with query: {query}")
    initial_state = {
        "messages": [HumanMessage(content=query)],
        "agent_type": "auto"
    }
    try:
        for event in graph.stream(initial_state):
            for node, state in event.items():
                print(f"Node: {node}")
                # print(f"State: {state}")
        
        # final_state = graph.invoke(initial_state)
        # print(f"Final Response: {final_state['messages'][-1].content}")
    except Exception as e:
        print(f"Workflow Error: {e}")

if __name__ == "__main__":
    test_workflow("give me todays news update")
