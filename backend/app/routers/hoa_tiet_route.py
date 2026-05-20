from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.models.HoaTiet import HoaTiet


router = APIRouter(
    prefix="/hoa-tiet",
    tags=["HoaTiet"]
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

    return db.query(
        HoaTiet
    ).all()

