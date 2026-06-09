from sqlalchemy.orm import Session

from app.models.NguoiDung import (
    NguoiDung
)


def lay_trang_ca_nhan(
    db: Session,
    maNguoiDung: int
):

    return db.query(
        NguoiDung
    ).filter(
        NguoiDung.maNguoiDung
        == maNguoiDung
    ).first()


def cap_nhat_trang_ca_nhan(
    db: Session,
    maNguoiDung: int,
    data
):

    user = db.query(
        NguoiDung
    ).filter(
        NguoiDung.maNguoiDung
        == maNguoiDung
    ).first()

    if not user:

        return None

    user.tenDangNhap = (
        data.tenDangNhap
    )

    user.gioiTinh = (
        data.gioiTinh
    )

    user.ngaySinh = (
        data.ngaySinh
    )

    if (
        data.matKhau
        and
        data.matKhau.strip()
    ):

        user.matKhau = (
            data.matKhau
        )

    db.commit()

    db.refresh(user)

    return user