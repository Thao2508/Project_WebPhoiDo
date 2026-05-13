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

import { useState } from "react";

export default function QuanLyTaiKhoan() {

  // DIALOG

  const [openView, setOpenView] =
    useState(false);

  const [openUpdate, setOpenUpdate] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  // DATA

  const [users, setUsers] = useState([

    {
      id: 1,

      tenDangNhap: "admin",

      email: "admin@gmail.com",

      vaiTro: "Quản trị viên",

      trangThai: true,
    },

    {
      id: 2,

      tenDangNhap: "thaonguyen",

      email: "thao@gmail.com",

      vaiTro: "Người dùng",

      trangThai: true,
    },

    {
      id: 3,

      tenDangNhap: "user01",

      email: "user01@gmail.com",

      vaiTro: "Người dùng",

      trangThai: false,
    },

  ]);

  // KHÓA / MỞ KHÓA

  const handleToggleStatus = (id) => {

    setUsers(

      users.map((user) =>

        user.id === id

          ? {
              ...user,
              trangThai:
                !user.trangThai,
            }

          : user
      )
    );
  };

  // VIEW

  const handleView = (user) => {

    setSelectedUser(user);

    setOpenView(true);
  };

  // UPDATE

  const handleUpdate = (user) => {

    setSelectedUser(user);

    setOpenUpdate(true);
  };

  return (

    <div className="quanlytaikhoan">

      {/* SIDEBAR */}

      <SideBarAdmin />

      {/* MAIN */}

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

                  <tr key={user.id}>

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
                          user.vaiTro ===
                          "Quản trị viên"

                          ? "role admin"

                          : "role user"
                        }
                      >

                        <ShieldCheck size={15} />

                        <span>
                          {user.vaiTro}
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
                            handleToggleStatus(user.id)
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

              {/* CLOSE */}

              <button
                className="dialog-close"
                onClick={() =>
                  setOpenView(false)
                }
              >

                <X size={18} />

              </button>

              {/* TOP */}

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

              {/* BODY */}

              <div className="dialog-grid">

                <div className="dialog-card">

                  <span>
                    Vai trò
                  </span>

                  <strong>
                    {
                      selectedUser.vaiTro
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
                    Nam
                  </strong>

                </div>

                <div className="dialog-card">

                  <span>
                    Ngày sinh
                  </span>

                  <strong>
                    20/05/2004
                  </strong>

                </div>

              </div>

            </div>

          </div>
        )
      }

      {/* UPDATE DIALOG */}

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

              {/* TOP */}

              <div className="dialog-top">

                <div className="dialog-avatar">

                  <User size={32} />

                </div>

                <div>

                  <h2>
                    Cập nhật tài khoản
                  </h2>

                  <p>
                    Chỉnh sửa thông tin tài khoản
                  </p>

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
                    defaultValue={
                      selectedUser.tenDangNhap
                    }
                  />

                </div>

                {/* EMAIL */}

                <div className="update-group">

                  <label>Email</label>

                  <input
                    type="email"
                    defaultValue={
                      selectedUser.email
                    }
                  />

                </div>

                {/* GENDER */}

                <div className="update-group">

                  <label>
                    Giới tính
                  </label>

                  <select>

                    <option>
                      Nam
                    </option>

                    <option>
                      Nữ
                    </option>

                  </select>

                </div>

                {/* BIRTHDAY */}

                <div className="update-group">

                  <label>
                    Ngày sinh
                  </label>

                  <input type="date" />

                </div>

                {/* PASSWORD */}

                <div className="update-group">

                  <label>
                    Mật khẩu mới
                  </label>

                  <input
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                  />

                </div>

                {/* CONFIRM PASSWORD */}

                <div className="update-group">

                  <label>
                    Xác nhận mật khẩu
                  </label>

                  <input
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                  />

                </div>
                {/* ROLE */}

                <div className="update-group full-width">

                  <label>
                    Vai trò
                  </label>

                  <select
                    defaultValue={
                      selectedUser.vaiTro
                    }
                  >

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

              <button className="save-btn">

                Lưu cập nhật

              </button>

            </div>

          </div>

        )
      }

    </div>
  );
}