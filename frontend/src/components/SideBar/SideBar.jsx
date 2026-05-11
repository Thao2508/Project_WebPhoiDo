import "./Sidebar.scss";

import {
  Home,
  Sparkles,
  Shirt,
  Heart,
  Clock3,
  Palette,
  CalendarDays,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">
        <Shirt size={22} />
        <span>StyleMate</span>
      </div>

      <div className="menu">

        <div className="menu-item active">
          <Home size={18} />
          Trang chủ
        </div>

        <div className="menu-item">
          <Sparkles size={18} />
          Phối đồ ngay
        </div>

        <div className="menu-item">
          <Shirt size={18} />
          Tủ đồ của tôi
        </div>

        <div className="menu-item">
          <Heart size={18} />
          Outfit đề xuất
        </div>

        <div className="menu-item">
          <Heart size={18} />
          Yêu thích
        </div>

        <div className="menu-item">
          <Clock3 size={18} />
          Lịch sử phối đồ
        </div>

        <div className="divider"></div>

        <div className="menu-item">
          <Palette size={18} />
          Phong cách
        </div>

        <div className="menu-item">
          <CalendarDays size={18} />
          Dịp sử dụng
        </div>

        <div className="divider"></div>

        <div className="menu-item">
          <Settings size={18} />
          Cài đặt
        </div>

      </div>
    </div>
  );
}