from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.schemas.phoi_do_schema import GoiYPhoiDoRequest
from app.services.phoi_do_service import goi_y_phoi_do

router = APIRouter(
    prefix="/phoi-do",
    tags=["PhoiDo"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/goi-y",
    status_code=status.HTTP_200_OK
)
def goi_y_phoi_do_route(
    request: GoiYPhoiDoRequest,
    db: Session = Depends(get_db)
):

    print("\n" + "="*50)

    print("=== DEBUG REQUEST ===")

    print("selectedItems:",
          request.selectedItems)

    print("items:",
          request.items)

    print("maPhongCach:",
          request.maPhongCach)

    print("maDipSD:",
          request.maDipSD)

    print("="*50 + "\n")

    return goi_y_phoi_do(

        db=db,

        selected_items=
        request.selectedItems,

        uploaded_items=
        request.items,

        ma_phong_cach=
        request.maPhongCach,

        ma_dip_sd=
        request.maDipSD,

        ma_nguoi_dung=
        request.maNguoiDung
    )
