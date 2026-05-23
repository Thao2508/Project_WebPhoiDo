from fastapi import FastAPI

from app.db.database import Base
from app.db.database import engine
from app.models.NguoiDung import NguoiDung
from app.routers.auth_route import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

from app.routers.nguoi_dung_route import router as nguoiDungRouter
from app.routers.mau_route import router as mauRouter
from app.routers.luat_phoi_mau_route import router as luatPhoiMauRoute
from app.routers.phong_cach_route import router as phongCachRoute
from app.routers.dip_su_dung_route import router as dipSuDungRoute
from app.routers.luat_phoi_loai_route import router as luatPhoiLoaiRoute
from app.routers.danh_muc_route import router as danhMucRouter
from app.routers.loai_trang_phuc_route import router as loaiTrangPhucRouter
from app.routers.trang_phuc_route import router as trangPhucRouter
from app.routers.hoa_tiet_route import router as hoaTietRouter
from app.routers.phoi_do_route import router as phoiDoRouter

from app.models.Mau import Mau
from app.models.PhongCach import PhongCach
from app.models.DipSuDung import DipSuDung
from app.models.LuatPhoiMau import LuatPhoiMau
from app.schemas.mau_schema import MauCreate
from app.models.DanhMuc import DanhMuc
from app.models.LoaiTrangPhuc import LoaiTrangPhuc
from app.models.HoaTiet import HoaTiet
from app.models.TrangPhuc import TrangPhuc
from app.models.LuatPhoiLoaiDo import LuatPhoiLoaiDo
from app.models.YeuThich import YeuThich
from app.models.BoPhoi import BoPhoi
from app.models.ChiTietBoPhoi import ChiTietBoPhoi

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# ROUTER
app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Auth"]
)

app.include_router(nguoiDungRouter)
app.include_router(mauRouter)
app.include_router(luatPhoiMauRoute)
app.include_router(luatPhoiLoaiRoute)
app.include_router(phongCachRoute)
app.include_router(dipSuDungRoute)
app.include_router(danhMucRouter)
app.include_router(loaiTrangPhucRouter)
app.include_router(trangPhucRouter)
app.include_router(hoaTietRouter)
app.include_router(phoiDoRouter)