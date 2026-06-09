from pydantic import BaseModel


class LoaiTrangPhucCreate(BaseModel):

    tenLoai: str

    maDanhMuc: int

    tuKhoaNhanDien: str


class LoaiTrangPhucResponse(BaseModel):

    maLoai: int

    tenLoai: str

    maDanhMuc: int

    tuKhoaNhanDien: str

    class Config:

        from_attributes = True