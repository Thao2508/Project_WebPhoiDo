from fastapi import APIRouter

from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.schemas.phoi_do_schema import (
    GoiYPhoiDoRequest
)

from app.services.phoi_do_service import (
    goi_y_phoi_do
)

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


@router.post("/goi-y")
def goi_y_phoi_do_route(

    request: GoiYPhoiDoRequest,

    db: Session = Depends(get_db)
):

    return goi_y_phoi_do(

        db,

        request.selectedItems,

        request.maPhongCach,

        request.maDipSD,

        request.maNguoiDung
    )