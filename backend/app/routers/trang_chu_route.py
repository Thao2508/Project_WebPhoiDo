from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.services import (
    trang_chu_service
)

from app.schemas.trang_chu_schema import (
    OutfitResponse,
    ThongKeResponse
)


router = APIRouter(
    prefix="/trang-chu",
    tags=["TrangChu"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.get(
    "/goi-y-outfit",
    response_model=list[OutfitResponse]
)
def lay_goi_y_outfit(
    limit: int = 10,
    keyword: str = "",
    maNguoiDung: int | None = None,
    db: Session = Depends(get_db)
):

    return (
        trang_chu_service
        .lay_goi_y_outfit(
            db,
            limit,
            keyword,
            maNguoiDung
        )
    )


@router.post(
    "/yeu-thich/{maBoPhoi}"
)
def them_yeu_thich(
    maBoPhoi: int,
    maNguoiDung: int,
    db: Session = Depends(get_db)
):

    return (
        trang_chu_service
        .them_yeu_thich(
            db,
            maNguoiDung,
            maBoPhoi
        )
    )


@router.get(
    "/thong-ke/{maNguoiDung}",
    response_model=ThongKeResponse
)
def lay_thong_ke(
    maNguoiDung: int,
    db: Session = Depends(get_db)
):

    return (
        trang_chu_service
        .lay_thong_ke(
            db,
            maNguoiDung
        )
    )
