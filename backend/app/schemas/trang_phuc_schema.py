from pydantic import BaseModel

class TrangPhucCreate(BaseModel):

    tenTrangPhuc: str

    hinhAnh: str

    maMau: int

    maHoaTiet: int

    maLoai: int

    maNguoiDung: int

