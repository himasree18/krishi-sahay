from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from dotenv import load_dotenv

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "KrishiSahay backend running 🚀"}

@app.get("/ask")
def ask(q: str = Query(..., min_length=1), lang: str = "en"):
    try:
        language_map = {"en": "English", "te": "Telugu", "hi": "Hindi"}
        lang_name = language_map.get(lang, "English")

        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "llama-3.1-8b-instant",
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "You are KrishiSahay, an AI assistant for Indian farmers. "
                        f"Reply only in {lang_name}. "
                        "Use very simple words and give step-by-step actionable advice."
                    )
                },
                {"role": "user", "content": q}
            ],
            "temperature": 0.4
        }

        r = requests.post(url, headers=headers, json=payload, timeout=30)
        if r.status_code != 200:
            return {"answer": f"API error: {r.status_code} {r.text}"}

        data = r.json()
        answer = data["choices"][0]["message"]["content"]
        return {"answer": answer}

    except Exception as e:
        return {"answer": f"Server error: {str(e)}"}
