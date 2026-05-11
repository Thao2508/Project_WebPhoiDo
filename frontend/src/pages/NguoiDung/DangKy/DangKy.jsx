import "./DangKy.scss";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function DangKy() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="dk-container">
      <div className="dk-card">

        {/* LEFT */}
        <div className="dk-left">

          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1600&auto=format&fit=crop"
            alt=""
            className="dk-image"
          />
          <div className="dk-overlay"></div>
          <div className="dk-brand">
            <h1 className="dk-logo">
              Outfitly
            </h1>
            <p className="dk-subtitle">
              Dress your best
            </p>
            <p className="dk-fashion-text">
              Tạo tài khoản để lưu outfit yêu thích
              và nhận gợi ý phối đồ phù hợp với phong cách riêng của bạn.
            </p>
          </div>
        </div>
        {/* RIGHT */}
        <div className="dk-right">

          <h2>Đăng ký</h2>

          <p className="dk-desc">
            Tạo tài khoản để bắt đầu trải nghiệm
          </p>

          {/* USERNAME */}
          <div className="dk-group">

            <label>Tên đăng nhập</label>

            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
            />

          </div>

          {/* EMAIL */}
          <div className="dk-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Nhập email của bạn"
            />

          </div>

          {/* PASSWORD */}
          <div className="dk-group">

            <label>Mật khẩu</label>

            <div className="dk-password-wrapper">

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

          {/* CONFIRM PASSWORD */}
          <div className="dk-group">

            <label>Xác nhận mật khẩu</label>

            <div className="dk-password-wrapper">

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
              >
                {showConfirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* BUTTON */}
          <button className="dk-btn">
            Đăng ký
          </button>

          {/* LOGIN */}
          <p className="dk-login">

            Đã có tài khoản?

            <Link to="/dangnhap">
              <span> Đăng nhập</span>
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}