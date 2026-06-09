from pydantic import BaseModel


class TrangPhucItem(BaseModel):

    maTrangPhuc: int
    tenTrangPhuc: str
    hinhAnh: str

    loai: str | None
    mau: str | None


class OutfitResponse(BaseModel):

    maBoPhoi: int

    tenBoPhoi: str

    moTa: str | None

    phongCach: str | None

    dipSuDung: str | None

    hopLe: bool

    daYeuThich: bool

    trangPhucs: list[TrangPhucItem]


class ThongKeResponse(BaseModel):

    tongTrangPhuc: int

    tongOutfitYeuThich: int
