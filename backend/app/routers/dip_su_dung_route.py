from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import (
    SessionLocal
)

from app.schemas.dip_su_dung_schema import (
    DipSuDungCreate
)

from app.services import (
    dip_su_dung_service
)

router = APIRouter(
    prefix="/dip-su-dung",
    tags=["DipSuDung"]
)


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


# GET ALL

@router.get("/")
def get_all(
    db: Session = Depends(get_db)
):

    return dip_su_dung_service.get_all_dip_su_dung(
        db
    )


# GET BY ID

@router.get("/{id}")
def get_by_id(
    id: int,
    db: Session = Depends(get_db)
):

    return dip_su_dung_service.get_dip_su_dung_by_id(
        db,
        id
    )


# CREATE

@router.post("/")
def create(
    data: DipSuDungCreate,
    db: Session = Depends(get_db)
):

    return dip_su_dung_service.them_dip_su_dung(
        db,
        data
    )


# UPDATE

@router.put("/{id}")
def update(
    id: int,
    data: DipSuDungCreate,
    db: Session = Depends(get_db)
):

    return dip_su_dung_service.cap_nhat_dip_su_dung(
        db,
        id,
        data
    )