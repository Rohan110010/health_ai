from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from model import predict_with_confidence  # ✅ updated import

# -------------------------
# APP SETUP
# -------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# INPUT MODEL
# -------------------------
class SymptomInput(BaseModel):
    symptoms: str

# -------------------------
# HISTORY STORAGE
# -------------------------
history_data = []

# -------------------------
# NLP CLEANING
# -------------------------
def clean_input(user_input: str):
    user_input = user_input.lower()

    synonyms = {
        "tired": "fatigue",
        "weak": "fatigue",
        "vomit": "vomiting",
        "dizzy": "headache"
    }

    for key, value in synonyms.items():
        if key in user_input:
            user_input += " " + value

    return user_input

# -------------------------
# RISK LOGIC
# -------------------------
def get_risk_level(confidence):
    if confidence > 75:
        return "High"
    elif confidence > 40:
        return "Medium"
    else:
        return "Low"

# -------------------------
# HOME
# -------------------------
@app.get("/")
def home():
    return {"message": "AI Health Assistant Running"}

# -------------------------
# PREDICT
# -------------------------
@app.post("/predict")
def predict(data: SymptomInput):

    # 🔥 Clean input
    cleaned = clean_input(data.symptoms)

    if not cleaned.strip():
        return {
            "disease": "Unknown",
            "confidence": 0,
            "risk": "Low",
            "advice": "Please enter symptoms"
        }

    # 🔥 Get prediction + dynamic confidence
    disease, confidence = predict_with_confidence(cleaned)

    # 🔥 Risk calculation
    risk = get_risk_level(confidence)

    # 🔥 Save history (used by graph)
    history_data.append({
        "disease": disease,
        "confidence": confidence,
        "risk": risk
    })

    return {
        "disease": disease,
        "confidence": confidence,
        "risk": risk,
        "advice": f"Possible condition: {disease}"
    }

# -------------------------
# HISTORY
# -------------------------
@app.get("/history")
def get_history():
    return history_data

# -------------------------
# RESET
# -------------------------
@app.delete("/reset")
def reset_history():
    history_data.clear()
    return {"message": "History cleared"}