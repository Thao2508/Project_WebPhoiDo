import "./ThemTrangPhuc.scss";
import Sidebar from "../../../components/SideBar/SideBar";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Upload,
  Sparkles,
  Save,
  X,
} from "lucide-react";

export default function ThemTrangPhuc() {
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const [loadingAI, setLoadingAI] = useState(false);

  const [formData, setFormData] = useState({
    tenTrangPhuc: "",
    loaiTrangPhuc: "",
    mauSac: "",
  });
    <Sidebar />
  // Upload ảnh
  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    // Fake AI detect
    setLoadingAI(true);

    setTimeout(() => {
      setFormData({
        tenTrangPhuc: "Áo thun trắng",
        loaiTrangPhuc: "Áo thun",
        mauSac: "Trắng",
      });

      setLoadingAI(false);
    }, 1500);
  };

  // Change input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Save
  const handleSave = () => {
    console.log(formData);

    alert("Đã thêm trang phục!");
  };

  return (
    <div className="themTrangPhucPage">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="themTrangPhuc">
        {/* Header */}
        <div className="pageHeader">
          <div className="titleGroup">
            <button
              className="backBtn"
              onClick={() => navigate("/tudo")}
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1>Thêm trang phục</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          {/* Upload Card */}
          <div className="uploadCard">
            <h2>Ảnh trang phục</h2>

            {!preview ? (
              <label className="uploadBox">
                <Upload size={46} />

                <h3>Tải ảnh trang phục</h3>

                <p>PNG, JPG (tối đa 5MB)</p>

                <input
                  type="file"
                  hidden
                  onChange={handleUpload}
                />
              </label>
            ) : (
              <div className="previewBox">
                <img src={preview} alt="" />

                <button
                  className="removeBtn"
                  onClick={() => setPreview(null)}
                >
                  <X size={18} />
                </button>
              </div>
            )}

          </div>

          {/* Form Card */}
          <div className="formCard">
            <h2>Thông tin trang phục</h2>

            {loadingAI && (
              <div className="aiLoading">
                <Sparkles size={18} />

                AI đang phân tích ảnh...
              </div>
            )}

            {/* Tên */}
            <div className="formGroup">
                <div className="labelRow">
                    <label>Tên trang phục</label>
                </div>

              <input
                type="text"
                placeholder="Nhập tên trang phục"
                name="tenTrangPhuc"
                value={formData.tenTrangPhuc}
                onChange={handleChange}
              />
            </div>

            {/* Loại */}
            <div className="formGroup">
              <div className="labelRow">
                <label>Loại trang phục</label>

                <span className="aiTag">
                  <Sparkles size={13} />
                  AI đề xuất
                </span>
              </div>

              <select
                name="loaiTrangPhuc"
                value={formData.loaiTrangPhuc}
                onChange={handleChange}
              >
                <option value="">Chọn loại</option>

                <option value="Áo thun">Áo thun</option>

                <option value="Áo sơ mi">Áo sơ mi</option>

                <option value="Quần jean">Quần jean</option>

                <option value="Váy">Váy</option>
              </select>
            </div>

            {/* Màu */}
            <div className="formGroup">
              <div className="labelRow">
                <label>Màu sắc</label>

                <span className="aiTag">
                  <Sparkles size={13} />
                  AI đề xuất
                </span>
              </div>

              <select
                name="mauSac"
                value={formData.mauSac}
                onChange={handleChange}
              >
                <option value="">Chọn màu</option>

                <option value="Trắng">Trắng</option>

                <option value="Đen">Đen</option>

                <option value="Xám">Xám</option>

                <option value="Be">Be</option>

                <option value="Xanh">Xanh</option>
              </select>
            </div>
            {/* Họa tiết */}
            <div className="formGroup">
            <div className="labelRow">
                <label>Họa tiết</label>
            </div>

            <select
                name="hoaTiet"
                value={formData.hoaTiet}
                onChange={handleChange}
            >
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
            <button
              className="submitBtn"
              onClick={handleSave}
            >
              <Save size={18} />
              Thêm trang phục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}