import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DangNhap from "../pages/NguoiDung/DangNhap/DangNhap";
import DangKy from "../pages/NguoiDung/DangKy/DangKy";
import TrangChu from "../pages/NguoiDung/TrangChu/TrangChu";
import PhoiDo from "../pages/NguoiDung/PhoiDo/PhoiDo";
export default function AllRoute() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<PhoiDo />}
        />
         <Route
          path="/"
          element={<TrangChu />}
        />
        <Route
          path="/"
          element={<DangNhap />}
        />

        <Route
          path="/dangnhap"
          element={<DangNhap />}
        />

        <Route
          path="/dangky"
          element={<DangKy />}
        />

      </Routes>
    </BrowserRouter>
  );
}