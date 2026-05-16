from pydantic import BaseModel
from typing import Optional
from datetime import date


class NguoiDungCreate(BaseModel):

    tenDangNhap: str
    email: str
    matKhau: str
    gioiTinh: Optional[int] = None
    ngaySinh: Optional[date] = None
    vaiTro: int = 0


class NguoiDungUpdate(BaseModel):

    tenDangNhap: Optional[str] = None
    email: Optional[str] = None
    matKhau: Optional[str] = None
    gioiTinh: Optional[int] = None
    ngaySinh: Optional[date] = None
    vaiTro: Optional[int] = None
    trangThai: Optional[bool] = None


class NguoiDungResponse(BaseModel):

    maNguoiDung: int
    tenDangNhap: str
    email: str
    gioiTinh: Optional[int]
    ngaySinh: Optional[date]
    vaiTro: int
    trangThai: bool

    class Config:
        from_attributes = True