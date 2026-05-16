from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import (
    SessionLocal
)

from app.services import (
    danh_muc_service
)

from app.schemas.danh_muc_schema import (
    DanhMucCreate
)

router = APIRouter(
    prefix="/danh-muc",
    tags=["DanhMuc"]
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

    return danh_muc_service.get_all_danh_muc(
        db
    )


@router.post("/")
def create(
    data: DanhMucCreate,
    db: Session = Depends(get_db)
):

    return danh_muc_service.them_danh_muc(
        db,
        data
    )


@router.put("/{id}")
def update(
    id: int,
    data: DanhMucCreate,
    db: Session = Depends(get_db)
):

    return danh_muc_service.cap_nhat_danh_muc(
        db,
        id,
        data
    )

