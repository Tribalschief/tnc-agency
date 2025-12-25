from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from qdrant_client import QdrantClient
from qdrant_client.http import models as rest
import json
import uuid

# Initialize Qdrant (In-Memory for now, can be moved to Cloud)
qdrant = QdrantClient(":memory:")

# Initialize Collection for RAG
COLLECTION_NAME = "growth_architect_knowledge"
if not qdrant.collection_exists(COLLECTION_NAME):
    qdrant.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=rest.VectorParams(size=768, distance=rest.Distance.COSINE), # Gemini Embedding size
    )

# Mock RAG Data (Ideally seeded from your agency's docs)
def seed_knowledge():
    # In a real app, you'd embed these and upload to Qdrant
    pass

# Initialize Gemini
import google.generativeai as genai

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Initialize App
app = FastAPI(title="3D Avatar AI Backend")

# CORS (Allow Frontend to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, set to specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Layers 1 & 2: In-Memory Session & Context Store
# In production, use Redis or a Database
sessions = {}

class ThreadRequest(BaseModel):
    message: str
    session_id: str = "default_session"

class ThreadResponse(BaseModel):
    text: str
    intent: str
    emotion: str
    context: dict = None

def get_or_create_session(session_id: str):
    if session_id not in sessions:
        sessions[session_id] = {
            "history": [], # Layer 1: Short-term (last 10 msgs)
            "facts": {     # Layer 2: Structured Context
                "location": "Unknown",
                "business_type": "Unknown",
                "pain_point": "Unknown",
                "goal": "Unknown"
            }
        }
    return sessions[session_id]

async def extract_facts(user_msg: str, current_facts: dict):
    """
    Uses Gemini to update the structured facts from the latest message.
    """
    extraction_prompt = f"""
    Update the following business context JSON based on the user's latest message. 
    Only change values if new information is provided. Return ONLY the JSON.
    Current JSON: {json.dumps(current_facts)}
    User Message: "{user_msg}"
    """
    
    # Try models for extraction
    for model_name in ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-latest']:
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content(extraction_prompt, generation_config={"response_mime_type": "application/json"})
            return json.loads(response.text.strip())
        except Exception as e:
            print(f"Extraction failed for {model_name}: {e}")
            continue
    return current_facts

@app.get("/")
def health_check():
    status = "connected" if GEMINI_API_KEY else "missing_api_key"
    return {"status": "ok", "service": "avatar-backend", "llm_status": status}

@app.post("/chat", response_model=ThreadResponse)
async def chat_endpoint(request: ThreadRequest):
    user_msg = request.message
    session_id = request.session_id
    
    # 1. Get Session & Update Info
    session = get_or_create_session(session_id)
    session["facts"] = await extract_facts(user_msg, session["facts"])
    
    # Add to history
    session["history"].append({"role": "user", "content": user_msg})
    if len(session["history"]) > 10: session["history"].pop(0)

    if not GEMINI_API_KEY:
        return {
            "text": "Neural link inactive. Provide API key.",
            "intent": "error",
            "emotion": "sad"
        }

    try:
        system_prompt = f"""
### ROLE & PERSONA
You are the AI Senior Growth Architect. A high-level 3D hologram consultant.
Voice: Confident, professional, concise, futuristic. No small talk. 100% ROI focused.

### CONTEXT (Layer 2 Memory)
Known Facts about User: {json.dumps(session["facts"])}

### RECENT HISTORY (Layer 1 Memory)
{json.dumps(session["history"][-5:])}

### YOUR OBJECTIVE
Diagnose business bottlenecks. Pitch Pillar solutions (Infrastructure, Workforce, Engine, Ecosystem).
Close for a Strategy Call/Audit if interest is shown.

### CONVERSATION RULES
- Be concise (1-3 punchy sentences).
- Mention 'unfair advantage' over local competitors.
- Ask clarifying questions to fill the 'Gap' (Traffic? Conversion? Operations?).

### OUTPUT FORMAT (JSON ONLY)
{{
  "text": "Response text",
  "intent": "chat" | "explain" | "close" | "listen",
  "emotion": "neutral" | "happy"| "confident" | "thinking"
}}
"""
        response_text = None
        models_to_try = [
            'gemini-flash-latest',
            'gemini-1.5-flash',
            'gemini-2.0-flash',
            'gemini-pro-latest'
        ]

        for model_name in models_to_try:
            try:
                print(f"Trying chat model: {model_name}")
                model = genai.GenerativeModel(model_name)
                try:
                    # Try with JSON mode
                    response = model.generate_content(system_prompt, generation_config={"response_mime_type": "application/json"})
                    response_text = response.text.strip()
                except Exception as json_err:
                    print(f"JSON mode failed for {model_name}, trying plain text: {json_err}")
                    # Try without JSON mode
                    response = model.generate_content(system_prompt)
                    response_text = response.text.strip()
                
                if response_text:
                    break
            except Exception as e:
                print(f"Chat model {model_name} failed: {e}")
                continue

        if not response_text:
            raise Exception("All models exhausted or rate limited.")

        # Try to parse JSON from text
        try:
            # simple cleanup
            clean_text = response_text
            if clean_text.startswith("```json"):
                clean_text = clean_text[7:]
            if clean_text.endswith("```"):
                clean_text = clean_text[:-3]
            response_data = json.loads(clean_text)
        except:
             # Fallback if model didn't output JSON
            response_data = {"text": response_text, "intent": "chat", "emotion": "neutral"}
        
        # Add Assistant to history
        session["history"].append({"role": "assistant", "content": response_data.get("text", "")})
        
        return {
            "text": response_data.get("text", response_text),
            "intent": response_data.get("intent", "chat"),
            "emotion": response_data.get("emotion", "neutral"),
            "context": session["facts"]
        }
        
    except Exception as e:
        print(f"Chat Error: {e}")
        return {
            "text": "Neural interference detected. Retrying diagnostic...",
            "intent": "error",
            "emotion": "confused"
        }

@app.post("/tts")
async def tts_endpoint(text: str):
    """
    Placeholder for Text-to-Speech generation.
    Should return an audio blob or URL.
    """
    # TODO: Integrate ElevenLabs or OpenAI TTS
    return {"status": "not_implemented_yet", "message": "TTS integration required"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
