from pydantic import BaseModel


class LuatPhoiMauCreate(BaseModel):

    maMau_1: int

    maMau_2: int

    maPhongCach: int

    maDipSD: int

    hopLe: bool


class LuatPhoiMauResponse(BaseModel):

    maLuatMau: int

    maMau_1: int

    maMau_2: int

    maPhongCach: int

    maDipSD: int

    hopLe: bool

    class Config:

        from_attributes = True