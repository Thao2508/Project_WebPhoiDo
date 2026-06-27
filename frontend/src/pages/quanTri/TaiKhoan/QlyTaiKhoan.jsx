import "./QlyTaiKhoan.scss";

import SideBarAdmin from "../../../components/SideBar/SideBarAdmin";

import { Link } from "react-router-dom";

import {
  Search,
  User,
  ShieldCheck,
  Lock,
  Unlock,
  Plus,
  Eye,
  Pencil,
  X
} from "lucide-react";

import { useEffect, useState } from "react";

import axios from "axios";

export default function QuanLyTaiKhoan() {

  // =========================
  // STATE
  // =========================

  const [openView, setOpenView] =
    useState(false);

  const [openUpdate, setOpenUpdate] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [users, setUsers] =
    useState([]);

  const [keyword, setKeyword] =
  useState("");

  const [updateData, setUpdateData] =
    useState({

      tenDangNhap: "",

      email: "",

      gioiTinh: 1,

      ngaySinh: "",

      vaiTro: 0,

      matKhau: ""
    });


  useEffect(() => {

    layDanhSachTaiKhoan();

  }, []);

  const layDanhSachTaiKhoan =
    async () => {

      try {

        const response =
          await axios.get(
            "http://127.0.0.1:8000/nguoi-dung/"
          );

        setUsers(response.data);

      } catch (error) {

        console.log(error);

      }
    };

  const handleSearch =
    async (value) => {

      setKeyword(value);

      try {


        if (value.trim() === "") {

          layDanhSachTaiKhoan();

          return;
        }

        const response =
          await axios.get(
            `http://127.0.0.1:8000/nguoi-dung/search/${value}`
          );

        setUsers(response.data);

      } catch (error) {

        console.log(error);

      }
    };


  const handleToggleStatus =
    async (user) => {

      try {

        if (user.trangThai) {

          await axios.put(
            `http://127.0.0.1:8000/nguoi-dung/khoa/${user.maNguoiDung}`
          );

        } else {

          await axios.put(
            `http://127.0.0.1:8000/nguoi-dung/mo-khoa/${user.maNguoiDung}`
          );
        }

        layDanhSachTaiKhoan();

      } catch (error) {

        console.log(error);

      }
    };

  const handleView = (user) => {

    setSelectedUser(user);

    setOpenView(true);
  };

  const handleUpdate = (user) => {

    setSelectedUser(user);

    setUpdateData({

      tenDangNhap:
        user.tenDangNhap,

      email:
        user.email,

      gioiTinh:
        user.gioiTinh ?? 1,

      ngaySinh:
        user.ngaySinh ?? "",

      vaiTro:
        user.vaiTro,

      matKhau: ""
    });

    setOpenUpdate(true);
  };

  const handleSaveUpdate =
  async () => {

    if (!updateData.tenDangNhap.trim()) {
      alert("Tên đăng nhập không được để trống");
      return;
    }

    if (!updateData.email.trim()) {

      alert("Email không được để trống");

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(updateData.email)) {

      alert("Email không đúng định dạng");

      return;
    }
    try {

      await axios.put(

        `http://127.0.0.1:8000/nguoi-dung/${selectedUser.maNguoiDung}`,

        {

          tenDangNhap:
            updateData.tenDangNhap,

          email:
            updateData.email,

          gioiTinh:
            Number(updateData.gioiTinh),

          vaiTro:
            Number(updateData.vaiTro),

          ...(updateData.ngaySinh && {
            ngaySinh:
              updateData.ngaySinh
          }),

          ...(updateData.matKhau && {
            matKhau:
              updateData.matKhau
          })
        }
      );

      alert(
        "Cập nhật thành công"
      );

      setOpenUpdate(false);

      layDanhSachTaiKhoan();

    } catch (error) {

      console.log(error);

      alert(
        "Cập nhật thất bại"
      );
    }
  };
  return (

    <div className="quanlytaikhoan">

      <SideBarAdmin />

      <div className="qltk-main">

        {/* HEADER */}

        <div className="qltk-header">

          <div>

            <h1>
              Quản lý tài khoản
            </h1>

          </div>

          <Link
            to="/quantri/themtaikhoan"
            className="add-account-btn"
          >

            <Plus size={18} />

            <span>
              Thêm tài khoản
            </span>

          </Link>

        </div>

        {/* SEARCH */}

        <div className="qltk-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Tìm kiếm tài khoản..."
            value={keyword}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
          />

        </div>

        {/* TABLE */}

        <div className="qltk-table-box">

          <table>

            <thead>

              <tr>

                <th>
                  Người dùng
                </th>

                <th>Email</th>

                <th>Vai trò</th>

                <th>Trạng thái</th>

                <th>Hành động</th>

              </tr>

            </thead>

            <tbody>

              {
                users.map((user) => (

                  <tr
                    key={user.maNguoiDung}
                  >

                    {/* USER */}

                    <td>

                      <div className="user-info">

                        <div className="user-avatar">

                          <User size={18} />

                        </div>

                        <span>
                          {user.tenDangNhap}
                        </span>

                      </div>

                    </td>

                    {/* EMAIL */}

                    <td>
                      {user.email}
                    </td>

                    {/* ROLE */}

                    <td>

                      <div
                        className={
                          user.vaiTro === 1

                          ? "role admin"

                          : "role user"
                        }
                      >

                        <ShieldCheck size={15} />

                        <span>

                          {
                            user.vaiTro === 1

                            ? "Quản trị viên"

                            : "Người dùng"
                          }

                        </span>

                      </div>

                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={
                          user.trangThai

                          ? "status active"

                          : "status lock"
                        }
                      >

                        {
                          user.trangThai

                          ? "Hoạt động"

                          : "Đã khóa"
                        }

                      </span>

                    </td>

                    {/* ACTION */}

                    <td>

                      <div className="action-group">

                        {/* VIEW */}

                        <button
                          className="icon-btn view-btn"
                          onClick={() =>
                            handleView(user)
                          }
                        >

                          <Eye size={17} />

                        </button>

                        {/* UPDATE */}

                        <button
                          className="icon-btn update-btn"
                          onClick={() =>
                            handleUpdate(user)
                          }
                        >

                          <Pencil size={17} />

                        </button>

                        {/* LOCK */}

                        <button
                          className={
                            user.trangThai

                            ? "icon-btn lock-btn"

                            : "icon-btn unlock-btn"
                          }

                          onClick={() =>
                            handleToggleStatus(user)
                          }
                        >

                          {
                            user.trangThai

                            ? <Lock size={17} />

                            : <Unlock size={17} />
                          }

                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

      {/* VIEW DIALOG */}

      {
        openView &&
        selectedUser && (

          <div
            className="dialog-overlay"
            onClick={() =>
              setOpenView(false)
            }
          >

            <div
              className="dialog-box"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="dialog-close"
                onClick={() =>
                  setOpenView(false)
                }
              >

                <X size={18} />

              </button>

              <div className="dialog-top">

                <div className="dialog-avatar">

                  <User size={32} />

                </div>

                <div>

                  <h2>
                    {
                      selectedUser.tenDangNhap
                    }
                  </h2>

                  <p>
                    {
                      selectedUser.email
                    }
                  </p>

                </div>

              </div>

              <div className="dialog-grid">

                <div className="dialog-card">

                  <span>
                    Vai trò
                  </span>

                  <strong>

                    {
                      selectedUser.vaiTro === 1

                      ? "Quản trị viên"

                      : "Người dùng"
                    }

                  </strong>

                </div>

                <div className="dialog-card">

                  <span>
                    Trạng thái
                  </span>

                  <strong>

                    {
                      selectedUser.trangThai

                      ? "Hoạt động"

                      : "Đã khóa"
                    }

                  </strong>

                </div>

                <div className="dialog-card">

                  <span>
                    Giới tính
                  </span>

                  <strong>

                    {
                      selectedUser.gioiTinh === 1

                      ? "Nam"

                      : "Nữ"
                    }

                  </strong>

                </div>

                <div className="dialog-card">

                  <span>
                    Ngày sinh
                  </span>

                  <strong>

                    {
                      selectedUser.ngaySinh
                    }

                  </strong>

                </div>

              </div>

            </div>

          </div>
        )
      }

    {
      openUpdate &&
      selectedUser && (

        <div
          className="dialog-overlay"
          onClick={() =>
            setOpenUpdate(false)
          }
        >

          <div
            className="dialog-box"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              className="dialog-close"
              onClick={() =>
                setOpenUpdate(false)
              }
            >

              <X size={18} />

            </button>

            {/* TITLE */}

            <div className="dialog-top">

              <div className="dialog-avatar">

                <User size={32} />

              </div>

              <div>

                <h2>
                  Cập nhật tài khoản
                </h2>

              </div>

            </div>

            {/* FORM */}

            <div className="update-grid">

              {/* USERNAME */}

              <div className="update-group">

                <label>
                  Tên đăng nhập
                </label>

                <input
                  type="text"

                  value={
                    updateData.tenDangNhap
                  }

                  onChange={(e) =>
                    setUpdateData({

                      ...updateData,

                      tenDangNhap:
                        e.target.value
                    })
                  }
                />

              </div>

              {/* EMAIL */}

              <div className="update-group">

                <label>
                  Email
                </label>

                <input
                  type="email"

                  value={
                    updateData.email
                  }

                  onChange={(e) =>
                    setUpdateData({

                      ...updateData,

                      email:
                        e.target.value
                    })
                  }
                />

              </div>

              {/* GENDER */}

              <div className="update-group">

                <label>
                  Giới tính
                </label>

                <select

                  value={
                    updateData.gioiTinh
                  }

                  onChange={(e) =>
                    setUpdateData({

                      ...updateData,

                      gioiTinh:
                        e.target.value
                    })
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

              {/* BIRTHDAY */}

              <div className="update-group">

                <label>
                  Ngày sinh
                </label>

                <input
                  type="date"

                  value={
                    updateData.ngaySinh || ""
                  }

                  onChange={(e) =>
                    setUpdateData({

                      ...updateData,

                      ngaySinh:
                        e.target.value
                    })
                  }
                />

              </div>

              {/* PASSWORD */}

              <div className="update-group">

                <label>
                  Mật khẩu mới
                </label>

                <input
                  type="password"

                  placeholder="Nhập mật khẩu mới"

                  onChange={(e) =>
                    setUpdateData({

                      ...updateData,

                      matKhau:
                        e.target.value
                    })
                  }
                />

              </div>

              {/* ROLE */}

              <div className="update-group">

                <label>
                  Vai trò
                </label>

                <select

                  value={
                    updateData.vaiTro
                  }

                  onChange={(e) =>
                    setUpdateData({

                      ...updateData,

                      vaiTro:
                        e.target.value
                    })
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
              className="save-btn"

              onClick={
                handleSaveUpdate
              }
            >

              Lưu cập nhật

            </button>

          </div>

        </div>
      )
    }
    </div>
  );
}

