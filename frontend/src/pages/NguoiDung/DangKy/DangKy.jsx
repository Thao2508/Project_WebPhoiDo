import "./DangKy.scss";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function DangKy() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tenDangNhap, setTenDangNhap] = useState("");
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState("");

  const handleDangKy = async () => {

    if (
      !tenDangNhap ||
      !email ||
      !matKhau
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (matKhau !== xacNhanMatKhau) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8000/auth/dangky",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            tenDangNhap,
            email,
            matKhau
          })
        }
      );

      const data =
        await response.json();

      if (data.success) {

        alert(
          "Đăng ký thành công"
        );

        window.location.href =
          "/dangnhap";

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert(
        "Lỗi kết nối server"
      );

    }
  };
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
              value={tenDangNhap}
              onChange={(e) =>
                setTenDangNhap(e.target.value)
              }
            />

          </div>

          {/* EMAIL */}
          <div className="dk-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          {/* PASSWORD */}
          <div className="dk-group">

            <label>Mật khẩu</label>

            <div className="dk-password-wrapper">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={matKhau}
                onChange={(e) =>
                  setMatKhau(e.target.value)
                }
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
                value={xacNhanMatKhau}
                onChange={(e) =>
                  setXacNhanMatKhau(e.target.value)
                }
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
          <button
            className="dk-btn"
            onClick={handleDangKy}
          >
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