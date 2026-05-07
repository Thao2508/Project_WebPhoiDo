from fastapi import FastAPI
from app.db.database import engine, Base
from app.models.NguoiDung import NguoiDung

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Hello FastAPI"}