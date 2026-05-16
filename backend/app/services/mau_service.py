from sqlalchemy.orm import Session

from app.models.Mau import Mau


def get_all_mau(
    db: Session
):

    return db.query(Mau).all()


def them_mau(
    db: Session,
    data
):

    check = db.query(Mau).filter(
        Mau.tenMau == data.tenMau
    ).first()

    if check:

        return {

            "success": False,

            "message":
            "Màu đã tồn tại"
        }

    mau = Mau(

        tenMau=data.tenMau,

        maMauHex=data.maMauHex
    )

    db.add(mau)

    db.commit()

    db.refresh(mau)

    return {

        "success": True,

        "data": mau
    }


def xoa_mau(
    db: Session,
    maMau: int
):

    mau = db.query(Mau).filter(
        Mau.maMau == maMau
    ).first()

    if not mau:

        return {

            "success": False
        }

    db.delete(mau)

    db.commit()

    return {

        "success": True
    }