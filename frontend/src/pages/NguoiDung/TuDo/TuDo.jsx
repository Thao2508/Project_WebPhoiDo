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

import { useState, useEffect} from "react";

export default function TuDo() {

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedOutfit, setSelectedOutfit] = useState([]);

  const [isSelecting, setIsSelecting] = useState(false);

  const [trangPhuc, setTrangPhuc] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const [danhMuc, setDanhMuc] = useState([]);

  const [loaiTrangPhuc, setLoaiTrangPhuc] = useState([]);

  const [mauSac, setMauSac] = useState([]);

  const [formData, setFormData] = useState({

    tenTrangPhuc: "",

    maLoai: "",

    maMau: ""
  });

  const [phongCach, setPhongCach] = useState([]);

  const [dipSuDung, setDipSuDung] = useState([]);

  const [selectedPhongCach, setSelectedPhongCach] = useState("");

  const [selectedDip, setSelectedDip] = useState("");

  const [goiYOutfits, setGoiYOutfits] = useState([]);

  useEffect(() => {

    fetchTrangPhuc();

    fetchDanhMuc();

    fetchLoaiTrangPhuc();

    fetchMauSac();

    fetchPhongCach();

    fetchDipSuDung();

  }, []);

  const fetchTrangPhuc = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/trang-phuc/"
      );

      const data = await response.json();

      setTrangPhuc(data);

      setFilteredData(data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchDanhMuc = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/danh-muc/"
      );

      const data = await response.json();

      setDanhMuc(data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchLoaiTrangPhuc = async () => {

  const response = await fetch(
    "http://localhost:8000/loai-trang-phuc/"
  );

  const data = await response.json();

  setLoaiTrangPhuc(data);
};

  const fetchMauSac = async () => {

    const response = await fetch(
      "http://localhost:8000/mau/"
    );

    const data = await response.json();

    setMauSac(data);
  };

  const fetchPhongCach = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/phong-cach/"
      );

      const data = await response.json();

      setPhongCach(data);

    } catch (error) {

      console.log(error);
    }
  };


  const fetchDipSuDung = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/dip-su-dung/"
      );

      const data = await response.json();

      setDipSuDung(data);

    } catch (error) {

      console.log(error);
    }
  };


  const handleSelectItem = (item) => {

    const isExist = selectedOutfit.find(
      (i) => i.maTrangPhuc === item.maTrangPhuc
    );

    if (isExist) {

      setSelectedOutfit(
        selectedOutfit.filter(
          (i) => i.maTrangPhuc !== item.maTrangPhuc
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

  const handleSearch = (

    keyword,

    category
  ) => {

    let data = [...trangPhuc];

    if (keyword !== "") {

      data = data.filter((item) =>

        item.tenTrangPhuc
          .toLowerCase()

          .includes(
            keyword.toLowerCase()
          )
      );
    }
    if (category !== "Tất cả") {

      data = data.filter(

        (item) =>

          item.tenDanhMuc === category
      );
    }
    setFilteredData(data);
  };


  const handleUpdateTrangPhuc = async () => {

    try {

      const response = await fetch(

        `http://localhost:8000/trang-phuc/${selectedItem.maTrangPhuc}`,

        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            tenTrangPhuc:
              formData.tenTrangPhuc,

            maLoai:
              parseInt(formData.maLoai),

            maMau:
              parseInt(formData.maMau)
          })
        }
      );



      const data = await response.json();

      alert(data.message);



      // reload list
      fetchTrangPhuc();



      // close dialog
      setOpenDialog(false);



    } catch (error) {

      console.log(error);
    }
  };

  const handlePhoiDo = async () => {

    // =========================
    // VALIDATE
    // =========================

    if (selectedOutfit.length === 0) {

      alert("Vui lòng chọn trang phục");

      return;
    }

    if (!selectedPhongCach) {

      alert("Vui lòng chọn phong cách");

      return;
    }

    if (!selectedDip) {

      alert("Vui lòng chọn dịp sử dụng");

      return;
    }

    try {

      // clear old result
      setGoiYOutfits([]);

      const response = await fetch(

        "http://localhost:8000/phoi-do/goi-y",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            selectedItems:

              selectedOutfit.map(
                (item) => item.maTrangPhuc
              ),

            maPhongCach:
              parseInt(selectedPhongCach),

            maDipSD:
              parseInt(selectedDip),

            maNguoiDung: 1
          })
        }
      );

      const data = await response.json();

      console.log(data);

      // =========================
      // FAIL
      // =========================

      if (!data.success) {

        alert(data.message);

        return;
      }

      // =========================
      // FALLBACK
      // =========================

      if (data.fallback) {

        alert(data.message);
      }

      // =========================
      // SUCCESS
      // =========================

      setGoiYOutfits(
        data.outfits
      );

    } catch (error) {

      console.log(error);
    }
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

            value={searchText}

            onChange={(e) => {

              const value = e.target.value;

              setSearchText(value);

              handleSearch(
                value,
                selectedCategory
              );
            }}
          />

        </div>

        {/* FILTER */}

        <div className="td-filter">
          <button
            className={
              selectedCategory === "Tất cả"

              ? "active"

              : ""
            }

            onClick={() => {

              setSelectedCategory("Tất cả");

              handleSearch(
                searchText,
                "Tất cả"
              );
            }}
          >
            Tất cả
          </button>



          {
            danhMuc.map((item) => (

              <button

                key={item.maDanhMuc}

                className={
                  selectedCategory === item.tenDanhMuc

                  ? "active"

                  : ""
                }

                onClick={() => {

                  setSelectedCategory(
                    item.tenDanhMuc
                  );

                  handleSearch(
                    searchText,
                    item.tenDanhMuc
                  );
                }}
              >

                {item.tenDanhMuc}

              </button>
            ))
          }

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

            <div className="match-options">

              {/* PHONG CACH */}

              <select

                value={selectedPhongCach}

                onChange={(e) =>
                  setSelectedPhongCach(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Chọn phong cách
                </option>

                {
                  phongCach.map((item) => (

                    <option

                      key={item.maPhongCach}

                      value={item.maPhongCach}
                    >

                      {item.tenPhongCach}

                    </option>
                  ))
                }

              </select>

              {/* DIP */}

              <select

                value={selectedDip}

                onChange={(e) =>
                  setSelectedDip(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Chọn dịp sử dụng
                </option>

                {
                  dipSuDung.map((item) => (

                    <option

                      key={item.maDipSD}

                      value={item.maDipSD}
                    >

                      {item.tenDipSD}

                    </option>
                  ))
                }

              </select>

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

                  <button
                  className="match-btn" 
                  onClick={handlePhoiDo}>

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
            filteredData.map((item) => {

              const isSelected = selectedOutfit.some(
                (i) => i.maTrangPhuc === item.maTrangPhuc
              );

              return (

                <div
                  className={
                    isSelected

                    ? "td-card selected"

                    : "td-card"
                  }

                  key={item.maTrangPhuc}
                  onClick={async () => {
                  if (isSelecting) {

                    handleSelectItem(item);

                    return;
                  }

                  try {

                    const response = await fetch(

                      `http://localhost:8000/trang-phuc/${item.maTrangPhuc}`
                    );

                    const data = await response.json();

                    setSelectedItem(data);

                    setFormData({

                      tenTrangPhuc: data.tenTrangPhuc,

                      maLoai: data.maLoai,

                      maMau: data.maMau
                    });

                    setOpenDialog(true);

                  } catch (error) {

                    console.log(error);
                  }
                }}>

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
                    src={item.hinhAnh}
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

                      onClick={async (e) => {

                        e.stopPropagation();

                        try {

                          const response = await fetch(

                            `http://localhost:8000/trang-phuc/${item.maTrangPhuc}`,

                            {
                              method: "DELETE"
                            }
                          );

                          const data = await response.json();

                          alert(data.message);

                          fetchTrangPhuc();

                        } catch (error) {

                          console.log(error);
                        }
                      }}
                    >

                      <Trash2 size={15} />

                    </button>

                  </div>

                  {/* INFO */}

                  <div className="td-info">

                    <h3>
                      {item.tenTrangPhuc}
                    </h3>
                  </div>

                </div>
              );
            })
          }

        </div>
{/*  */}
        {
        goiYOutfits.length > 0 && (

          <div className="goiy-section">

            <div className="goiy-header">

              <h2>
                Outfit gợi ý
              </h2>

              {
                goiYOutfits.some(
                  item => item.fallback
                ) && (

                  <p className="fallback-message">
                    {
                      goiYOutfits[0]?.message
                    }
                  </p>
                )
              }

            </div>

            <div className="goiy-grid">

              {
                goiYOutfits.map(

                  (outfit, index) => (

                    <div
                      className="goiy-card"
                    
                      key={index}
                    >

                      
                      {
                        outfit.items.map((item) => (

                          <div
                            className="goiy-item"

                            key={
                              item.maTrangPhuc
                            }
                          >

                            <img
                              src={item.hinhAnh}
                              alt=""
                            />

                            <p>
                              {item.tenTrangPhuc}
                            </p>

                          </div>
                        ))
                      }

                    </div>
                  )
                )
              }

            </div>

          </div>
        )
      }

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
                  src={selectedItem.hinhAnh}
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

                    value={formData.tenTrangPhuc}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        tenTrangPhuc: e.target.value
                      })
                    }
                  />

                </div>

                {/* TYPE */}

                <div className="td-form-group">

                  <label>
                    Loại trang phục
                  </label>

                  <select

                    value={formData.maLoai}

                    onChange={(e) =>
                      setFormData({

                        ...formData,

                        maLoai: e.target.value
                      })
                    }
                  >

                    {
                      loaiTrangPhuc.map((item) => (

                        <option

                          key={item.maLoai}

                          value={item.maLoai}
                        >

                          {item.tenLoai}

                        </option>
                      ))
                    }

                  </select>

                </div>

                {/* COLOR */}

                <div className="td-form-group">

                  <label>
                    Màu sắc
                  </label>

                  <select
                    value={formData.maMau}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        maMau: e.target.value
                      })
                    }
                  >

                    {
                      mauSac.map((item) => (

                        <option

                          key={item.maMau}

                          value={item.maMau}
                        >

                          {item.tenMau}

                        </option>
                      ))
                    }

                  </select>

                </div>

                {/* BUTTON */}

                <div className="td-dialog-actions">
                  <button
                    className="update-btn"
                    onClick={handleUpdateTrangPhuc}>
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
