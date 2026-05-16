from pydantic import BaseModel


class DanhMucCreate(BaseModel):

    tenDanhMuc: str

    phamViSuDung: str


class DanhMucResponse(BaseModel):

    maDanhMuc: int

    tenDanhMuc: str

    phamViSuDung: str

    class Config:

        from_attributes = True