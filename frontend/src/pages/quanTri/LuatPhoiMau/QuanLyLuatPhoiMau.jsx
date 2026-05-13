import "./QuanLyLuatPhoiMau.scss";
import SideBarAdmin from "../../../components/SideBar/SideBarAdmin";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Palette,
  X
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function QuanLyLuatPhoiMau() {

  // DIALOG

  const [openAddColor, setOpenAddColor] =
    useState(false);

  // DATA MAU

  const [colors, setColors] = useState([

    {
      id: 1,

      tenMau: "Đen",

      hex: "#000000",
    },

    {
      id: 2,

      tenMau: "Trắng",

      hex: "#ffffff",
    },

    {
      id: 3,

      tenMau: "Xanh navy",

      hex: "#1e3a8a",
    },

  ]);

  // DATA LUAT

  const [rules, setRules] = useState([

    {
      id: 1,

      mau1: "Đen",

      mau2: "Trắng",

      phongCach: "Minimal",

      dipSuDung: "Đi làm",

      hopLe: true,
    },

    {
      id: 2,

      mau1: "Xanh navy",

      mau2: "Be",

      phongCach: "Casual",

      dipSuDung: "Đi chơi",

      hopLe: true,
    },

    {
      id: 3,

      mau1: "Đỏ",

      mau2: "Xanh lá",

      phongCach: "Streetwear",

      dipSuDung: "Dạo phố",

      hopLe: false,
    },

  ]);

  return (

    <div className="ql-luatmau">

      {/* SIDEBAR */}

      <SideBarAdmin />

      {/* MAIN */}

      <div className="qlm-main">

        {/* HEADER */}

        <div className="qlm-header">

          <div>

            <h1>
              Quản lý quy tắc phối màu
            </h1>
          </div>

        </div>

        {/* COLOR SECTION */}

        <div className="color-section">

          {/* TOP */}

          <div className="color-top">

            <h2>
              Màu sắc hệ thống
            </h2>

            <button
              className="add-color-btn"
              onClick={() =>
                setOpenAddColor(true)
              }
            >

              <Palette size={17} />

              <span>
                Thêm màu
              </span>

            </button>

          </div>

          {/* COLOR TABLE */}

            <div className="color-table-box">

            <table>

                <thead>

                <tr>

                    <th>Màu</th>

                    <th>Tên màu</th>

                    <th>Mã HEX</th>

                </tr>

                </thead>

                <tbody>

                {
                    colors.map((color) => (

                    <tr key={color.id}>

                        {/* PREVIEW */}

                        <td>

                        <div
                            className="table-preview-color"
                            style={{
                            background: color.hex
                            }}
                        ></div>

                        </td>

                        {/* NAME */}

                        <td>

                        {color.tenMau}

                        </td>

                        {/* HEX */}

                        <td>

                        <span className="hex-code">

                            {color.hex}

                        </span>

                        </td>

                    </tr>

                    ))
                }

                </tbody>

            </table>

            </div>

        </div>

        {/* SEARCH */}

        <div className="qlm-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Tìm kiếm luật phối màu..."
          />

        </div>

        <div className="rule-top">

        <h2>
            Danh sách quy tắc phối màu
        </h2>

        <Link
        to="/quantri/themluatmau"
        className="add-rule-btn"
        >

        <Plus size={18} />

        <span>
            Thêm quy tắc
        </span>

        </Link>

        </div>
        {/* TABLE */}

        <div className="qlm-table-box">

          <table>

            <thead>

              <tr>

                <th>Màu 1</th>

                <th>Màu 2</th>

                <th>Phong cách</th>

                <th>Dịp sử dụng</th>

                <th>Trạng thái</th>

                <th>Hành động</th>

              </tr>

            </thead>

            <tbody>

              {
                rules.map((rule) => (

                  <tr key={rule.id}>

                    {/* MAU 1 */}

                    <td>

                      <div className="table-color">

                        <div className="color-dot"></div>

                        <span>
                          {rule.mau1}
                        </span>

                      </div>

                    </td>

                    {/* MAU 2 */}

                    <td>

                      <div className="table-color">

                        <div className="color-dot"></div>

                        <span>
                          {rule.mau2}
                        </span>

                      </div>

                    </td>

                    {/* STYLE */}

                    <td>

                      <span className="style-tag">

                        {rule.phongCach}

                      </span>

                    </td>

                    {/* DIP */}

                    <td>

                      {rule.dipSuDung}

                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={
                          rule.hopLe

                          ? "status active"

                          : "status invalid"
                        }
                      >

                        {
                          rule.hopLe

                          ? "Hợp lệ"

                          : "Không hợp"
                        }

                      </span>

                    </td>

                    {/* ACTION */}

                    <td>

                      <div className="action-group">

                        {/* UPDATE */}

                        <button
                          className="icon-btn update-btn"
                        >

                          <Pencil size={17} />

                        </button>

                        {/* DELETE */}

                        <button
                          className="icon-btn delete-btn"
                        >

                          <Trash2 size={17} />

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

      {/* ADD COLOR DIALOG */}

      {
        openAddColor && (

          <div
            className="dialog-overlay"
            onClick={() =>
              setOpenAddColor(false)
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
                  setOpenAddColor(false)
                }
              >

                <X size={18} />

              </button>

              <h2>
                Thêm màu sắc
              </h2>

              <div className="dialog-form">

                {/* TEN MAU */}

                <div className="dialog-group">

                  <label>
                    Tên màu
                  </label>

                  <input
                    type="text"
                    placeholder="Ví dụ: Xanh pastel"
                  />

                </div>

                {/* HEX */}

                <div className="dialog-group">

                  <label>
                    Mã HEX
                  </label>

                  <input
                    type="text"
                    placeholder="#A5B4FC"
                  />

                </div>

                {/* BUTTON */}

                <button className="save-btn">

                  Thêm màu

                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>
  );
}