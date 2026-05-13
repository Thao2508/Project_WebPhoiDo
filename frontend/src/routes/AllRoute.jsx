import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DangNhap from "../pages/NguoiDung/DangNhap/DangNhap";
import DangKy from "../pages/NguoiDung/DangKy/DangKy";
import TrangChu from "../pages/NguoiDung/TrangChu/TrangChu";
import PhoiDo from "../pages/NguoiDung/PhoiDo/PhoiDo";
import TuDo from "../pages/NguoiDung/TuDo/TuDo";
import ThemTrangPhuc from "../pages/NguoiDung/TuDo/ThemTrangPhuc";
import YeuThich from "../pages/NguoiDung/YeuThich/YeuThich";

import DangNhapAdmin from "../pages/quanTri/DangNhapAdmin/DangNhapAdmin";
import QlyTaiKhoan from "../pages/quanTri/TaiKhoan/QlyTaiKhoan";
import ThemTaiKhoan from "../pages/quanTri/TaiKhoan/ThemTaiKhoan";
import QuanLyLuatPhoiMau from "../pages/quanTri/LuatPhoiMau/QuanLyLuatPhoiMau";
import ThemQuyTacMau from "../pages/quanTri/LuatPhoiMau/ThemQuyTacMau";
import QuanLyLuatLoaiDo from "../pages/quanTri/LuatPhoiLoaiDo/QuanLyLuatLoaiDo";
import ThemQuyTacLoai from "../pages/quanTri/LuatPhoiLoaiDo/ThemQuytacLoai";
import CapNhatPhongCach from "../pages/quanTri/PhongCach/CapNhatPhongCach";
import CapNhatDipSD from "../pages/quanTri/DipSD/CapNhatDipSD";

export default function AllRoute() {
  return (
    <BrowserRouter>
      <Routes>
         <Route
          path="/"
          element={<TrangChu />}
        />
        <Route
          path="/dangnhap"
          element={<DangNhap />}
        />

        <Route
          path="/dangky"
          element={<DangKy />}
        />
        <Route
          path="/phoido"
          element={<PhoiDo />}
        />
         <Route
          path="/tudo"
          element={<TuDo />}
        />
          <Route
          path="/themtrangphuc"
          element={<ThemTrangPhuc />}
        />
        <Route
          path="/yeuthich"
          element={<YeuThich />}
        />
        <Route
          path="/quantri"
          element={<DangNhapAdmin />}
        />
        <Route
          path="/quantri/taikhoan"
          element={<QlyTaiKhoan />}
        />
        <Route
          path="/quantri/themtaikhoan"
          element={<ThemTaiKhoan />}
        />
        <Route
          path="/quantri/luatphoimau"
          element={<QuanLyLuatPhoiMau />}
        />
         <Route
          path="/quantri/themluatmau"
          element={<ThemQuyTacMau />}
        />
         <Route
          path="/quantri/luatloaido"
          element={<QuanLyLuatLoaiDo />}
        />
         <Route
          path="/quantri/themquytacloai"
          element={<ThemQuyTacLoai />}
        />
        <Route
          path="/quantri/phongcach"
          element={<CapNhatPhongCach />}
        />
        <Route
          path="/quantri/dipsudung"
          element={<CapNhatDipSD />}
        />
      </Routes>
    </BrowserRouter>
  );
}