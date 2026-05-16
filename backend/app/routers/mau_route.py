from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.schemas.mau_schema import MauCreate

from app.services import mau_service

router = APIRouter(
    prefix="/mau",
    tags=["Mau"]
)


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


@router.get("/")
def get_all(
    db: Session = Depends(get_db)
):

    return mau_service.get_all_mau(db)


@router.post("/")
def create(
    data: MauCreate,
    db: Session = Depends(get_db)
):

    return mau_service.them_mau(
        db,
        data
    )

