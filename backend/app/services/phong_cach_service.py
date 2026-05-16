from sqlalchemy.orm import Session

from app.models.PhongCach import (
    PhongCach
)


# =========================
# GET ALL
# =========================

def get_all_phong_cach(
    db: Session
):

    return db.query(
        PhongCach
    ).all()


# =========================
# GET BY ID
# =========================

def get_phong_cach_by_id(
    db: Session,
    maPhongCach: int
):

    return db.query(
        PhongCach
    ).filter(

        PhongCach.maPhongCach
        == maPhongCach

    ).first()


# =========================
# CREATE
# =========================

def them_phong_cach(
    db: Session,
    data
):

    phongCach = PhongCach(

        tenPhongCach=
        data.tenPhongCach,

        moTa=
        data.moTa
    )

    db.add(phongCach)

    db.commit()

    db.refresh(phongCach)

    return {

        "success": True,

        "data": phongCach
    }


# =========================
# UPDATE
# =========================

def cap_nhat_phong_cach(
    db: Session,
    maPhongCach: int,
    data
):

    phongCach = db.query(
        PhongCach
    ).filter(

        PhongCach.maPhongCach
        == maPhongCach

    ).first()

    if not phongCach:

        return {

            "success": False,

            "message":
            "Không tìm thấy phong cách"
        }

    phongCach.tenPhongCach = (
        data.tenPhongCach
    )

    phongCach.moTa = (
        data.moTa
    )

    db.commit()

    db.refresh(phongCach)

    return {

        "success": True,

        "data": phongCach
    }
