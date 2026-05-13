import "./ThemQuyTacMau.scss";

import SideBarAdmin from "../../../components/SideBar/SideBarAdmin";

import Select from "react-select";

import {
  ArrowLeft,
  Sparkles,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function ThemQuyTacMau() {

  // DATA MAU

  const mauOptions = [

    {
      value: "đen",

      label: "Đen",

      hex: "#000000",
    },

    {
      value: "trắng",

      label: "Trắng",

      hex: "#ffffff",
    },

    {
      value: "xanh_navy",

      label: "Xanh navy",

      hex: "#1e3a8a",
    },

    {
      value: "be",

      label: "Be",

      hex: "#d6c2a1",
    },

    {
      value: "xám",

      label: "Xám",

      hex: "#9ca3af",
    },

  ];

  // CUSTOM OPTION

  const formatColorOption = (option) => (

    <div className="color-option">

      <div
        className="color-preview"
        style={{
          background: option.hex
        }}
      ></div>

      <span>
        {option.label}
      </span>

    </div>

  );

  return (

    <div className="themquytacmau">

      {/* SIDEBAR */}

      <SideBarAdmin />

      {/* MAIN */}

      <div className="tqtm-main">

        {/* HEADER */}

        <div className="tqtm-header">

          <div className="tqtm-title-row">

            {/* BACK */}

            <Link
              to="/quantri/luatphoimau"
              className="back-btn"
            >

              <ArrowLeft size={20} />

            </Link>

            {/* TITLE */}

            <div>

              <h1>
                Thêm quy tắc phối màu
              </h1>

            </div>

          </div>

        </div>

        {/* FORM */}

        <div className="tqtm-wrapper">

          <div className="tqtm-form-box">

            <div className="tqtm-form">

              {/* MAU 1 */}

              <div className="tqtm-group">

                <label>
                  Màu thứ nhất
                </label>

                <Select
                  options={mauOptions}
                  placeholder="Tìm màu..."
                  formatOptionLabel={
                    formatColorOption
                  }
                  className="react-select-container"
                  classNamePrefix="react-select"
                />

              </div>

              {/* MAU 2 */}

              <div className="tqtm-group">

                <label>
                  Màu thứ hai
                </label>

                <Select
                  options={mauOptions}
                  placeholder="Tìm màu..."
                  formatOptionLabel={
                    formatColorOption
                  }
                  className="react-select-container"
                  classNamePrefix="react-select"
                />

              </div>

              {/* PHONG CACH */}

              <div className="tqtm-group">

                <label>
                  Phong cách
                </label>

                <div className="tqtm-input">

                  <Sparkles size={18} />

                  <select>

                    <option>
                      Minimal
                    </option>

                    <option>
                      Casual
                    </option>

                    <option>
                      Streetwear
                    </option>

                  </select>

                </div>

              </div>

              {/* DIP */}

              <div className="tqtm-group">

                <label>
                  Dịp sử dụng
                </label>

                <div className="tqtm-input">

                  <CalendarDays size={18} />

                  <select>

                    <option>
                      Đi làm
                    </option>

                    <option>
                      Đi chơi
                    </option>

                    <option>
                      Dạo phố
                    </option>

                  </select>

                </div>

              </div>

              {/* STATUS */}

              <div className="tqtm-group full-width">

                <label>
                  Trạng thái
                </label>

                <div className="tqtm-input">

                  <CheckCircle2 size={18} />

                  <select>

                    <option>
                      Hợp lệ
                    </option>

                    <option>
                      Không hợp
                    </option>

                  </select>

                </div>

              </div>

              {/* BUTTON */}

              <button className="tqtm-submit">

                Thêm quy tắc

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}