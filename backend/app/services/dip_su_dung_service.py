from sqlalchemy.orm import Session

from app.models.DipSuDung import (
    DipSuDung
)


# GET ALL

def get_all_dip_su_dung(
    db: Session
):

    return db.query(
        DipSuDung
    ).all()


# GET BY ID

def get_dip_su_dung_by_id(
    db: Session,
    maDipSD: int
):

    return db.query(
        DipSuDung
    ).filter(

        DipSuDung.maDipSD
        == maDipSD

    ).first()


# CREATE

def them_dip_su_dung(
    db: Session,
    data
):

    dipSD = DipSuDung(

        tenDipSD=
        data.tenDipSD
    )

    db.add(dipSD)

    db.commit()

    db.refresh(dipSD)

    return {

        "success": True,

        "data": dipSD
    }


# UPDATE

def cap_nhat_dip_su_dung(
    db: Session,
    maDipSD: int,
    data
):

    dipSD = db.query(
        DipSuDung
    ).filter(

        DipSuDung.maDipSD
        == maDipSD

    ).first()

    if not dipSD:

        return {

            "success": False,

            "message":
            "Không tìm thấy dịp sử dụng"
        }

    dipSD.tenDipSD = (
        data.tenDipSD
    )

    db.commit()

    db.refresh(dipSD)

    return {

        "success": True,

        "data": dipSD
    }