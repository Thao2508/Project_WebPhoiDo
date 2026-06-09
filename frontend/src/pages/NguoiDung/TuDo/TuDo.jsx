import "./TuDo.scss";

import Sidebar from "../../../components/SideBar/SideBar";

import {
  Search,
  Plus,
  Shirt,
  Trash2,
  X,
  Pencil,
  Check,
  Heart
} from "lucide-react";

import { Link } from "react-router-dom";

import { useState, useEffect} from "react";
import axios from "axios";

export default function TuDo() {

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedOutfit, setSelectedOutfit] = useState([]);

  const [selectAll, setSelectAll] = useState(false);

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

  const [goiYMessage, setGoiYMessage] = useState("");

  const [loadingPhoiDo, setLoadingPhoiDo] = useState(false);

  const [openSuggestDrawer, setOpenSuggestDrawer] = useState(false);

  const maNguoiDung = parseInt(localStorage.getItem("maNguoiDung"));

  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  const [selectedSavedOutfit, setSelectedSavedOutfit]= useState(null);

  const [trangThaiOutfit, setTrangThaiOutfit] = useState(0);

  const [likedOutfits, setLikedOutfits] = useState([]);

  useEffect(() => {

    fetchTrangPhuc();

    fetchDanhMuc();

    fetchLoaiTrangPhuc();

    fetchMauSac();

    fetchPhongCach();

    fetchDipSuDung();

  }, []);


  useEffect(() => {

    if (
      filteredData.length > 0
      &&
      selectedOutfit.length === filteredData.length
    ) {

      setSelectAll(true);

    } else {

      setSelectAll(false);
    }

  }, [selectedOutfit, filteredData]);

  const fetchTrangPhuc = async () => {

    try {

      const response = await fetch(

        `http://localhost:8000/trang-phuc/user/${maNguoiDung}`

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

  const handleSelectAll = () => {

    if (selectAll) {

      setSelectedOutfit([]);

      setSelectAll(false);

    } else {

      setSelectedOutfit(filteredData);

      setSelectAll(true);
    }
  };

  const handleOpenUpdate = async (
    item,
    e
  ) => {

    e.stopPropagation();

    try {

      const response = await fetch(

        `http://localhost:8000/trang-phuc/${item.maTrangPhuc}`

      );

      const data = await response.json();

      setSelectedItem(data);

      setFormData({

        tenTrangPhuc:
          data.tenTrangPhuc,

        maLoai:
          data.maLoai,

        maMau:
          data.maMau
      });

      setOpenDialog(true);

    } catch (error) {

      console.log(error);
    }
  };

  const handleSearch = (
    keyword,
    category
  ) => {

    let data = [...trangPhuc];

    const searchValue = keyword
      .toLowerCase()
      .trim();

    if (searchValue !== "") {

      data = data.filter((item) => {

        const tenTrangPhuc =

          item?.tenTrangPhuc
            ?.toLowerCase() || "";

        const kieuDang =

          item?.kieuDang
            ?.toLowerCase() || "";

        const tenLoai =

          item?.loai
            ?.tenLoai
            ?.toLowerCase() || "";

        const tenDanhMuc =

          item?.loai
            ?.danhMuc
            ?.tenDanhMuc
            ?.toLowerCase() || "";

        const tenMau =

          item?.mau
            ?.tenMau
            ?.toLowerCase() || "";

        return (

          tenTrangPhuc.includes(
            searchValue
          )

          ||

          kieuDang.includes(
            searchValue
          )

          ||

          tenLoai.includes(
            searchValue
          )

          ||

          tenDanhMuc.includes(
            searchValue
          )

          ||

          tenMau.includes(
            searchValue
          )
        );
      });
    }
    if (category !== "Tất cả") {

      data = data.filter(

        (item) =>

          item?.loai
            ?.danhMuc
            ?.tenDanhMuc === category
      );
    }

    setFilteredData(data);
  };

  const handleUpdateTrangPhuc = async () => {

    try {

      const response = await fetch(

        `http://localhost:8000/trang-phuc/cap-nhat/${selectedItem.maTrangPhuc}`,

        {

          method: "PUT",

          headers: {

            "Content-Type":
            "application/json"
          },

          body: JSON.stringify({

            tenTrangPhuc:
            formData.tenTrangPhuc,

            hinhAnh:
            selectedItem.hinhAnh,

            maLoai:
            parseInt(formData.maLoai),

            maMau:
            parseInt(formData.maMau),

            maHoaTiet:
            selectedItem.maHoaTiet,

            maNguoiDung:
            selectedItem.maNguoiDung,

            kieuDang:
            selectedItem.kieuDang
          })
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchTrangPhuc();

      setOpenDialog(false);

    } catch (error) {

      console.log(error);
    }
  };


  const handleCloseSuggest = () => {

    setIsSelecting(false);

    setOpenSuggestDrawer(false);

    setSelectedOutfit([]);

    setGoiYOutfits([]);

    setGoiYMessage("");

    setSelectedPhongCach("");

    setSelectedDip("");
  };

  const handlePhoiDo = async () => {

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

      setLoadingPhoiDo(true);

      setGoiYOutfits([]);

      setGoiYMessage("");

      const maNguoiDung =
        localStorage.getItem(
          "maNguoiDung"
        );

      const response = await fetch(

        "http://localhost:8000/phoi-do/goi-y",

        {

          method: "POST",

          headers: {

            "Content-Type":
            "application/json"
          },

          body: JSON.stringify({

            selectedItems:

              selectedOutfit.map(
                (item) =>
                item.maTrangPhuc
              ),

            maPhongCach:
              parseInt(
                selectedPhongCach
              ),

            maDipSD:
              parseInt(selectedDip),

            maNguoiDung:
              parseInt(maNguoiDung)
          })
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (!data.success) {

        alert(
          data.message ||
          "Có lỗi xảy ra"
        );

        return;
      }

      if (
        !data.data ||
        data.data.length === 0
      ) {

        alert(
          "Không tìm thấy outfit phù hợp"
        );

        return;
      }

      setGoiYOutfits(
        data.data || []
      );

      setGoiYMessage(
        data.message || ""
      );

    } catch (error) {

      console.log(error);

      alert("Lỗi kết nối server");
    }
    finally {
      setLoadingPhoiDo(false);
    }
  };

  const getOutfitKey = (outfit) => {

    return [
      outfit?.ao?.maTrangPhuc,
      outfit?.quan?.maTrangPhuc
    ]
      .filter(Boolean)
      .join("-");
  };

  const isLiked = (outfit) => {

    return likedOutfits.some(

      (item) =>

        getOutfitKey(item)
        === getOutfitKey(outfit)
    );
  };

  const handleHeartClick = async (outfit) => {
    // unlike
    if (isLiked(outfit)) {

      try {

        await axios.delete(
          "http://localhost:8000/yeu-thich/xoa",
          {
            data: {
              maNguoiDung,
              outfit
            }
          }
        );

        setLikedOutfits((prev) =>
          prev.filter(
            (item) =>
              getOutfitKey(item)
              !== getOutfitKey(outfit)
          )
        );

      } catch (err) {

        console.log(err);
      }

      return;
    }

    // chưa like
    setSelectedSavedOutfit(outfit);

    setOpenSaveDialog(true);
  };


  const handleSaveOutfit = async () => {

    if (!selectedSavedOutfit) {

      return;
    }

    try {

      const maNguoiDung =
        parseInt(
          localStorage.getItem(
            "maNguoiDung"
          )
        );

      const response = await axios.post(

        "http://localhost:8000/yeu-thich/tao",

        {

          maNguoiDung,

          trangThai:
            trangThaiOutfit,

          maLuat:
            selectedSavedOutfit
              ?.maLuat || null,

          maLuatMau:
            selectedSavedOutfit
              ?.maLuatMau || null,

          outfit:
            selectedSavedOutfit
        }
      );

      console.log(response.data);

      if (!response.data.success) {

        alert(
          response.data.message ||
          "Không thể lưu outfit"
        );

        return;
      }

      setLikedOutfits((prev) => [

        ...prev,

        selectedSavedOutfit
      ]);

      setOpenSaveDialog(false);

      setSelectedSavedOutfit(null);

      setTrangThaiOutfit(0);

    } catch (err) {

      console.log(err);

      alert("Lỗi lưu outfit");
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
                setOpenSuggestDrawer(true);
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
        {
        isSelecting && (

          <div className="select-all-wrapper">

            <label className="select-all-label">

              <input

                type="checkbox"

                checked={selectAll}

                onChange={handleSelectAll}
              />

              <span>
                Chọn tất cả 
              </span>

            </label>

          </div>
        )
      }
        
        {/* GRID */}
        {/* GRID & LAYOUT CHÍNH */}
        <div className={openSuggestDrawer ? "closet-layout" : "closet-full"}>
          
          {/* BÊN TRÁI: DANH SÁCH TỦ ĐỒ */}
          <div className="closet-left">
            {filteredData.length === 0 ? (
              /* ĐƯA RA NGOÀI ĐỂ KHÔNG BỊ CSS CỦA GRID ÉP KÍCH THƯỚC */
              <div className="empty-closet">
                <h2>Tủ đồ của bạn đang trống</h2>
                <p>Hãy thêm trang phục để bắt đầu phối đồ</p>
              </div>
            ) : (
              <div className="td-grid">
                {filteredData.map((item) => {
                  const isSelected = selectedOutfit.some(
                    (i) => i.maTrangPhuc === item.maTrangPhuc
                  );

                  return (
                    <div
                      className={isSelected ? "td-card selected" : "td-card"}
                      key={item.maTrangPhuc}
                      onClick={async () => {
                        if (isSelecting) {
                          handleSelectItem(item);
                          return;
                        }
                        try {
                          const response = await fetch(`http://localhost:8000/trang-phuc/${item.maTrangPhuc}`);
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
                      }}
                    >
                      {isSelecting && isSelected && (
                        <div className="selected-check">
                          <Check size={16} />
                        </div>
                      )}

                      <img src={item.hinhAnh} alt="" />

                      <div className="td-action-group">
                        <button className="td-update" onClick={(e) => handleOpenUpdate(item, e)}>
                          <Pencil size={15} />
                        </button>
                        <button
                          className="td-delete"
                          onClick={async (e) => {
                            e.stopPropagation();
                            try {
                              const response = await fetch(`http://localhost:8000/trang-phuc/${item.maTrangPhuc}`, {
                                method: "DELETE"
                              });
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

                      <div className="td-info">
                        <h3>{item.tenTrangPhuc}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* BÊN PHẢI: DRAWER GỢI Ý (Chỉ hiển thị khi openSuggestDrawer === true) */}
          {openSuggestDrawer && (
            <div className="closet-right">
              <div className="goiy-section suggest-panel">
                <div className="suggest-header">
                  <h2>Gợi ý phối đồ</h2>
                  <button className="close-suggest" onClick={handleCloseSuggest}>
                    <X size={18} />
                  </button>
                </div>

                <div className="suggest-form">
                  <select
                    value={selectedPhongCach}
                    onChange={(e) => setSelectedPhongCach(e.target.value)}
                  >
                    <option value="">Chọn phong cách</option>
                    {phongCach.map((item) => (
                      <option key={item.maPhongCach} value={item.maPhongCach}>
                        {item.tenPhongCach}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedDip}
                    onChange={(e) => setSelectedDip(e.target.value)}
                  >
                    <option value="">Chọn dịp sử dụng</option>
                    {dipSuDung.map((item) => (
                      <option key={item.maDipSD} value={item.maDipSD}>
                        {item.tenDipSD}
                      </option>
                    ))}
                  </select>
                </div>

                <button className="suggest-btn" onClick={handlePhoiDo} disabled={loadingPhoiDo}>
                  <Shirt size={18} />
                  <span>{loadingPhoiDo ? "Đang phối..." : "Phối đồ ngay"}</span>
                </button>

                {goiYMessage && <p className="fallback-message">{goiYMessage}</p>}

                <div className="suggest-result">
                  {goiYOutfits.map((group, groupIndex) => {
                    if (!group || !group.outfits || group.outfits.length === 0) return null;
                    return (
                      <div key={groupIndex} className="fallback-group">
                        <div className="fallback-context">
                          <h3>
                            {group?.context?.tenPhongCach || "Outfit"}
                            {group?.context?.tenDipSuDung ? ` - ${group.context.tenDipSuDung}` : ""}
                          </h3>
                        </div>

                        <div className="goiy-grid">
                          {group.outfits.map((outfit, index) => (
                            <div className="goiy-card" key={`${groupIndex}-${index}`}>
                              <button
                                className="heart-btn"

                                onClick={(e) => {

                                  e.stopPropagation();

                                  handleHeartClick(outfit);
                                }}
                              >

                                <Heart

                                  size={22}

                                  fill={
                                    isLiked(outfit)
                                      ? "#ff4d6d"
                                      : "white"
                                  }

                                  color={
                                    isLiked(outfit)
                                      ? "#ff4d6d"
                                      : "#94a3b8"
                                  }
                                />

                              </button>
                              <div className="goiy-items">

                                {outfit?.ao?.hinhAnh && (

                                  <div className="goiy-item">

                                    <img
                                      src={outfit.ao.hinhAnh}
                                      alt=""
                                    />

                                    <p>
                                      {outfit.ao.tenTrangPhuc}
                                    </p>

                                  </div>
                                )}

                                {outfit?.quan?.hinhAnh && (

                                  <div className="goiy-item">

                                    <img
                                      src={outfit.quan.hinhAnh}
                                      alt=""
                                    />

                                    <p>
                                      {outfit.quan.tenTrangPhuc}
                                    </p>

                                  </div>
                                )}

                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
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

      {
      openSaveDialog && (

        <div className="save-dialog-overlay">

          <div className="save-dialog">

            <h3>
              Chọn trạng thái hiển thị
            </h3>

            <div className="visibility-options">

              <label>

                <input
                  type="radio"
                  name="visibility"

                  checked={
                    trangThaiOutfit === 1
                  }

                  onChange={() =>
                    setTrangThaiOutfit(1)
                  }
                />

                Công khai

              </label>

              <label>

                <input
                  type="radio"
                  name="visibility"

                  checked={
                    trangThaiOutfit === 0
                  }

                  onChange={() =>
                    setTrangThaiOutfit(0)
                  }
                />

                Riêng tư

              </label>

            </div>

            <div className="dialog-actions">

              <button
                onClick={() =>
                  setOpenSaveDialog(false)
                }
              >
                Hủy
              </button>

              <button
                type="button"

                onClick={(e) => {

                  e.stopPropagation();

                  handleSaveOutfit();
                }}
              >
                Lưu outfit
              </button>

            </div>

          </div>

        </div>
      )
    }

    </div>
  );
}