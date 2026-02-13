# 🌾 KrishiSahay – Farmer Query Assistant

An AI-powered web app to answer farmer and general questions using AI.

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: FastAPI (Python)
- AI API: Groq

## How to Run

### Backend
cd backend  
python -m venv venv  
venv\Scripts\activate  
pip install fastapi uvicorn requests python-dotenv  
uvicorn main:app --reload  

### Frontend
Open frontend/index.html in browser

## Note
Create backend/.env with:
GROQ_API_KEY=your_api_key_here
