import "./ThemTaiKhoan.scss";

import SideBarAdmin from "../../../components/SideBar/SideBarAdmin";

import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  ArrowLeft,
  CalendarDays,
  VenusAndMars
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import axios from "axios";

export default function ThemTaiKhoan() {

  const navigate = useNavigate();

  // =========================
  // STATE
  // =========================

  const [tenDangNhap, setTenDangNhap] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [gioiTinh, setGioiTinh] =
    useState(1);

  const [ngaySinh, setNgaySinh] =
    useState("");

  const [matKhau, setMatKhau] =
    useState("");

  const [xacNhanMatKhau,
    setXacNhanMatKhau] =
    useState("");
  
  const [loiMatKhau,
  setLoiMatKhau] =
  useState("");

  const [vaiTro, setVaiTro] =
    useState(0);


  const handleThemTaiKhoan =
    async () => {
      if (!tenDangNhap.trim()) {

        alert("Vui lòng nhập tên đăng nhập");

        return;
      }

      if (!email.trim()) {

        alert("Vui lòng nhập email");

        return;
      }

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {

        alert("Email không đúng định dạng");

        return;
      }

      if (!matKhau.trim()) {

        alert("Vui lòng nhập mật khẩu");

        return;
      }
      try {

        // CHECK PASSWORD

        if (
          matKhau !==
          xacNhanMatKhau
        ) {

          alert(
            "Mật khẩu xác nhận không khớp"
          );

          return;
        }

        // API

        await axios.post(
          "http://127.0.0.1:8000/nguoi-dung/",
          {
            tenDangNhap,
            email,
            matKhau,
            gioiTinh:
              Number(gioiTinh),
            vaiTro:
              Number(vaiTro),
            ...(ngaySinh && {
              ngaySinh
            })
          }
        );

        alert(
          "Thêm tài khoản thành công"
        );

        navigate(
          "/quantri/taikhoan"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Thêm tài khoản thất bại"
        );
      }
    };

  return (

    <div className="themtaikhoan">

      {/* SIDEBAR */}

      <SideBarAdmin />

      {/* MAIN */}

      <div className="ttk-main">

        {/* HEADER */}

        <div className="ttk-header">

          <div className="ttk-title-row">

            <Link
              to="/quantri/taikhoan"
              className="back-btn"
            >

              <ArrowLeft size={20} />

            </Link>

            <div>

              <h1>
                Thêm tài khoản
              </h1>

            </div>

          </div>

        </div>

        {/* FORM */}

        <div className="ttk-wrapper">

          <div className="ttk-form-box">

            <div className="ttk-form">

              {/* ROW 1 */}

              <div className="ttk-row">

                {/* USERNAME */}

                <div className="ttk-group">

                  <label>
                    Tên đăng nhập
                  </label>

                  <div className="ttk-input">

                    <User size={18} />

                    <input
                      type="text"
                      placeholder="Nhập tên đăng nhập"
                      value={tenDangNhap}
                      onChange={(e) =>
                        setTenDangNhap(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

                {/* EMAIL */}

                <div className="ttk-group">

                  <label>Email</label>

                  <div className="ttk-input">

                    <Mail size={18} />

                    <input
                      type="email"
                      placeholder="Nhập email"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </div>

              {/* ROW 2 */}

              <div className="ttk-row">

                {/* GENDER */}

                <div className="ttk-group">

                  <label>
                    Giới tính
                  </label>

                  <div className="ttk-input">

                    <VenusAndMars size={18} />

                    <select
                      value={gioiTinh}
                      onChange={(e) =>
                        setGioiTinh(
                          e.target.value
                        )
                      }
                    >

                      <option value={1}>
                        Nam
                      </option>

                      <option value={0}>
                        Nữ
                      </option>

                    </select>

                  </div>

                </div>

                {/* BIRTHDAY */}

                <div className="ttk-group">

                  <label>
                    Ngày sinh
                  </label>

                  <div className="ttk-input">

                    <CalendarDays size={18} />

                    <input
                      type="date"
                      value={ngaySinh}
                      onChange={(e) =>
                        setNgaySinh(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </div>

              {/* ROW 3 */}

              <div className="ttk-row">

                {/* PASSWORD */}

                <div className="ttk-group">

                  <label>
                    Mật khẩu
                  </label>

                  <div className="ttk-input">

                    <Lock size={18} />

                    <input
                      type="password"
                      placeholder="Nhập mật khẩu"
                      value={matKhau}
                      onChange={(e) =>
                        setMatKhau(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

                {/* CONFIRM PASSWORD */}

                <div className="ttk-group">

                  <label>
                    Xác nhận mật khẩu
                  </label>

                  <div className="ttk-input">

                    <Lock size={18} />

                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      value={xacNhanMatKhau}

                      onChange={(e) => {

                        const value =
                          e.target.value;

                        setXacNhanMatKhau(
                          value
                        );

                        // CHECK PASSWORD

                        if (
                          value !== matKhau
                        ) {

                          setLoiMatKhau(
                            "Mật khẩu xác nhận không khớp"
                          );

                        } else {

                          setLoiMatKhau("");
                        }
                      }}
                    />

                  </div>

                  {
                    loiMatKhau && (

                      <p className="error-text">

                        {loiMatKhau}

                      </p>
                    )
                  }

                </div>

              </div>

              {/* ROLE */}

              <div className="ttk-group">

                <label>
                  Vai trò
                </label>

                <div className="ttk-input">

                  <ShieldCheck size={18} />

                  <select
                    value={vaiTro}
                    onChange={(e) =>
                      setVaiTro(
                        e.target.value
                      )
                    }
                  >

                    <option value={0}>
                      Người dùng
                    </option>

                    <option value={1}>
                      Quản trị viên
                    </option>

                  </select>

                </div>

              </div>

              {/* BUTTON */}

              <button
                className="ttk-submit"
                onClick={
                  handleThemTaiKhoan
                }
              >

                Thêm tài khoản

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}