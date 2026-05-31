from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    HTTPException
)

from sqlalchemy.orm import (
    Session,
    joinedload
)

from app.db.database import get_db

from app.models.TrangPhuc import TrangPhuc
from app.models.LoaiTrangPhuc import LoaiTrangPhuc

from app.schemas.trang_phuc_schema import TrangPhucCreate

from app.services.XuLyAI import detect_clothing

import traceback

router = APIRouter(
    prefix="/trang-phuc",
    tags=["TrangPhuc"]
)

# =========================================================
# DETECT AI
# =========================================================

@router.post("/detect")
async def analyze_image_for_form(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    try:

        if not file.content_type.startswith("image/"):

            raise HTTPException(

                status_code=400,

                detail="File tải lên phải là ảnh"
            )

        ai_result = await detect_clothing(
            file,
            db
        )

        return {

            "status": "success",

            "message":
            "Phân tích trang phục thành công",

            "data":
            ai_result
        }

    except Exception as e:

        traceback.print_exc()

        raise HTTPException(

            status_code=500,

            detail=f"Lỗi detect AI: {str(e)}"
        )


# =========================================================
# THÊM TRANG PHỤC
# =========================================================

@router.post("/them")
def create_trang_phuc(
    payload: TrangPhucCreate,
    db: Session = Depends(get_db)
):

    try:

        new_trang_phuc = TrangPhuc(

            tenTrangPhuc=
            payload.tenTrangPhuc,

            hinhAnh=
            payload.hinhAnh,

            maMau=
            payload.maMau,

            maHoaTiet=
            payload.maHoaTiet,

            maLoai=
            payload.maLoai,

            maNguoiDung=
            payload.maNguoiDung,

            kieuDang=
            payload.kieuDang
        )

        db.add(new_trang_phuc)

        db.commit()

        db.refresh(new_trang_phuc)

        return {

            "status": "success",

            "message":
            "Thêm trang phục thành công",

            "data": {

                "maTrangPhuc":
                new_trang_phuc.maTrangPhuc,

                "tenTrangPhuc":
                new_trang_phuc.tenTrangPhuc,

                "hinhAnh":
                new_trang_phuc.hinhAnh
            }
        }

    except Exception as e:

        traceback.print_exc()

        db.rollback()

        raise HTTPException(

            status_code=500,

            detail=f"Lỗi lưu DB: {str(e)}"
        )


# =========================================================
# GET ALL
# =========================================================

@router.get("/")
def get_all_trang_phuc(
    db: Session = Depends(get_db)
):

    try:

        ds_trang_phuc = db.query(
            TrangPhuc
        ).options(

            joinedload(
                TrangPhuc.loai
            ).joinedload(
                LoaiTrangPhuc.danhMuc
            )

        ).all()

        result = []

        for item in ds_trang_phuc:

            result.append({

                "maTrangPhuc":
                item.maTrangPhuc,

                "tenTrangPhuc":
                item.tenTrangPhuc,

                "hinhAnh":
                item.hinhAnh,

                "tenDanhMuc":

                item.loai
                .danhMuc
                .tenDanhMuc

                if item.loai
                and item.loai.danhMuc

                else ""
            })

        return result

    except Exception as e:

        traceback.print_exc()

        raise HTTPException(

            status_code=500,

            detail=f"Lỗi get all: {str(e)}"
        )


# =========================================================
# GET BY USER
# =========================================================

@router.get("/user/{ma_nguoi_dung}")
def get_trang_phuc_by_user(
    ma_nguoi_dung: int,
    db: Session = Depends(get_db)
):

    try:

        ds_trang_phuc = db.query(
            TrangPhuc
        ).options(

            joinedload(
                TrangPhuc.loai
            ).joinedload(
                LoaiTrangPhuc.danhMuc
            )

        ).filter(

            TrangPhuc.maNguoiDung
            == ma_nguoi_dung

        ).all()

        result = []

        for item in ds_trang_phuc:

            result.append({

                "maTrangPhuc":
                item.maTrangPhuc,

                "tenTrangPhuc":
                item.tenTrangPhuc,

                "hinhAnh":
                item.hinhAnh,

                "tenDanhMuc":

                item.loai
                .danhMuc
                .tenDanhMuc

                if item.loai
                and item.loai.danhMuc

                else ""
            })

        return result

    except Exception as e:

        traceback.print_exc()

        raise HTTPException(

            status_code=500,

            detail=f"Lỗi get by user: {str(e)}"
        )


# =========================================================
# GET BY ID
# =========================================================

@router.get("/{ma_trang_phuc}")
def get_trang_phuc_by_id(
    ma_trang_phuc: int,
    db: Session = Depends(get_db)
):

    try:

        trang_phuc = db.query(
            TrangPhuc
        ).filter(

            TrangPhuc.maTrangPhuc
            == ma_trang_phuc

        ).first()

        if not trang_phuc:

            raise HTTPException(

                status_code=404,

                detail="Không tìm thấy trang phục"
            )

        return {

            "maTrangPhuc":
            trang_phuc.maTrangPhuc,

            "tenTrangPhuc":
            trang_phuc.tenTrangPhuc,

            "hinhAnh":
            trang_phuc.hinhAnh,

            "maLoai":
            trang_phuc.maLoai,

            "maMau":
            trang_phuc.maMau,

            "maHoaTiet":
            trang_phuc.maHoaTiet,

            "maNguoiDung":
            trang_phuc.maNguoiDung,

            "kieuDang":
            trang_phuc.kieuDang
        }

    except Exception as e:

        traceback.print_exc()

        raise HTTPException(

            status_code=500,

            detail=f"Lỗi get by id: {str(e)}"
        )


# =========================================================
# UPDATE
# =========================================================

@router.put("/cap-nhat/{ma_trang_phuc}")
def update_trang_phuc(
    ma_trang_phuc: int,
    payload: TrangPhucCreate,
    db: Session = Depends(get_db)
):

    try:

        trang_phuc = db.query(
            TrangPhuc
        ).filter(

            TrangPhuc.maTrangPhuc
            == ma_trang_phuc

        ).first()

        if not trang_phuc:

            raise HTTPException(

                status_code=404,

                detail="Không tìm thấy trang phục"
            )

        trang_phuc.tenTrangPhuc = (
            payload.tenTrangPhuc
        )

        trang_phuc.hinhAnh = (
            payload.hinhAnh
        )

        trang_phuc.maLoai = (
            payload.maLoai
        )

        trang_phuc.maMau = (
            payload.maMau
        )

        trang_phuc.maHoaTiet = (
            payload.maHoaTiet
        )

        trang_phuc.maNguoiDung = (
            payload.maNguoiDung
        )

        trang_phuc.kieuDang = (
            payload.kieuDang
        )

        db.commit()

        db.refresh(trang_phuc)

        return {

            "status": "success",

            "message":
            "Cập nhật thành công",

            "data": {

                "maTrangPhuc":
                trang_phuc.maTrangPhuc
            }
        }

    except Exception as e:

        traceback.print_exc()

        db.rollback()

        raise HTTPException(

            status_code=500,

            detail=f"Lỗi update: {str(e)}"
        )


# =========================================================
# DELETE
# =========================================================

@router.delete("/{ma_trang_phuc}")
def delete_trang_phuc(
    ma_trang_phuc: int,
    db: Session = Depends(get_db)
):

    try:

        trang_phuc = db.query(
            TrangPhuc
        ).filter(

            TrangPhuc.maTrangPhuc
            == ma_trang_phuc

        ).first()

        if not trang_phuc:

            raise HTTPException(

                status_code=404,

                detail="Không tìm thấy trang phục"
            )

        db.delete(trang_phuc)

        db.commit()

        return {

            "status": "success",

            "message":
            "Xóa trang phục thành công"
        }

    except Exception as e:

        traceback.print_exc()

        db.rollback()

        raise HTTPException(

            status_code=500,

            detail=f"Lỗi delete: {str(e)}"
        )
    
    