from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.db.database import (
    SessionLocal
)

from app.schemas.trang_ca_nhan_schema import (
    CapNhatTrangCaNhanRequest,
    TrangCaNhanResponse
)

from app.services.trang_ca_nhan_service import (
    lay_trang_ca_nhan,
    cap_nhat_trang_ca_nhan
)

router = APIRouter(

    prefix="/trang-ca-nhan",

    tags=["TrangCaNhan"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.get(
    "/{maNguoiDung}",
    response_model=
    TrangCaNhanResponse
)
def lay_thong_tin_ca_nhan(

    maNguoiDung: int,

    db: Session = Depends(
        get_db
    )
):

    user = lay_trang_ca_nhan(

        db,

        maNguoiDung
    )

    if not user:

        raise HTTPException(

            status_code=404,

            detail=
            "Không tìm thấy người dùng"
        )

    return user


@router.put(
    "/{maNguoiDung}"
)
def cap_nhat_thong_tin_ca_nhan(

    maNguoiDung: int,

    data:
    CapNhatTrangCaNhanRequest,

    db: Session = Depends(
        get_db
    )
):

    user = cap_nhat_trang_ca_nhan(

        db,

        maNguoiDung,

        data
    )

    if not user:

        raise HTTPException(

            status_code=404,

            detail=
            "Không tìm thấy người dùng"
        )

    return {

        "success": True,

        "message":
        "Cập nhật thành công",

        "user": {

            "maNguoiDung":
            user.maNguoiDung,

            "tenDangNhap":
            user.tenDangNhap,

            "email":
            user.email,

            "gioiTinh":
            user.gioiTinh,

            "ngaySinh":
            user.ngaySinh
        }
    }