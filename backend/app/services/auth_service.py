from sqlalchemy.orm import Session

from app.models.NguoiDung import NguoiDung

def dang_nhap_service (db: Session, email: str, matKhau: str):
    user = db.query(NguoiDung).filter(
        NguoiDung.email == email,
        NguoiDung.matKhau == matKhau
    ).first()

    return user

def dang_ky_service(
    db: Session,
    tenDangNhap: str,
    email: str,
    matKhau: str,
    gioiTinh=None,
    ngaySinh=None
):

    # KIEM TRA EMAIL TON TAI

    email_ton_tai = db.query(
        NguoiDung
    ).filter(
        NguoiDung.email == email
    ).first()

    if email_ton_tai:
        return None

    user = NguoiDung(
        tenDangNhap=tenDangNhap,
        email=email,
        matKhau=matKhau,
        gioiTinh=gioiTinh,
        ngaySinh=ngaySinh
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user