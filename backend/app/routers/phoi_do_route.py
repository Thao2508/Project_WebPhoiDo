from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.schemas.phoi_do_schema import GoiYPhoiDoRequest
from app.services.phoi_do_service import goi_y_phoi_do

router = APIRouter(
    prefix="/phoi-do",
    tags=["Phối đồ"]
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
    # ================== ĐOẠN CODE DEBUG ĐƯỢC CHÈN VÀO ==================
    print("\n" + "="*50)
    print("=== [DEBUG] FRONTEND GỬI DATA LÊN ROUTER ===")
    print(f"-> selectedItems (Danh sách ID đồ): {request.selectedItems}")
    print(f"-> maPhongCach (ID Phong cách)   : {request.maPhongCach}")
    print(f"-> maDipSD (ID Dịp sử dụng)      : {request.maDipSD}")
    print(f"-> maNguoiDung (ID Người dùng)   : {request.maNguoiDung}")
    print("="*50 + "\n")
    # ===================================================================

    return goi_y_phoi_do(
        db=db,
        selected_items=request.selectedItems,
        ma_phong_cach=request.maPhongCach,
        ma_dip_sd=request.maDipSD,
        ma_nguoi_dung=request.maNguoiDung
    )

