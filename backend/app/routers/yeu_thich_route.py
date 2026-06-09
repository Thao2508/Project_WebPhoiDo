from fastapi import APIRouter
from fastapi import Depends
from fastapi import Body

from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.schemas.yeu_thich_schema import (
    OutfitSaveRequest
)

from app.services import yeu_thich_service


router = APIRouter(
    prefix="/yeu-thich",
    tags=["YeuThich"]
)


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


# =====================================================
# TẠO YÊU THÍCH
# =====================================================

@router.post("/tao")
def tao_yeu_thich(
    data: OutfitSaveRequest,
    db: Session = Depends(get_db)
):

    try:

        return yeu_thich_service.tao_yeu_thich(

            db,

            data.maNguoiDung,

            data.outfit,

            data.trangThai,

            data.maLuat,

            data.maLuatMau
        )

    except Exception as e:

        return {

            "success": False,

            "message": str(e)
        }


# =====================================================
# XÓA YÊU THÍCH
# =====================================================

@router.delete("/xoa")
def xoa_yeu_thich(
    data: dict = Body(...),
    db: Session = Depends(get_db)
):

    try:

        return yeu_thich_service.xoa_yeu_thich(

            db,

            data["maNguoiDung"],

            data["outfit"]
        )

    except Exception as e:

        return {

            "success": False,

            "message": str(e)
        }


# =====================================================
# LẤY DANH SÁCH YÊU THÍCH
# =====================================================

@router.get("/user/{ma_nguoi_dung}")
def lay_outfit_yeu_thich(
    ma_nguoi_dung: int,
    db: Session = Depends(get_db)
):

    try:

        return yeu_thich_service.lay_outfit_yeu_thich(
            db,
            ma_nguoi_dung
        )

    except Exception as e:

        return {

            "success": False,

            "message": str(e)
        }
