from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.schemas.auth_schemas import DangNhapRequest

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

# DANG NHAP ADMIN

@router.post("/dangnhap")

def dang_nhap_admin(
    request: DangNhapRequest,
    db: Session = Depends(get_db)
):

    user = dang_nhap_service(
        db,
        request.email,
        request.matKhau
    )

    # KHONG TIM THAY

    if not user:

        return {
            "success": False,
            "message": "Sai email hoặc mật khẩu"
        }

    # KHONG PHAI ADMIN

    if user.vaiTro != 1:

        return {
            "success": False,
            "message":
            "Tài khoản này không phải admin"
        }

    # THANH CONG

    return {

        "success": True,

        "message":
        "Đăng nhập admin thành công",

        "admin": {

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