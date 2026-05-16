from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.schemas.auth_schema import DangNhapRequest

from app.services.auth_service import dang_nhap_service

from app.db.database import SessionLocal

router = APIRouter()

# DATABASE

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

# DANG NHAP

@router.post("/dangnhap")

def dang_nhap(
    request: DangNhapRequest,
    db: Session = Depends(get_db)
):

    user = dang_nhap_service(
        db,
        request.email,
        request.matKhau
    )

    # KHONG TIM THAY USER

    if not user:

        return {
            "success": False,
            "message": "Sai email hoặc mật khẩu"
        }

    # DANG NHAP THANH CONG

    return {

        "success": True,

        "message": "Đăng nhập thành công",

        "user": {

            "maNguoiDung":
            user.maNguoiDung,

            "tenDangNhap":
            user.tenDangNhap,

            "email":
            user.email,

            "vaiTro":
            user.vaiTro
        }
    }