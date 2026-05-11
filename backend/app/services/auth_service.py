from sqlalchemy.orm import Session

from app.models.NguoiDung import NguoiDung

def dang_nhap_service (db: Session, email: str, matKhau: str):
    user = db.query(NguoiDung).filter(
        NguoiDung.email == email,
        NguoiDung.matKhau == matKhau
    ).first()

    return user