from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.schemas.luat_phoi_mau_schema import *
from app.services import luat_phoi_mau_service
from app.schemas.luat_phoi_mau_schema import LuatPhoiMauCreate

router = APIRouter(
    prefix="/luat-phoi-mau",
    tags=["LuatPhoiMau"]
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

    return luat_phoi_mau_service.get_all_luat(db)


@router.post("/")
def create(
    data: LuatPhoiMauCreate,
    db: Session = Depends(get_db)
):

    return luat_phoi_mau_service.them_luat(
        db,
        data
    )

@router.put("/{id}")
def update(
    id: int,
    data: LuatPhoiMauCreate,
    db: Session = Depends(get_db)
):

    return luat_phoi_mau_service.cap_nhat_luat(
        db,
        id,
        data
    )


@router.delete("/{id}")
def delete(
    id: int,
    db: Session = Depends(get_db)
):

    return luat_phoi_mau_service.xoa_luat(
        db,
        id
    )