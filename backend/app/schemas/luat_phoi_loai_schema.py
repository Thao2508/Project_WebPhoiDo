from pydantic import BaseModel


class LuatPhoiLoaiCreate(BaseModel):

    maLoai_1: int

    maLoai_2: int

    maPhongCach: int

    maDipSD: int

    hopLe: bool


class LuatPhoiLoaiResponse(BaseModel):

    maLuat: int

    maLoai_1: int

    maLoai_2: int

    maPhongCach: int

    maDipSD: int

    hopLe: bool

    class Config:

        from_attributes = True