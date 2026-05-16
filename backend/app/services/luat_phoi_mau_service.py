from sqlalchemy.orm import Session

from sqlalchemy import and_
from sqlalchemy import or_

from app.models.LuatPhoiMau import (
    LuatPhoiMau
)
from app.models.Mau import Mau

from app.models.PhongCach import (
    PhongCach
)

from app.models.DipSuDung import (
    DipSuDung
)


def get_all_luat(
    db: Session
):

    danhSach = db.query(
        LuatPhoiMau
    ).all()

    result = []

    for item in danhSach:

        # MÀU 1

        mau1 = db.query(Mau).filter(
            Mau.maMau
            == item.maMau_1
        ).first()

        # MÀU 2

        mau2 = db.query(Mau).filter(
            Mau.maMau
            == item.maMau_2
        ).first()

        # PHONG CÁCH

        phongCach = db.query(
            PhongCach
        ).filter(

            PhongCach.maPhongCach
            == item.maPhongCach

        ).first()

        # DỊP SỬ DỤNG

        dipSD = db.query(
            DipSuDung
        ).filter(

            DipSuDung.maDipSD
            == item.maDipSD

        ).first()

        result.append({

            "maLuatMau":
            item.maLuatMau,
            "maMau_1":
            item.maMau_1,

            "maMau_2":
            item.maMau_2,

            "maPhongCach":
            item.maPhongCach,

            "maDipSD":
            item.maDipSD,

            "tenMau1":
            mau1.tenMau if mau1 else "",

            "tenMau2":
            mau2.tenMau if mau2 else "",

            "maMauHex1":
            mau1.maMauHex if mau1 else "",

            "maMauHex2":
            mau2.maMauHex if mau2 else "",

            "tenPhongCach":
            phongCach.tenPhongCach
            if phongCach else "",

            "tenDipSD":
            dipSD.tenDipSD
            if dipSD else "",

            "hopLe":
            item.hopLe
        })

    return result


def them_luat(
    db: Session,
    data
):

    # KHÔNG ĐƯỢC TRÙNG

    if data.maMau_1 == data.maMau_2:

        return {

            "success": False,

            "message":
            "Hai màu không được trùng nhau"
        }


    checkLuat = db.query(
        LuatPhoiMau
    ).filter(

        and_(


            or_(

                and_(

                    LuatPhoiMau.maMau_1
                    == data.maMau_1,

                    LuatPhoiMau.maMau_2
                    == data.maMau_2
                ),

                and_(

                    LuatPhoiMau.maMau_1
                    == data.maMau_2,

                    LuatPhoiMau.maMau_2
                    == data.maMau_1
                )
            ),

            # CHECK PHONG CÁCH

            LuatPhoiMau.maPhongCach
            == data.maPhongCach,

            # CHECK DỊP

            LuatPhoiMau.maDipSD
            == data.maDipSD
        )

    ).first()
    

    if checkLuat:

        return {

            "success": False,

            "message":
            "Luật phối màu đã tồn tại"
        }

    # THÊM MỚI

    luat = LuatPhoiMau(

        maMau_1=data.maMau_1,

        maMau_2=data.maMau_2,

        maPhongCach=data.maPhongCach,

        maDipSD=data.maDipSD,

        hopLe=data.hopLe
    )

    db.add(luat)

    db.commit()

    db.refresh(luat)

    return {

        "success": True,

        "data": luat
    }

def cap_nhat_luat(
    db: Session,
    maLuatMau: int,
    data
):

    luat = db.query(
        LuatPhoiMau
    ).filter(

        LuatPhoiMau.maLuatMau
        == maLuatMau

    ).first()

    if not luat:

        return {
            "success": False,
            "message": "Không tìm thấy luật"
        }

    # CHECK TRÙNG

    if data.maMau_1 == data.maMau_2:

        return {
            "success": False,
            "message": "Hai màu không được trùng nhau"
        }

    # CHECK TRÙNG LUẬT

    checkLuat = db.query(
        LuatPhoiMau
    ).filter(

        LuatPhoiMau.maLuatMau
        != maLuatMau,

        and_(

            or_(

                and_(

                    LuatPhoiMau.maMau_1
                    == data.maMau_1,

                    LuatPhoiMau.maMau_2
                    == data.maMau_2
                ),

                and_(

                    LuatPhoiMau.maMau_1
                    == data.maMau_2,

                    LuatPhoiMau.maMau_2
                    == data.maMau_1
                )
            ),

            LuatPhoiMau.maPhongCach
            == data.maPhongCach,

            LuatPhoiMau.maDipSD
            == data.maDipSD
        )

    ).first()

    if checkLuat:

        return {
            "success": False,
            "message": "Luật phối màu đã tồn tại"
        }

    # UPDATE

    luat.maMau_1 = data.maMau_1
    luat.maMau_2 = data.maMau_2
    luat.maPhongCach = data.maPhongCach
    luat.maDipSD = data.maDipSD
    luat.hopLe = data.hopLe

    db.commit()

    db.refresh(luat)

    return {
        "success": True,
        "data": luat
    }


def xoa_luat(
    db: Session,
    maLuatMau: int
):

    luat = db.query(
        LuatPhoiMau
    ).filter(

        LuatPhoiMau.maLuatMau
        == maLuatMau

    ).first()

    if not luat:

        return {
            "success": False
        }

    db.delete(luat)

    db.commit()

    return {
        "success": True
    }