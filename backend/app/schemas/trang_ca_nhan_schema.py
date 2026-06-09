from pydantic import BaseModel

from typing import Optional

from datetime import date


class CapNhatTrangCaNhanRequest(
    BaseModel
):

    tenDangNhap: str

    gioiTinh: Optional[int] = None

    ngaySinh: Optional[date] = None

    matKhau: Optional[str] = None


class TrangCaNhanResponse(
    BaseModel
):

    maNguoiDung: int

    tenDangNhap: str

    email: str

    gioiTinh: Optional[int]

    ngaySinh: Optional[date]

    class Config:

        from_attributes = True