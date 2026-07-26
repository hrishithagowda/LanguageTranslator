from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from deep_translator import GoogleTranslator
from database import translations

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TranslateRequest(BaseModel):
    text: str
    target: str
    source: str

@app.get("/")
def home():
    return {"message": "Backend is working!"}


@app.post("/translate")
def translate(request: TranslateRequest):

    translated = GoogleTranslator(
        source=request.source,
        target=request.target
    ).translate(request.text)

    translations.insert_one({
        "source_language": request.source,
        "target_language": request.target,
        "original_text": request.text,
        "translated_text": translated
    })

    return {
        "translatedText": translated
    }


@app.get("/history")
def get_history():
    history = list(translations.find({}, {"_id": 0}))
    return history
@app.delete("/history")
def delete_history():

    translations.delete_many({})

    return {
        "message": "History deleted successfully"
    }