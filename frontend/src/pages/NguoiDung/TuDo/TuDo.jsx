import "./TuDo.scss";

import Sidebar from "../../../components/SideBar/SideBar";

import {
  Search,
  Plus,
  Shirt,
  Trash2,
  X,
  Pencil,
  Check
} from "lucide-react";

import { Link } from "react-router-dom";

import { useState } from "react";

export default function TuDo() {

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedOutfit, setSelectedOutfit] = useState([]);

  const [isSelecting, setIsSelecting] = useState(false);

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

  const handleSelectItem = (item) => {

    const isExist = selectedOutfit.find(
      (i) => i.id === item.id
    );

    if (isExist) {

      setSelectedOutfit(
        selectedOutfit.filter(
          (i) => i.id !== item.id
        )
      );

      return;
    }

    setSelectedOutfit([
      ...selectedOutfit,
      item
    ]);
  };

  const handleOpenUpdate = (item, e) => {

    e.stopPropagation();

    setSelectedItem(item);

    setOpenDialog(true);
  };

  return (

    <div className="tudo">

      <Sidebar />

      <div className="tudo-main">

        {/* TOPBAR */}

        <div className="td-topbar">

          <div>

            <h1>Tủ đồ của tôi</h1>

          </div>

          <div className="topbar-right">
            <button
              className="match-mode-btn"

              onClick={() => {

                setIsSelecting(true);
              }}
            >

              <Shirt size={18} />

              <span>
                Phối đồ từ tủ đồ
              </span>

            </button>

            <Link to="/themtrangphuc">

              <button className="upload-btn">

                <Plus size={18} />

                <span>
                  Thêm trang phục
                </span>

              </button>

            </Link>

          </div>

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

        {/* SELECTED BAR */}

        {
        isSelecting && (

          <div className="selected-bar">

            <div>

              <h3>
                Đang phối đồ từ tủ đồ
              </h3>

              <p>

                Vui lòng chọn ít nhất
                1 áo và 1 quần/váy để phối

              </p>

            </div>

            <div className="select-actions">

              <button
                className="cancel-select-btn"

                onClick={() => {

                  setIsSelecting(false);

                  setSelectedOutfit([]);
                }}
              >

                Hủy

              </button>

              {
                selectedOutfit.length > 0 && (

                  <button className="match-btn">

                    <Shirt size={18} />

                    <span>
                      Phối đồ ngay
                    </span>

                  </button>
                )
              }

            </div>

          </div>
        )
      }


        {/* GRID */}

        <div className="td-grid">

          {
            trangPhuc.map((item) => {

              const isSelected = selectedOutfit.some(
                (i) => i.id === item.id
              );

              return (

                <div
                  className={
                    isSelected

                    ? "td-card selected"

                    : "td-card"
                  }

                  key={item.id}

                  onClick={() => {
                  if(isSelecting){
                    handleSelectItem(item);
                  }
                }}
                >

                  {/* SELECTED */}

                  {
                    isSelecting && isSelected && (
                      <div className="selected-check">

                        <Check size={16} />

                      </div>
                    )
                  }

                  {/* IMAGE */}

                  <img
                    src={item.anh}
                    alt=""
                  />

                  {/* ACTION */}

                  <div className="td-action-group">

                    <button
                      className="td-update"

                      onClick={(e) =>
                        handleOpenUpdate(item, e)
                      }
                    >

                      <Pencil size={15} />

                    </button>

                    <button
                      className="td-delete"

                      onClick={(e) => {

                        e.stopPropagation();

                        alert("Đã xóa!");
                      }}
                    >

                      <Trash2 size={15} />

                    </button>

                  </div>

                  {/* INFO */}

                  <div className="td-info">

                    <h3>
                      {item.ten}
                    </h3>

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
              );
            })
          }

        </div>

      </div>

      {/* UPDATE DIALOG */}

      {
        openDialog && selectedItem && (

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
                  src={selectedItem.anh}
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

                <h2>
                  Cập nhật trang phục
                </h2>

                {/* NAME */}

                <div className="td-form-group">

                  <label>
                    Tên trang phục
                  </label>

                  <input
                    type="text"
                    defaultValue={selectedItem.ten}
                  />

                </div>

                {/* TYPE */}

                <div className="td-form-group">

                  <label>
                    Loại trang phục
                  </label>

                  <select defaultValue={selectedItem.loai}>

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

                {/* COLOR */}

                <div className="td-form-group">

                  <label>
                    Màu sắc
                  </label>

                  <select defaultValue={selectedItem.mau}>

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
