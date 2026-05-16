from pydantic import BaseModel


class MauCreate(BaseModel):

    tenMau: str

    maMauHex: str


class MauResponse(BaseModel):

    maMau: int

    tenMau: str

    maMauHex: str

    class Config:

        from_attributes = True