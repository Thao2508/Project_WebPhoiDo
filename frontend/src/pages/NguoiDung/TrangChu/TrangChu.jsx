// TrangChu.jsx

import "./TrangChu.scss";

import Sidebar from "../../../components/SideBar/SideBar";

import {
  Bell,
  Search,
  Sparkles,
  Upload,
  Heart,
  Shirt,
  ArrowRight,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

export default function TrangChu() {
  const navigate = useNavigate();

  // FALSE = CHƯA ĐĂNG NHẬP
  // TRUE = ĐÃ ĐĂNG NHẬP
  const isLogin = false;

  const outfits = [
    {
      ao: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
      quan:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop",
      style: "Casual",
      occasion: "Đi học",
    },

    {
      ao: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop",
      quan:
        "https://images.unsplash.com/photo-1506629905607-d9c297d4d42c?q=80&w=600&auto=format&fit=crop",
      style: "Minimal",
      occasion: "Đi làm",
    },

    {
      ao: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop",
      quan:
        "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=600&auto=format&fit=crop",
      style: "Korean",
      occasion: "Đi chơi",
    },

    {
      ao: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
      quan:
        "https://images.unsplash.com/photo-1506629905607-d9c297d4d42c?q=80&w=600&auto=format&fit=crop",
      style: "Streetwear",
      occasion: "Dạo phố",
    },
  ];

  const requireLogin = () => {
    navigate("/dangnhap");
  };

  return (
    <div className="home">

      {/* SIDEBAR */}
      {isLogin && <Sidebar />}

      {/* MAIN */}
      <div className={isLogin ? "main logged" : "main"}>

        {/* TOPBAR */}
        <div className="topbar">

          {/* LOGO */}
          {!isLogin && (
            <div className="guest-logo">

              <Shirt size={24} />

              <span>Outfitly</span>

            </div>
          )}

          {/* SEARCH */}
          <div className="search-box">

            <Search size={18} />

            <input
              type="text"
              placeholder="Tìm kiếm outfit, phong cách..."
            />

          </div>

          {/* RIGHT */}
          <div className="top-right">

            {isLogin ? (
              <>
                <Bell size={20} />

                <div className="profile">

                  <img
                    src="https://i.pravatar.cc/150?img=32"
                    alt=""
                  />

                  <span>Minh Anh</span>

                </div>
              </>
            ) : (
              <div className="auth-buttons">

                <Link to="/dangnhap">
                  <button className="login-btn">
                    Đăng nhập
                  </button>
                </Link>

                <Link to="/dangky">
                  <button className="register-btn">
                    Đăng ký
                  </button>
                </Link>

              </div>
            )}

          </div>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="hero-left">
            <h1>
              Phối đồ <br />
              theo phong cách của bạn
            </h1>

            <p className="hero-desc">
              Outfitly giúp bạn phối hợp áo và quần
              phù hợp theo phong cách, màu sắc
              và dịp sử dụng.
            </p>

            {!isLogin && (
              <div className="hero-buttons">

                <button
                  className="primary-btn"
                  onClick={requireLogin}
                >
                  <Sparkles size={18} />

                  Phối đồ ngay
                </button>

                <button className="secondary-btn">
                  Khám phá outfit
                </button>

              </div>
            )}

          </div>

          <div className="hero-right">

            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1600&auto=format&fit=crop"
              alt=""
            />

          </div>

        </div>

        {/* USER DASHBOARD */}
        {isLogin && (
          <div className="actions">

            <div className="action-card">

              <div className="icon purple">
                <Sparkles size={22} />
              </div>

              <div>

                <h3>Phối đồ ngay</h3>

                <p>
                  Nhận gợi ý outfit phù hợp với phong cách của bạn
                </p>

              </div>

            </div>

            <div className="action-card">

              <div className="icon orange">
                <Upload size={22} />
              </div>

              <div>

                <h3>Upload trang phục</h3>

                <p>
                  Thêm trang phục vào tủ đồ của bạn
                </p>

              </div>

            </div>
          </div>
        )}

        {/* STYLE SECTION */}
        {!isLogin && (
          <div className="style-section">

            <div className="section-header">

              <h2>Khám phá phong cách</h2>

              <span>
                Xem tất cả
                <ArrowRight size={16} />
              </span>

            </div>

            <div className="styles">

              <div className="style-card">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
                  alt=""
                />

                <div className="style-overlay">
                  Casual
                </div>
              </div>

              <div className="style-card">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                  alt=""
                />

                <div className="style-overlay">
                  Korean
                </div>
              </div>

              <div className="style-card">
                <img
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop"
                  alt=""
                />

                <div className="style-overlay">
                  Minimal
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION */}
        <div className="section-header">

          <h2>Gợi ý outfit dành cho bạn</h2>

          <span>
            Xem tất cả
            <ArrowRight size={16} />
          </span>

        </div>

        {/* OUTFITS */}
        <div className="outfits">

          {outfits.map((item, index) => (
            <div className="outfit-card" key={index}>

              <button
                className="heart"
                onClick={requireLogin}
              >
                <Heart size={18} />
              </button>

              <img
                src={item.ao}
                alt=""
                className="cloth"
              />

              <img
                src={item.quan}
                alt=""
                className="cloth"
              />

              <div className="outfit-info">

                <div className="tags">

                  <span className="style">
                    {item.style}
                  </span>

                  <span className="occasion">
                    {item.occasion}
                  </span>

                </div>

                <p className="outfit-desc">
                  Outfit phù hợp cho phong cách{" "}
                  {item.style.toLowerCase()}
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* CTA */}
        {!isLogin && (
          <div className="cta-banner">

            <div>

              <h2>
                Đăng nhập để trải nghiệm đầy đủ tính năng
              </h2>

              <p>
                Quản lý tủ đồ, lưu outfit yêu thích
                và nhận gợi ý cá nhân hóa.
              </p>

            </div>

            <button onClick={requireLogin}>
              Bắt đầu ngay
            </button>

          </div>
        )}

      </div>
    </div>
  );
}