from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import (
    SessionLocal
)

from app.services import (
    luat_phoi_loai_service
)

from app.schemas.luat_phoi_loai_schema import (
    LuatPhoiLoaiCreate
)

router = APIRouter(
    prefix="/luat-phoi-loai",
    tags=["LuatPhoiLoai"]
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

    return luat_phoi_loai_service.get_all_luat(
        db
    )


@router.post("/")
def create(
    data: LuatPhoiLoaiCreate,
    db: Session = Depends(get_db)
):

    return luat_phoi_loai_service.them_luat(
        db,
        data
    )

@router.put("/{id}")
def update(
    id: int,
    data: LuatPhoiLoaiCreate,
    db: Session = Depends(get_db)
):

    return luat_phoi_loai_service.cap_nhat_luat(
        db,
        id,
        data
    )

