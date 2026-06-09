from pydantic import BaseModel

from typing import List
from typing import Optional


class ItemPhoiDo(BaseModel):

    maLoai: int

    maMau: int

    maHoaTiet: int

    kieuDang: str

    hinhAnh: str


class GoiYPhoiDoRequest(BaseModel):

    # phối đồ từ tủ đồ

    selectedItems: Optional[
        List[int]
    ] = []

    maNguoiDung: Optional[int] = None

    # phối đồ ngay

    items: Optional[
        List[ItemPhoiDo]
    ] = []

    # chung

    maPhongCach: int

    maDipSD: int
