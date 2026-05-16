from pydantic import BaseModel

class DangNhapRequest(BaseModel):
    email: str
    matKhau: str