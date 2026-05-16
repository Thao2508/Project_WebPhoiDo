from pydantic import BaseModel


class DipSuDungCreate(
    BaseModel
):

    tenDipSD: str


class DipSuDungResponse(
    BaseModel
):

    maDipSD: int

    tenDipSD: str

    class Config:

        from_attributes = True