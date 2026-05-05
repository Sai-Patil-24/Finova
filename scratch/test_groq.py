import os
from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
print(f"API Key starts with: {api_key[:10]}...")

models = ["llama-3.3-70b-versatile", "llama-3.1-70b-versatile", "llama3-70b-8192"]

for model in models:
    print(f"\nTesting model: {model}")
    try:
        llm = ChatGroq(model=model, api_key=api_key)
        res = llm.invoke("Hello")
        print(f"Success! Response: {res.content}")
        break
    except Exception as e:
        print(f"Failed with {model}: {e}")
