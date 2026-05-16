from sqlalchemy.orm import Session

from sqlalchemy import and_
from sqlalchemy import or_

from app.models.LuatPhoiLoaiDo import (
    LuatPhoiLoaiDo
)

from app.models.LoaiTrangPhuc import (
    LoaiTrangPhuc
)

from app.models.DanhMuc import (
    DanhMuc
)
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
        LuatPhoiLoaiDo
    ).all()

    result = []

    for item in danhSach:

        loai1 = db.query(
            LoaiTrangPhuc
        ).filter(

            LoaiTrangPhuc.maLoai
            == item.maLoai_1

        ).first()

        loai2 = db.query(
            LoaiTrangPhuc
        ).filter(

            LoaiTrangPhuc.maLoai
            == item.maLoai_2

        ).first()

        phongCach = db.query(
            PhongCach
        ).filter(

            PhongCach.maPhongCach
            == item.maPhongCach

        ).first()

        dipSD = db.query(
            DipSuDung
        ).filter(

            DipSuDung.maDipSD
            == item.maDipSD

        ).first()

        result.append({

            "maLuat":
            item.maLuat,

            "maLoai_1":
            item.maLoai_1,

            "maLoai_2":
            item.maLoai_2,

            "maPhongCach":
            item.maPhongCach,

            "maDipSD":
            item.maDipSD,

            "tenLoai1":
            loai1.tenLoai
            if loai1 else "",

            "tenLoai2":
            loai2.tenLoai
            if loai2 else "",

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

    # KHÔNG ĐƯỢC CHỌN TRÙNG

    if data.maLoai_1 == data.maLoai_2:

        return {

            "success": False,

            "message":
            "Hai loại không được trùng nhau"
        }

    # CHECK TRÙNG QUY TẮC

    checkLuat = db.query(
        LuatPhoiLoaiDo
    ).filter(

        LuatPhoiLoaiDo.maLoai_1
        == data.maLoai_1,

        LuatPhoiLoaiDo.maLoai_2
        == data.maLoai_2,

        LuatPhoiLoaiDo.maPhongCach
        == data.maPhongCach,

        LuatPhoiLoaiDo.maDipSD
        == data.maDipSD

    ).first()

    if checkLuat:

        return {

            "success": False,

            "message":
            "Quy tắc đã tồn tại"
        }

    # THÊM MỚI

    luat = LuatPhoiLoaiDo(

        maLoai_1=data.maLoai_1,

        maLoai_2=data.maLoai_2,

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
    maLuat: int,
    data
):

    luat = db.query(
        LuatPhoiLoaiDo
    ).filter(

        LuatPhoiLoaiDo.maLuat
        == maLuat

    ).first()

    if not luat:

        return {

            "success": False,

            "message":
            "Không tìm thấy luật"
        }

    # CHECK TRÙNG

    checkLuat = db.query(
        LuatPhoiLoaiDo
    ).filter(

        LuatPhoiLoaiDo.maLoai_1
        == data.maLoai_1,

        LuatPhoiLoaiDo.maLoai_2
        == data.maLoai_2,

        LuatPhoiLoaiDo.maPhongCach
        == data.maPhongCach,

        LuatPhoiLoaiDo.maDipSD
        == data.maDipSD,

        LuatPhoiLoaiDo.maLuat
        != maLuat

    ).first()

    if checkLuat:

        return {

            "success": False,

            "message":
            "Quy tắc đã tồn tại"
        }

    # UPDATE

    luat.maLoai_1 = data.maLoai_1

    luat.maLoai_2 = data.maLoai_2

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
    maLuat: int
):

    luat = db.query(
        LuatPhoiLoaiDo
    ).filter(

        LuatPhoiLoaiDo.maLuat
        == maLuat

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