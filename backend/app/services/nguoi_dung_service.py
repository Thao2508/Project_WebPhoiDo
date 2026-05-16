from sqlalchemy.orm import Session

from app.models.NguoiDung import NguoiDung

from app.schemas.nguoi_dung_schema import (
    NguoiDungCreate,
    NguoiDungUpdate
)


def get_all_nguoi_dung(
    db: Session
):

    return db.query(NguoiDung).all()


def get_nguoi_dung_by_id(
    db: Session,
    maNguoiDung: int
):

    return db.query(NguoiDung).filter(
        NguoiDung.maNguoiDung == maNguoiDung
    ).first()


def search_nguoi_dung(
    db: Session,
    keyword: str
):

    return db.query(NguoiDung).filter(
        NguoiDung.tenDangNhap.contains(keyword)
    ).all()


def create_nguoi_dung(
    db: Session,
    nguoiDung: NguoiDungCreate
):

    dbNguoiDung = NguoiDung(
        tenDangNhap=nguoiDung.tenDangNhap,
        email=nguoiDung.email,
        matKhau=nguoiDung.matKhau,
        gioiTinh=nguoiDung.gioiTinh,
        ngaySinh=nguoiDung.ngaySinh,
        vaiTro=nguoiDung.vaiTro
    )

    db.add(dbNguoiDung)

    db.commit()
    db.refresh(dbNguoiDung)

    return dbNguoiDung


def update_nguoi_dung(
    db: Session,
    maNguoiDung: int,
    data: NguoiDungUpdate
):

    dbNguoiDung = get_nguoi_dung_by_id(
        db,
        maNguoiDung
    )

    if not dbNguoiDung:
        return None

    if data.tenDangNhap is not None:
        dbNguoiDung.tenDangNhap = data.tenDangNhap

    if data.email is not None:
        dbNguoiDung.email = data.email

    if data.matKhau is not None:
        dbNguoiDung.matKhau = data.matKhau

    if data.gioiTinh is not None:
        dbNguoiDung.gioiTinh = data.gioiTinh

    if data.ngaySinh is not None:
        dbNguoiDung.ngaySinh = data.ngaySinh

    if data.vaiTro is not None:
        dbNguoiDung.vaiTro = data.vaiTro

    if data.trangThai is not None:
        dbNguoiDung.trangThai = data.trangThai

    db.commit()
    db.refresh(dbNguoiDung)

    return dbNguoiDung


def khoa_tai_khoan(
    db: Session,
    maNguoiDung: int
):

    dbNguoiDung = get_nguoi_dung_by_id(
        db,
        maNguoiDung
    )

    if not dbNguoiDung:
        return None

    dbNguoiDung.trangThai = False

    db.commit()
    db.refresh(dbNguoiDung)

    return dbNguoiDung


def mo_khoa_tai_khoan(
    db: Session,
    maNguoiDung: int
):

    dbNguoiDung = get_nguoi_dung_by_id(
        db,
        maNguoiDung
    )

    if not dbNguoiDung:
        return None

    dbNguoiDung.trangThai = True

    db.commit()
    db.refresh(dbNguoiDung)

    return dbNguoiDung


