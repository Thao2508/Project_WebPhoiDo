import "./SideBarAdmin.scss";

import {
  LayoutDashboard,
  Users,
  Palette,
  Shirt,
  Sparkles,
  CalendarDays,
  BarChart3,
  LogOut
} from "lucide-react";

import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

export default function SideBarAdmin() {

  const navigate = useNavigate();

  const location = useLocation();

  // ĐĂNG XUẤT

  const handleDangXuat = () => {

    localStorage.removeItem("admin");
    navigate("/quantri");

  };

  return (

    <div className="sidebar-admin">

      {/* LOGO */}

      <div className="logo-admin">

        <Shirt size={22} />

        <span>Outfitly</span>

      </div>

      {/* MENU */}

      <div className="menu-admin">

        {/* TÀI KHOẢN */}

        <Link
          to="/quantri/taikhoan"
          className="menu-link-admin"
        >

          <div
            className={
              location.pathname ===
              "/quantri/taikhoan"

              ? "menu-item-admin active"

              : "menu-item-admin"
            }
          >

            <Users size={18} />

            <span>Tài khoản</span>

          </div>

        </Link>

        {/* LUẬT PHỐI MÀU */}

        <Link
          to="/quantri/luatphoimau"
          className="menu-link-admin"
        >

          <div
            className={
              location.pathname ===
              "/quantri/luatphoimau"

              ? "menu-item-admin active"

              : "menu-item-admin"
            }
          >

            <Palette size={18} />

            <span>Quy tắc phối màu</span>

          </div>

        </Link>

        {/* LUẬT PHỐI LOẠI ĐỒ */}

        <Link
          to="/quantri/luatphoiloai"
          className="menu-link-admin"
        >

          <div
            className={
              location.pathname ===
              "/quantri/luatphoiloai"

              ? "menu-item-admin active"

              : "menu-item-admin"
            }
          >

            <Shirt size={18} />

            <span>Quy tắc phối loại</span>

          </div>

        </Link>

        {/* PHONG CÁCH */}

        <Link
          to="/quantri/phongcach"
          className="menu-link-admin"
        >

          <div
            className={
              location.pathname ===
              "/quantri/phongcach"

              ? "menu-item-admin active"

              : "menu-item-admin"
            }
          >

            <Sparkles size={18} />

            <span>Phong cách</span>

          </div>

        </Link>

        {/* DỊP SỬ DỤNG */}

        <Link
          to="/quantri/dipsudung"
          className="menu-link-admin"
        >

          <div
            className={
              location.pathname ===
              "/quantri/dipsudung"

              ? "menu-item-admin active"

              : "menu-item-admin"
            }
          >

            <CalendarDays size={18} />

            <span>Dịp sử dụng</span>

          </div>

        </Link>
      </div>

      {/* LOGOUT */}

      <button
        className="sidebar-logout-admin"
        onClick={handleDangXuat}
      >

        <LogOut size={18} />

        <span>Đăng xuất</span>

      </button>

    </div>
  );
}