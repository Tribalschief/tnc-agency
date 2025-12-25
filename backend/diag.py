import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

print(f"Testing with key: {api_key[:10]}...")

try:
    print("Testing basic generation...")
    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content("Say hello")
    print(f"Basic Success: {response.text}")
except Exception as e:
    print(f"Basic Failure: {e}")

try:
    print("\nTesting JSON mode generation...")
    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content("Return JSON: {'test': 'success'}", generation_config={"response_mime_type": "application/json"})
    print(f"JSON Success: {response.text}")
except Exception as e:
    print(f"JSON Failure: {e}")
