from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.schemas.nguoi_dung_schema import (
    NguoiDungCreate,
    NguoiDungUpdate,
    NguoiDungResponse
)

from app.services.nguoi_dung_service import (
    get_all_nguoi_dung,
    get_nguoi_dung_by_id,
    search_nguoi_dung,
    create_nguoi_dung,
    update_nguoi_dung,
    khoa_tai_khoan,
    mo_khoa_tai_khoan
)

router = APIRouter(
    prefix="/nguoi-dung",
    tags=["NguoiDung"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get(
    "/",
    response_model=list[NguoiDungResponse]
)
def danh_sach_nguoi_dung(
    db: Session = Depends(get_db)
):

    return get_all_nguoi_dung(db)


@router.get(
    "/search/{keyword}",
    response_model=list[NguoiDungResponse]
)
def tim_kiem_nguoi_dung(
    keyword: str,
    db: Session = Depends(get_db)
):

    return search_nguoi_dung(
        db,
        keyword
    )


@router.get(
    "/{maNguoiDung}",
    response_model=NguoiDungResponse
)
def lay_nguoi_dung(
    maNguoiDung: int,
    db: Session = Depends(get_db)
):

    nguoiDung = get_nguoi_dung_by_id(
        db,
        maNguoiDung
    )

    if not nguoiDung:
        raise HTTPException(
            status_code=404,
            detail="Không tìm thấy người dùng"
        )

    return nguoiDung


@router.post(
    "/",
    response_model=NguoiDungResponse
)
def them_nguoi_dung(
    nguoiDung: NguoiDungCreate,
    db: Session = Depends(get_db)
):

    return create_nguoi_dung(
        db,
        nguoiDung
    )


@router.put(
    "/{maNguoiDung}",
    response_model=NguoiDungResponse
)
def cap_nhat_nguoi_dung(
    maNguoiDung: int,
    data: NguoiDungUpdate,
    db: Session = Depends(get_db)
):

    nguoiDung = update_nguoi_dung(
        db,
        maNguoiDung,
        data
    )

    if not nguoiDung:
        raise HTTPException(
            status_code=404,
            detail="Không tìm thấy người dùng"
        )

    return nguoiDung


@router.put(
    "/khoa/{maNguoiDung}",
    response_model=NguoiDungResponse
)
def khoa_tai_khoan_route(
    maNguoiDung: int,
    db: Session = Depends(get_db)
):

    nguoiDung = khoa_tai_khoan(
        db,
        maNguoiDung
    )

    if not nguoiDung:
        raise HTTPException(
            status_code=404,
            detail="Không tìm thấy người dùng"
        )

    return nguoiDung


@router.put(
    "/mo-khoa/{maNguoiDung}",
    response_model=NguoiDungResponse
)
def mo_khoa_tai_khoan_route(
    maNguoiDung: int,
    db: Session = Depends(get_db)
):

    nguoiDung = mo_khoa_tai_khoan(
        db,
        maNguoiDung
    )

    if not nguoiDung:
        raise HTTPException(
            status_code=404,
            detail="Không tìm thấy người dùng"
        )

    return nguoiDung
