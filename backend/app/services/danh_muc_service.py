from sqlalchemy.orm import Session

from app.models.DanhMuc import (
    DanhMuc
)


def get_all_danh_muc(
    db: Session
):

    danhSach = db.query(
        DanhMuc
    ).all()

    result = []

    for item in danhSach:

        result.append({

            "maDanhMuc":
            item.maDanhMuc,

            "tenDanhMuc":
            item.tenDanhMuc,

            "phamViSuDung":
            item.phamViSuDung
        })

    return result


def them_danh_muc(
    db: Session,
    data
):

    check = db.query(
        DanhMuc
    ).filter(

        DanhMuc.tenDanhMuc
        == data.tenDanhMuc

    ).first()

    if check:

        return {

            "success": False,

            "message":
            "Danh mục đã tồn tại"
        }

    danhMuc = DanhMuc(

        tenDanhMuc=
        data.tenDanhMuc,

        phamViSuDung=
        data.phamViSuDung
    )

    db.add(danhMuc)

    db.commit()

    db.refresh(danhMuc)

    return {

        "success": True,

        "data": danhMuc
    }


def cap_nhat_danh_muc(
    db: Session,
    maDanhMuc: int,
    data
):

    danhMuc = db.query(
        DanhMuc
    ).filter(

        DanhMuc.maDanhMuc
        == maDanhMuc

    ).first()

    if not danhMuc:

        return {

            "success": False,

            "message":
            "Không tìm thấy danh mục"
        }

    check = db.query(
        DanhMuc
    ).filter(

        DanhMuc.tenDanhMuc
        == data.tenDanhMuc,

        DanhMuc.maDanhMuc
        != maDanhMuc

    ).first()

    if check:

        return {

            "success": False,

            "message":
            "Tên danh mục đã tồn tại"
        }

    danhMuc.tenDanhMuc = (
        data.tenDanhMuc
    )

    danhMuc.phamViSuDung = (
        data.phamViSuDung
    )

    db.commit()

    db.refresh(danhMuc)

    return {

        "success": True,

        "data": danhMuc
    }


