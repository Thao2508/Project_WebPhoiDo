from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import (
    SessionLocal
)

from app.schemas.phong_cach_schema import (
    PhongCachCreate
)

from app.services import (
    phong_cach_service
)

router = APIRouter(
    prefix="/phong-cach",
    tags=["PhongCach"]
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

    return phong_cach_service.get_all_phong_cach(
        db
    )

@router.get("/{id}")
def get_by_id(
    id: int,
    db: Session = Depends(get_db)
):

    return phong_cach_service.get_phong_cach_by_id(
        db,
        id
    )

@router.post("/")
def create(
    data: PhongCachCreate,
    db: Session = Depends(get_db)
):

    return phong_cach_service.them_phong_cach(
        db,
        data
    )

@router.put("/{id}")
def update(
    id: int,
    data: PhongCachCreate,
    db: Session = Depends(get_db)
):

    return phong_cach_service.cap_nhat_phong_cach(
        db,
        id,
        data
    )
