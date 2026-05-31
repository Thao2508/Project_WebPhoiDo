from pydantic import BaseModel
from typing import Optional

class TrangPhucCreate(BaseModel):
    tenTrangPhuc: str
    hinhAnh: str
    maMau: int
    maHoaTiet: int
    maLoai: int
    kieuDang: Optional[str] = "Regular"
    maNguoiDung: int

    model_config = {"from_attributes": True}