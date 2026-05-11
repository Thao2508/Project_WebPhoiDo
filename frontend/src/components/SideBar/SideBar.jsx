import "./Sidebar.scss";

import {
  Home,
  Sparkles,
  Shirt,
  Heart,
  LogOut
} from "lucide-react";

import {Link, useNavigate, useLocation} from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();
  // ĐĂNG XUẤT
  const handleDangXuat = () => {

    localStorage.removeItem("user");

    navigate("/dangnhap");
  };

  return (

    <div className="sidebar">

      {/* LOGO */}
      <div className="logo">

        <Shirt size={22} />

        <span>Outfitly</span>

      </div>

      {/* MENU */}
      <div className="menu">

        {/* TRANG CHỦ */}
        <Link
            to="/"
            className="menu-link"
        >

            <div
            className={
                location.pathname === "/"
                ? "menu-item active"
                : "menu-item"
            }
            >

            <Home size={18} />

            <span>Trang chủ</span>

            </div>

        </Link>

        {/* PHỐI ĐỒ */}
        <Link
            to="/phoido"
            className="menu-link"
        >

            <div
            className={
                location.pathname === "/phoido"
                ? "menu-item active"
                : "menu-item"
            }
            >

            <Sparkles size={18} />

            <span>Phối đồ ngay</span>

            </div>

        </Link>

        {/* TỦ ĐỒ */}
        <Link
            to="/tudo"
            className="menu-link"
        >

            <div
            className={
                location.pathname === "/tudo"
                ? "menu-item active"
                : "menu-item"
            }
            >

            <Shirt size={18} />

            <span>Tủ đồ của tôi</span>

            </div>

        </Link>

        {/* YÊU THÍCH */}
        <Link
            to="/yeuthich"
            className="menu-link"
        >

            <div
            className={
                location.pathname === "/yeuthich"
                ? "menu-item active"
                : "menu-item"
            }
            >

            <Heart size={18} />

            <span>Yêu thích</span>

            </div>

        </Link>

        </div>

      {/* LOGOUT */}
      <button
        className="sidebar-logout"
        onClick={handleDangXuat}
      >

        <LogOut size={18} />

        <span>Đăng xuất</span>

      </button>

    </div>
  );
}