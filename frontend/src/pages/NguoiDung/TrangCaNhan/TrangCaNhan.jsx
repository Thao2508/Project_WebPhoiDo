import "./TrangCaNhan.scss";

import Sidebar from
"../../../components/SideBar/SideBar";

import {
  User,
  Save,
  ArrowLeft
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

export default function TrangCaNhan() {

  const [form, setForm] =
    useState({

      tenDangNhap: "",

      email: "",

      gioiTinh: "",

      ngaySinh: "",

      matKhau: ""
    });

  return (

    <div className="trangcanhan">

      <Sidebar />

      <div className="trangcanhan-main">
        <div className="profile-header">

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >

            <ArrowLeft size={18} />

            

          </button>

        </div>

        <div className="profile-card">

          <div className="profile-top">

            <div className="avatar">

              <User size={46} />

            </div>

            <h2>
              {form.tenDangNhap}
            </h2>

            <p>
              Quản lý thông tin cá nhân
            </p>

          </div>

          <div className="profile-form">

            <div className="form-group">

              <label>
                Tên đăng nhập
              </label>

              <input
                type="text"
                value={
                  form.tenDangNhap
                }
              />

            </div>

            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                value={
                  form.email
                }
                disabled
              />

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>
                  Giới tính
                </label>

                <select>

                  <option value="">
                    Chọn giới tính
                  </option>

                  <option value="1">
                    Nam
                  </option>

                  <option value="0">
                    Nữ
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  Ngày sinh
                </label>

                <input
                  type="date"
                />

              </div>

            </div>

            <div className="form-group">

              <label>
                Mật khẩu mới
              </label>

              <input
                type="password"
                placeholder="
                Để trống nếu không đổi
                "
              />

            </div>

            <button
              className="update-btn"
            >

              <Save size={18} />

              Cập nhật

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}