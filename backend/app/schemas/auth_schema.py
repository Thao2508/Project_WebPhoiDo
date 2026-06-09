from pydantic import BaseModel
from typing import Optional
class DangNhapRequest(BaseModel):
    email: str
    matKhau: str

class DangKyRequest(BaseModel):
    tenDangNhap: str
    email: str
    matKhau: str
    gioiTinh: Optional[int] = None
    ngaySinh: Optional[str] = None