import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-flash-latest', 'gemini-2.0-flash-exp']

for m in models:
    print(f"\n--- Testing Model: {m} ---")
    try:
        model = genai.GenerativeModel(m)
        response = model.generate_content("Say hello", generation_config={"response_mime_type": "application/json"})
        print(f"Success: {response.text}")
    except Exception as e:
        print(f"Failure: {e}")
