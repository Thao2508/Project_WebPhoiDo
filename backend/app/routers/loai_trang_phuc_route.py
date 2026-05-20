from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import (
    SessionLocal
)

from app.services import (
    loai_trang_phuc_service
)

from app.schemas.loai_trang_phuc_schema import (
    LoaiTrangPhucCreate
)

router = APIRouter(
    prefix="/loai-trang-phuc",
    tags=["LoaiTrangPhuc"]
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

    return loai_trang_phuc_service.get_all_loai(
        db
    )


@router.post("/")
def create(
    data: LoaiTrangPhucCreate,
    db: Session = Depends(get_db)
):

    return loai_trang_phuc_service.them_loai(
        db,
        data
    )


@router.put("/{id}")
def update(
    id: int,
    data: LoaiTrangPhucCreate,
    db: Session = Depends(get_db)
):

    return loai_trang_phuc_service.cap_nhat_loai(
        db,
        id,
        data
    )


