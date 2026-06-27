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
from app.models.Mau import Mau
from app.models.TrangPhuc import TrangPhuc
from app.models.LoaiTrangPhuc import LoaiTrangPhuc
from app.models.ChiTietBoPhoi import ChiTietBoPhoi
from app.models.BoPhoi import BoPhoi
from app.schemas.trang_phuc_schema import TrangPhucCreate

from app.services.XuLyAI import detect_clothing

import traceback

router = APIRouter(
    prefix="/trang-phuc",
    tags=["TrangPhuc"]
)


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
            ),

            joinedload(
                TrangPhuc.mau
            ).filter(
                TrangPhuc.trangThai == True
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

                "kieuDang":
                item.kieuDang,

                "loai": {

                    "maLoai":
                    item.loai.maLoai,

                    "tenLoai":
                    item.loai.tenLoai,

                    "danhMuc": {

                        "maDanhMuc":

                        item.loai
                        .danhMuc
                        .maDanhMuc,

                        "tenDanhMuc":

                        item.loai
                        .danhMuc
                        .tenDanhMuc
                    }
                }

                if item.loai
                and item.loai.danhMuc

                else None,

                "mau": {

                    "maMau":
                    item.mau.maMau,

                    "tenMau":
                    item.mau.tenMau,

                    "maMauHex":
                    item.mau.maMauHex
                }

                if item.mau

                else None
            })

        return result

    except Exception as e:

        traceback.print_exc()

        raise HTTPException(

            status_code=500,

            detail=f"Lỗi get all: {str(e)}"
        )


@router.get("/user/{maNguoiDung}")
def get_trang_phuc_by_user(
    maNguoiDung: int,
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
            ),

            joinedload(
                TrangPhuc.mau
            )

        ).filter(

            TrangPhuc.maNguoiDung == maNguoiDung,
            TrangPhuc.trangThai == True
            
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

                "kieuDang":
                item.kieuDang,

                "loai": {

                    "maLoai":
                    item.loai.maLoai,

                    "tenLoai":
                    item.loai.tenLoai,

                    "danhMuc": {

                        "maDanhMuc":

                        item.loai
                        .danhMuc
                        .maDanhMuc,

                        "tenDanhMuc":

                        item.loai
                        .danhMuc
                        .tenDanhMuc
                    }
                }

                if item.loai
                and item.loai.danhMuc

                else None,

                "mau": {

                    "maMau":
                    item.mau.maMau,

                    "tenMau":
                    item.mau.tenMau,

                    "maMauHex":
                    item.mau.maMauHex
                }

                if item.mau

                else None
            })

        return result

    except Exception as e:

        traceback.print_exc()

        raise HTTPException(

            status_code=500,

            detail=f"Lỗi get by user: {str(e)}"
        )

@router.get("/{maTrangPhuc}")
def get_trang_phuc_by_id(
    maTrangPhuc: int,
    db: Session = Depends(get_db)
):

    try:

        trang_phuc = db.query(
            TrangPhuc
        ).filter(

            TrangPhuc.maTrangPhuc
            == maTrangPhuc

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


# UPDATE
@router.put("/cap-nhat/{maTrangPhuc}")
def update_trang_phuc(
    maTrangPhuc: int,
    payload: TrangPhucCreate,
    db: Session = Depends(get_db)
):

    try:

        trang_phuc = db.query(
            TrangPhuc
        ).filter(

            TrangPhuc.maTrangPhuc
            == maTrangPhuc

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


# DELETE
@router.delete("/{maTrangPhuc}")
def delete_trang_phuc(
    maTrangPhuc: int,
    db: Session = Depends(get_db)
    ):


    try:

        trang_phuc = db.query(
            TrangPhuc
        ).filter(

            TrangPhuc.maTrangPhuc
            == maTrangPhuc

        ).first()

        if not trang_phuc:

            raise HTTPException(

                status_code=404,

                detail="Không tìm thấy trang phục"
            )

        co_trong_bo_phoi = db.query(
            ChiTietBoPhoi
        ).filter(

            ChiTietBoPhoi.maTrangPhuc
            == maTrangPhuc

        ).first()


        if not co_trong_bo_phoi:

            db.delete(trang_phuc)

            db.commit()

            return {

                "status": "success",

                "message":
                "Đã xóa trang phục khỏi tủ đồ"
            }

        trang_phuc.trangThai = False

        db.commit()

        return {

            "status": "success",

            "message":
            "Đã xóa trang phục khỏi tủ đồ"
        }

    except HTTPException as e:

        raise e

    except Exception as e:

        traceback.print_exc()

        db.rollback()

        raise HTTPException(

            status_code=500,

            detail=f"Lỗi delete: {str(e)}"
        )
