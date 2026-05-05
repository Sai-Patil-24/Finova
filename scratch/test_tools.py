import sys
import os
sys.path.append(os.getcwd())

from backend.tools import get_stock_price, search_tool

print("Testing get_stock_price('AAPL')...")
try:
    print(get_stock_price.invoke("AAPL"))
except Exception as e:
    print(f"Error: {e}")

print("\nTesting get_stock_price('apple stock price')...")
try:
    print(get_stock_price.invoke("apple stock price"))
except Exception as e:
    print(f"Error: {e}")

print("\nTesting search_tool('apple stock price')...")
try:
    print(search_tool.invoke("apple stock price"))
except Exception as e:
    print(f"Error: {e}")
