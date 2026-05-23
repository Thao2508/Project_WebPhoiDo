from pydantic import BaseModel

from typing import List


class GoiYPhoiDoRequest(BaseModel):

    selectedItems: List[int]

    maPhongCach: int

    maDipSD: int

    maNguoiDung: int