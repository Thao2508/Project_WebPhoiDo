import "./ThemQuyTacLoai.scss";

import SideBarAdmin from "../../../components/SideBar/SideBarAdmin";

import {
  ArrowLeft,
  Shirt,
  Sparkles,
  CalendarDays,
  CheckCircle2,
    PersonStanding
} from "lucide-react";

import { Link } from "react-router-dom";

export default function ThemQuyTacLoai() {

  return (

    <div className="themquytacloai">

      {/* SIDEBAR */}

      <SideBarAdmin />

      {/* MAIN */}

      <div className="tqtl-main">

        {/* HEADER */}

        <div className="tqtl-header">

          <div className="tqtl-title-row">

            {/* BACK */}

            <Link
              to="/quantri/luatloaido"
              className="back-btn"
            >

              <ArrowLeft size={20} />

            </Link>

            {/* TEXT */}

            <div>

              <h1>
                Thêm quy tắc phối loại đồ
              </h1>

            </div>

          </div>

        </div>

        {/* FORM */}

        <div className="tqtl-wrapper">

          <div className="tqtl-form-box">

            <div className="tqtl-form">

              {/* LOAI 1 */}

              <div className="tqtl-group">

                <label>
                  Loại trang phục 1
                </label>

                <div className="tqtl-input">

                  <Shirt size={18} />

                  <select>

                    <option>
                      Áo thun
                    </option>

                    <option>
                      Áo sơ mi
                    </option>

                    <option>
                      Hoodie
                    </option>

                  </select>

                </div>

              </div>

              {/* LOAI 2 */}

              <div className="tqtl-group">

                <label>
                  Loại trang phục 2
                </label>

                <div className="tqtl-input">

                  <  PersonStanding size={18} />

                  <select>

                    <option>
                      Quần jean
                    </option>

                    <option>
                      Quần short
                    </option>

                    <option>
                      Quần tây
                    </option>

                  </select>

                </div>

              </div>

              {/* PHONG CACH */}

              <div className="tqtl-group">

                <label>
                  Phong cách
                </label>

                <div className="tqtl-input">

                  <Sparkles size={18} />

                  <select>

                    <option>
                      Casual
                    </option>

                    <option>
                      Streetwear
                    </option>

                    <option>
                      Formal
                    </option>

                  </select>

                </div>

              </div>

              {/* DIP */}

              <div className="tqtl-group">

                <label>
                  Dịp sử dụng
                </label>

                <div className="tqtl-input">

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

              <div className="tqtl-group full-width">

                <label>
                  Trạng thái
                </label>

                <div className="tqtl-input">

                  <CheckCircle2 size={18} />

                  <select>

                    <option value="true">
                      Hợp lệ
                    </option>

                    <option value="false">
                      Không hợp lệ
                    </option>

                  </select>

                </div>

              </div>

              {/* BUTTON */}

              <button className="tqtl-submit">

                Thêm 

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}