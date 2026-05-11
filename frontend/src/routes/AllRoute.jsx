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
      </Routes>
    </BrowserRouter>
  );
}