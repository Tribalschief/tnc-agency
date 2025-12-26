from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from qdrant_client import QdrantClient
from qdrant_client.http import models as rest
import json
import uuid
import logging

# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("avatar-backend")

# Initialize Qdrant
qdrant = QdrantClient(":memory:")

# Initialize Collection for RAG
COLLECTION_NAME = "growth_architect_knowledge"
if not qdrant.collection_exists(COLLECTION_NAME):
    qdrant.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=rest.VectorParams(size=768, distance=rest.Distance.COSINE),
    )

# Initialize OpenRouter (using OpenAI SDK)
from openai import OpenAI

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
client = None
if OPENROUTER_API_KEY:
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=OPENROUTER_API_KEY,
    )
    logger.info("OpenRouter Client Initialized")
else:
    logger.warning("OPENROUTER_API_KEY not found in environment")

# Free models to try in order (fallback on rate limits)
FREE_MODELS = [
    "google/gemini-2.0-flash-exp:free",
    "nvidia/nemotron-nano-12b-v2-vl:free",
    "mistralai/devstral-2512:free",
    "kwaipilot/kat-coder-pro:free",
]

# Initialize App
app = FastAPI(title="3D Avatar AI Backend")

# CORS (Allow Frontend to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Layers 1 & 2: In-Memory Session & Context Store
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
            "history": [], 
            "facts": {
                "location": "Unknown",
                "business_type": "Unknown",
                "pain_point": "Unknown",
                "goal": "Unknown"
            }
        }
    return sessions[session_id]

async def extract_facts(user_msg: str, current_facts: dict):
    if not client: return current_facts
    
    extraction_prompt = f"""
    Update the following business context JSON based on the user's latest message. 
    Only change values if new information is provided. Return ONLY the JSON.
    Current JSON: {json.dumps(current_facts)}
    User Message: "{user_msg}"
    """
    
    # Try multiple free models with fallback
    for model_name in FREE_MODELS:
        try:
            logger.info(f"Extraction trying model: {model_name}")
            response = client.chat.completions.create(
                model=model_name,
                messages=[
                    {"role": "system", "content": "You are a JSON extraction assistant. Return only valid JSON."},
                    {"role": "user", "content": extraction_prompt}
                ],
                response_format={"type": "json_object"},
                timeout=10.0
            )
            result = json.loads(response.choices[0].message.content)
            logger.info(f"✓ Extraction successful with {model_name}")
            return result
        except Exception as e:
            logger.warning(f"✗ Extraction failed for {model_name}: {str(e)[:100]}")
            continue
    
    logger.error("All models failed for extraction")
    return current_facts

@app.get("/")
def health_check():
    status = "connected" if client else "missing_api_key"
    return {"status": "ok", "service": "avatar-backend", "llm_status": status}

@app.post("/chat", response_model=ThreadResponse)
async def chat_endpoint(request: ThreadRequest, raw_request: Request):
    user_msg = request.message
    session_id = request.session_id
    
    logger.info(f"Received chat request: session={session_id}, msg={user_msg}")
    
    # Log headers for debugging CORS/Networking
    logger.info(f"Request Headers: {raw_request.headers}")
    
    # 1. Get Session & Update Info
    session = get_or_create_session(session_id)
    session["facts"] = await extract_facts(user_msg, session["facts"])
    
    # Add to history
    session["history"].append({"role": "user", "content": user_msg})
    if len(session["history"]) > 10: session["history"].pop(0)

    if not client:
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
Diagnose business bottlenecks. Build Strategy. Close for audit.

### OUTPUT FORMAT (JSON ONLY)
{{
  "text": "Response text",
  "intent": "chat" | "explain" | "close" | "listen",
  "emotion": "neutral" | "happy"| "confident" | "thinking"
}}
"""
        # Try multiple free models with fallback
        response_text = None
        successful_model = None
        
        for model_name in FREE_MODELS:
            try:
                logger.info(f"Trying chat model: {model_name}")
                response = client.chat.completions.create(
                    model=model_name,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_msg}
                    ],
                    response_format={"type": "json_object"},
                    timeout=15.0
                )
                response_text = response.choices[0].message.content
                successful_model = model_name
                logger.info(f"✓ Chat successful with {model_name}")
                break
            except Exception as e:
                logger.warning(f"✗ Chat failed for {model_name}: {str(e)[:100]}")
                continue

        if not response_text:
            raise Exception("All models exhausted or rate-limited")

        try:
            response_data = json.loads(response_text)
        except:
            response_data = {"text": response_text, "intent": "chat", "emotion": "neutral"}
        
        session["history"].append({"role": "assistant", "content": response_data.get("text", "")})
        
        return {
            "text": response_data.get("text", response_text),
            "intent": response_data.get("intent", "chat"),
            "emotion": response_data.get("emotion", "neutral"),
            "context": session["facts"]
        }
        
    except Exception as e:
        logger.error(f"Final Chat Error: {e}")
        return {
            "text": "Neural interference detected. Retrying diagnostic...",
            "intent": "error",
            "emotion": "confused"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
