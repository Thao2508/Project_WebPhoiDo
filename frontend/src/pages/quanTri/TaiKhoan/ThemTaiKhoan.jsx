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

import { Link } from "react-router-dom";

export default function ThemTaiKhoan() {

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

                    <select>

                      <option>Nam</option>

                      <option>Nữ</option>

                      <option>Khác</option>

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

                    <input type="date" />

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
                    />

                  </div>

                </div>

              </div>

              {/* ROLE */}

              <div className="ttk-group">

                <label>
                  Vai trò
                </label>

                <div className="ttk-input">

                  <ShieldCheck size={18} />

                  <select>

                    <option>
                      Người dùng
                    </option>

                    <option>
                      Quản trị viên
                    </option>

                  </select>

                </div>

              </div>

              {/* BUTTON */}

              <button className="ttk-submit">

                Thêm tài khoản

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}