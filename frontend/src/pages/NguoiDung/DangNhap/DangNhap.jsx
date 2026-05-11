import "./DangNhap.scss";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function DangNhap() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="dn-container">
      <div className="dn-card">

        {/* LEFT */}
        <div className="dn-left">

          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1600&auto=format&fit=crop"
            alt=""
            className="dn-image"
          />

          <div className="dn-overlay"></div>

          <div className="dn-brand">
            <h1 className="dn-logo">
              Outfitly
            </h1>

            <p className="dn-subtitle">
              Dress your best
            </p>

            <p className="dn-fashion-text">
              Khám phá outfit phù hợp với phong cách,
              màu sắc và dịp sử dụng của riêng bạn.
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="dn-right">

          <h2>Đăng nhập</h2>

          <p className="dn-desc">
            Chào mừng bạn quay trở lại
          </p>

          {/* EMAIL */}
          <div className="dn-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Nhập email của bạn"
            />
          </div>

          {/* PASSWORD */}
          <div className="dn-group">

            <div className="dn-password-header">
              <label>Mật khẩu</label>
            </div>

            <div className="dn-password-wrapper">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button className="dn-btn">
            Đăng nhập
          </button>

          {/* FORGOT PASSWORD */}
          <button
            type="button"
            className="dn-forgot"
          >
            Quên mật khẩu?
          </button>

          {/* DIVIDER */}
          <div className="dn-divider">
            <span>Hoặc đăng nhập với</span>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="dn-social">

            <button>

              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="google"
              />

              Google

            </button>

            <button>

              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="facebook"
              />

              Facebook

            </button>

          </div>

          {/* REGISTER */}
          <p className="dn-register">

            Chưa có tài khoản?

            <Link to="/dangky">
              <span> Đăng ký</span>
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}