import "./TrangCaNhan.scss";

import Sidebar from "../../../components/SideBar/SideBar";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  Mail,
  Calendar,
  VenusAndMars,
  Lock
} from "lucide-react";
import {useEffect,useState} from "react";

export default function TrangCaNhan() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [form, setForm] = useState({

    tenDangNhap: "",

    email: "",

    gioiTinh: "",

    ngaySinh: "",

    matKhau: "",

    xacNhanMatKhau: ""
  });

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword
  ] = useState(false);

  useEffect(() => {

    layThongTin();

  }, []);

  const layThongTin = async () => {

    try {

      const response =
        await fetch(

          `http://localhost:8000/trang-ca-nhan/${user.maNguoiDung}`
        );

      const data =
        await response.json();

      setForm({

        tenDangNhap:
          data.tenDangNhap,

        email:
          data.email,

        gioiTinh:
          data.gioiTinh ?? "",

        ngaySinh:
          data.ngaySinh ?? "",

        matKhau: "",

        xacNhanMatKhau: ""
      });

    } catch (error) {

      console.log(error);

    }
  };

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value
    });
  };

  const capNhat = async () => {

    if (

      form.matKhau !== "" &&

      form.matKhau !==
      form.xacNhanMatKhau

    ) {

      alert(
        "Mật khẩu xác nhận không khớp"
      );

      return;
    }

    try {

      const response =
        await fetch(

          `http://localhost:8000/trang-ca-nhan/${user.maNguoiDung}`,

          {

            method: "PUT",

            headers: {

              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              tenDangNhap:
                form.tenDangNhap,

              gioiTinh:
                form.gioiTinh === ""
                  ? null
                  : Number(
                      form.gioiTinh
                    ),

              ngaySinh:
                form.ngaySinh || null,

              matKhau:
                form.matKhau
            })
          }
        );

      const data =
        await response.json();

      if (data.success) {

        localStorage.setItem(

          "user",

          JSON.stringify({

            ...user,

            tenDangNhap:
              data.user.tenDangNhap
          })
        );

        alert(
          "Cập nhật thành công"
        );

      } else {

        alert(
          data.message
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        "Không thể cập nhật"
      );
    }
  };

  return (

    <div className="profile-page">

      <Sidebar />

      <div className="profile-content">

        <div className="profile-header">

          <button

            className="back-btn"

            onClick={() =>
              window.history.back()
            }

          >

            <ArrowLeft size={22} />

          </button>

            <h1>
              Cập nhật thông tin cá nhân
            </h1>

        </div>

        <div className="profile-card">

          {/* Hàng 1 */}

          <div className="form-row">

            <div className="form-group">

              <label>
                Tên đăng nhập
              </label>

              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  name="tenDangNhap"
                  value={form.tenDangNhap}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="form-group">

              <label>
                Email
              </label>

              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  value={form.email}
                  readOnly
                />
              </div>

            </div>

          </div>

          {/* Hàng 2 */}

          <div className="form-row">

            <div className="form-group">

              <label>
                Giới tính
              </label>

              <div className="input-wrapper">
                <VenusAndMars
                  size={18}
                  className="input-icon"
                />

                <select
                  name="gioiTinh"
                  value={form.gioiTinh}
                  onChange={handleChange}
                >

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

            </div>

            <div className="form-group">

              <label>
                Ngày sinh
              </label>

              <div className="input-wrapper">
                <Calendar
                  size={18}
                  className="input-icon"
                />
                <input
                  type="date"
                  name="ngaySinh"
                  value={form.ngaySinh}
                  onChange={handleChange}
                />
              </div>

            </div>

          </div>

          <hr />

          {/* Hàng 3 */}

          <div className="form-row">

            <div className="form-group">

              <label>
                Mật khẩu mới
              </label>

              <div
                className="password-wrapper"
              >
                <Lock
                  size={18}
                  className="input-icon"
                />
                <input

                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  name="matKhau"

                  value={
                    form.matKhau
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Nhập mật khẩu mới"

                />

                <button

                  type="button"

                  className="eye-btn"

                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }

                >

                  {showPassword

                    ? <EyeOff size={18} />

                    : <Eye size={18} />

                  }

                </button>

              </div>

            </div>

            <div className="form-group">

              <label>
                Xác nhận mật khẩu mới
              </label>

              <div
                className="password-wrapper"
              >
                <Lock
                  size={18}
                  className="input-icon"
                />

                <input

                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }

                  name="xacNhanMatKhau"

                  value={
                    form.xacNhanMatKhau
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Nhập lại mật khẩu"

                />

                <button

                  type="button"

                  className="eye-btn"

                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }

                >

                  {showConfirmPassword

                    ? <EyeOff size={18} />

                    : <Eye size={18} />

                  }

                </button>

              </div>

            </div>

          </div>

          <div className="button-group">

            <button

              className="btn-cancel"

              onClick={() =>
                window.history.back()
              }

            >

              Hủy

            </button>

            <button

              className="btn-update"

              onClick={capNhat}

            >

              Lưu thay đổi

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}