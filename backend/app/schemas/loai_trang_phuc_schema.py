from pydantic import BaseModel


class LoaiTrangPhucCreate(BaseModel):

    tenLoai: str

    maDanhMuc: int


class LoaiTrangPhucResponse(BaseModel):

    maLoai: int

    tenLoai: str

    maDanhMuc: int

    class Config:

        from_attributes = True