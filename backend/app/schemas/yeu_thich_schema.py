from pydantic import BaseModel
from typing import Optional


class OutfitSaveRequest(BaseModel):

    maNguoiDung: int

    trangThai: int

    maLuat: Optional[int] = None

    maLuatMau: Optional[int] = None

    outfit: dict