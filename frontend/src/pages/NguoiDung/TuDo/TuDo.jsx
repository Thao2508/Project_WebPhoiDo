import "./TuDo.scss";
import Sidebar from "../../../components/SideBar/SideBar";
import {
  Search,
  Plus,
  Shirt,
  Trash2,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function TuDo() {

    const [openDialog, setOpenDialog] = useState(false);
    const trangPhuc = [

    {
      id: 1,
      ten: "Áo thun trắng",
      loai: "Áo",
      mau: "Trắng",
      anh:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"
    },

    {
      id: 2,
      ten: "Quần jean xanh",
      loai: "Quần",
      mau: "Xanh",
      anh:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop"
    },

    {
      id: 3,
      ten: "Sơ mi đen",
      loai: "Áo",
      mau: "Đen",
      anh:
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1000&auto=format&fit=crop"
    },

    {
      id: 4,
      ten: "Hoodie be",
      loai: "Áo",
      mau: "Be",
      anh:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1000&auto=format&fit=crop"
    },

    {
      id: 5,
      ten: "Chân váy trắng",
      loai: "Váy",
      mau: "Trắng",
      anh:
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1000&auto=format&fit=crop"
    },

    {
      id: 6,
      ten: "Quần tây đen",
      loai: "Quần",
      mau: "Đen",
      anh:
        "https://images.unsplash.com/photo-1506629905607-d9c297d4d42c?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (

    <div className="tudo">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="tudo-main">

        {/* TOPBAR */}
        <div className="td-topbar">
            <h1>Tủ đồ của tôi</h1>

        <Link to="/themtrangphuc">
        <button className="upload-btn">
            <Plus size={18} />
            Thêm trang phục
        </button>
        </Link>

        </div>

        {/* SEARCH */}
        <div className="td-search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Tìm kiếm trang phục..."
          />

        </div>

        {/* FILTER */}
        <div className="td-filter">

          <button className="active">
            Tất cả
          </button>

          <button>Áo</button>

          <button>Quần</button>

          <button>Váy</button>

        </div>

        {/* GRID */}
        <div className="td-grid">

          {trangPhuc.map((item) => (

            <div
                className="td-card"
                key={item.id}
                onClick={() => setOpenDialog(true)}
                >

              <button
                className="td-delete"
                onClick={(e) => {
                    e.stopPropagation();

                    alert("Đã xóa!");
                }}
                >

                <Trash2 size={16} />

              </button>

              <img
                src={item.anh}
                alt=""
              />

              <div className="td-info">

                <h3>{item.ten}</h3>

                <div className="td-tags">

                  <span className="loai">
                    {item.loai}
                  </span>

                  <span className="mau">
                    {item.mau}
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    {
        openDialog && (

            <div
            className="td-dialog-overlay"
            onClick={() => setOpenDialog(false)}
            >

            <div
                className="td-dialog"
                onClick={(e) => e.stopPropagation()}
            >

                {/* IMAGE */}

                <div className="td-dialog-image">

                <img
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"
                    alt=""
                />

                </div>

                {/* CONTENT */}

                <div className="td-dialog-content">
                <button
                    className="td-close"
                    onClick={() => setOpenDialog(false)}
                    >
                    <X size={18} />
                </button>
                <h2>Cập nhật trang phục</h2>

                {/* Tên */}

                <div className="td-form-group">

                    <label>Tên trang phục</label>

                    <input
                    type="text"
                    value="Áo thun trắng"
                    />

                </div>

                {/* Loại */}

                <div className="td-form-group">

                    <label>Loại trang phục</label>

                    <select value="Áo">

                    <option value="Áo">
                        Áo
                    </option>

                    <option value="Quần">
                        Quần
                    </option>

                    <option value="Váy">
                        Váy
                    </option>

                    </select>

                </div>

                {/* Màu */}

                <div className="td-form-group">

                    <label>Màu sắc</label>

                    <select value="Trắng">

                    <option value="Trắng">
                        Trắng
                    </option>

                    <option value="Đen">
                        Đen
                    </option>

                    <option value="Xanh">
                        Xanh
                    </option>

                    <option value="Be">
                        Be
                    </option>

                    </select>

                </div>
                {/* Họa tiết */}

                <div className="td-form-group">

                    <label>Họa tiết</label>

                    <select value="">

                        <option value="">
                            Không có họa tiết
                        </option>

                        <option value="Trơn">
                            Trơn
                        </option>

                        <option value="Sọc">
                            Sọc
                        </option>

                        <option value="Caro">
                            Caro
                        </option>

                        <option value="Graphic">
                            Graphic
                        </option>

                        <option value="Floral">
                            Floral
                        </option>

                    </select>

                </div>
                {/* BUTTON */}

                <div className="td-dialog-actions">

                    <button className="update-btn">
                    Cập nhật
                    </button>

                </div>

                </div>

            </div>

            </div>

        )
        }

    </div>
    
  );
}
