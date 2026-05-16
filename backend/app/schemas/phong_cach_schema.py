from pydantic import BaseModel


class PhongCachCreate(
    BaseModel
):

    tenPhongCach: str

    moTa: str | None = None


class PhongCachResponse(
    BaseModel
):

    maPhongCach: int

    tenPhongCach: str

    moTa: str | None = None

    class Config:

        from_attributes = True