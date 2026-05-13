from fastapi import FastAPI

from app.db.database import Base
from app.db.database import engine
from app.models.NguoiDung import NguoiDung
from app.routers.auth_route import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# ROUTER
app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Auth"]
)