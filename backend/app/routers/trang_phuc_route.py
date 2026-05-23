from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends
from fastapi import Form

from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.services.UpLoadAnh import upload_image

from app.services.XuLyAI import detect_clothing

from app.models.TrangPhuc import TrangPhuc


router = APIRouter(
    prefix="/trang-phuc",
    tags=["Trang phục"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@router.get("")
def get_all_trang_phuc(

    db: Session = Depends(get_db)
):

    data = db.query(
        TrangPhuc
    ).all()


    result = []


    for item in data:


        result.append({

            "maTrangPhuc": item.maTrangPhuc,

            "tenTrangPhuc": item.tenTrangPhuc,

            "hinhAnh": item.hinhAnh,

            "tenLoai": item.loai.tenLoai,

            "tenMau": item.mau.tenMau,

            "tenHoaTiet": item.hoaTiet.tenHoaTiet,

            "tenDanhMuc":

                item.loai.danhMuc.tenDanhMuc
        })


    return result

@router.get("/{maTrangPhuc}")
def get_trang_phuc_by_id(

    maTrangPhuc: int,

    db: Session = Depends(get_db)
):

    item = db.query(
        TrangPhuc
    ).filter(
        TrangPhuc.maTrangPhuc == maTrangPhuc
    ).first()

    if not item:

        return {
            "message": "Không tìm thấy"
        }

    return {

        "maTrangPhuc": item.maTrangPhuc,

        "tenTrangPhuc": item.tenTrangPhuc,

        "hinhAnh": item.hinhAnh,

        "maLoai": item.maLoai,

        "maMau": item.maMau,

        "maHoaTiet": item.maHoaTiet
    }


@router.post("/detect")
async def detect(

    file: UploadFile = File(...),

    db: Session = Depends(get_db)
):

    result = await detect_clothing( file, db )

    return result


@router.post("/them")
async def them_trang_phuc(

    file: UploadFile = File(...),

    tenTrangPhuc: str = Form(...),

    maLoai: int = Form(...),

    maMau: int = Form(...),

    maHoaTiet: int = Form(...),

    maNguoiDung: int = Form(...),

    db: Session = Depends(get_db)
):

    image_url = upload_image(file)

    item = TrangPhuc(

        tenTrangPhuc=tenTrangPhuc,

        hinhAnh=image_url,

        maLoai=maLoai,

        maMau=maMau,

        maHoaTiet=maHoaTiet,

        maNguoiDung=maNguoiDung
    )

    db.add(item)

    db.commit()

    db.refresh(item)


    return {

        "message": "Thêm trang phục thành công",

        "imageUrl": image_url
    }


@router.put("/{ma_trang_phuc}")
async def update_trang_phuc(

    ma_trang_phuc: int,

    data: dict,

    db: Session = Depends(get_db)
):

    item = db.query(
        TrangPhuc
    ).filter(

        TrangPhuc.maTrangPhuc
        == ma_trang_phuc

    ).first()



    if not item:

        return {
            "message": "Không tìm thấy"
        }



    item.tenTrangPhuc = data["tenTrangPhuc"]

    item.maLoai = data["maLoai"]

    item.maMau = data["maMau"]



    db.commit()



    return {
        "message": "Cập nhật thành công"
    }


@router.delete("/{maTrangPhuc}")
def xoa_trang_phuc(

    maTrangPhuc: int,

    db: Session = Depends(get_db)
):

    item = db.query(
        TrangPhuc
    ).filter(
        TrangPhuc.maTrangPhuc == maTrangPhuc
    ).first()

    # Không tìm thấy
    if not item:

        return {
            "message": "Không tìm thấy trang phục"
        }

    # Xóa
    db.delete(item)

    db.commit()

    return {
        "message": "Xóa trang phục thành công"
    }
