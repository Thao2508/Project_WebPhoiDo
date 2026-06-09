from sqlalchemy.orm import Session

from app.models.LoaiTrangPhuc import (
    LoaiTrangPhuc
)

from app.models.DanhMuc import (
    DanhMuc
)


def get_all_loai(
    db: Session
):

    danhSach = db.query(
        LoaiTrangPhuc
    ).all()

    result = []

    for item in danhSach:

        danhMuc = db.query(
            DanhMuc
        ).filter(

            DanhMuc.maDanhMuc
            == item.maDanhMuc

        ).first()

        result.append({

            "maLoai":
            item.maLoai,

            "tenLoai":
            item.tenLoai,

            "maDanhMuc":
            item.maDanhMuc,

            "tuKhoaNhanDien":
            item.tuKhoaNhanDien,

            "tenDanhMuc":
            danhMuc.tenDanhMuc
            if danhMuc else "",

            "phamViSuDung":
            danhMuc.phamViSuDung
            if danhMuc else ""
        })

    return result


def them_loai(
    db: Session,
    data
):

    check = db.query(
        LoaiTrangPhuc
    ).filter(

        LoaiTrangPhuc.tenLoai
        == data.tenLoai

    ).first()

    if check:

        return {

            "success": False,

            "message":
            "Loại trang phục đã tồn tại"
        }

    loai = LoaiTrangPhuc(

        tenLoai=
        data.tenLoai,

        maDanhMuc=
        data.maDanhMuc,

        tuKhoaNhanDien=
        data.tuKhoaNhanDien
        )

    db.add(loai)

    db.commit()

    db.refresh(loai)

    return {

        "success": True,

        "data": loai
    }


def cap_nhat_loai(
    db: Session,
    maLoai: int,
    data
):

    loai = db.query(
        LoaiTrangPhuc
    ).filter(

        LoaiTrangPhuc.maLoai
        == maLoai

    ).first()

    if not loai:

        return {

            "success": False,

            "message":
            "Không tìm thấy loại trang phục"
        }

    check = db.query(
        LoaiTrangPhuc
    ).filter(

        LoaiTrangPhuc.tenLoai
        == data.tenLoai,

        LoaiTrangPhuc.maLoai
        != maLoai

    ).first()

    if check:

        return {

            "success": False,

            "message":
            "Tên loại đã tồn tại"
        }

    loai.tenLoai = (
        data.tenLoai
    )

    loai.maDanhMuc = (
        data.maDanhMuc
    )

    loai.tuKhoaNhanDien = (
        data.tuKhoaNhanDien
    )

    db.commit()

    db.refresh(loai)

    return {

        "success": True,

        "data": loai
    }

