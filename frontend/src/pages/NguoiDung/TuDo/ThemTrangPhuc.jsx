import "./ThemTrangPhuc.scss";
import Sidebar from "../../../components/SideBar/SideBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Sparkles, Save, X } from "lucide-react";

// Dữ liệu kiểu dáng code cứng
const DS_KIEU_DANG = [
  { id: "Cơ bản", ten: "Cơ bản" },
  { id: "Rộng", ten: "Rộng" },
  { id: "Ôm", ten: "Ôm" },
  { id: "Ống rộng", ten: "Ống rộng" },
  { id: "Rách", ten: "Rách" },
  { id: "Croptop", ten: "Croptop" },
  { id: "Xếp ly", ten: "Xếp ly" },
  { id: "Tầng", ten: "Tầng" },
];

export default function ThemTrangPhuc() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  
  const [dsLoai, setDsLoai] = useState([]);
  const [dsMau, setDsMau] = useState([]);
  const [dsHoaTiet, setDsHoaTiet] = useState([]);

  const [formData, setFormData] = useState({
    tenTrangPhuc: "",
    loaiTrangPhuc: "",
    mauSac: "",
    hoaTiet: "",
    kieuDang: "",
    hinhAnh: "",
  });

  useEffect(() => {
    loadLoai();
    loadMau();
    loadHoaTiet();
  }, []);

  const loadLoai = async () => {
    try {
      const res = await fetch("http://localhost:8000/loai-trang-phuc/");
      setDsLoai(await res.json());
    } catch (e) { console.log(e); }
  };

  const loadMau = async () => {
    try {
      const res = await fetch("http://localhost:8000/mau/");
      setDsMau(await res.json());
    } catch (e) { console.log(e); }
  };

  const loadHoaTiet = async () => {
    try {
      const res = await fetch("http://localhost:8000/hoa-tiet/");
      setDsHoaTiet(await res.json());
    } catch (e) { console.log(e); }
  };


  const handleUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    setPreview(
      URL.createObjectURL(file)
    );

    // RESET AI DATA

    setFormData({

      tenTrangPhuc: "",

      loaiTrangPhuc: "",

      mauSac: "",

      hoaTiet: "",

      kieuDang: "",

      hinhAnh: ""
    });
  };


  const handleAnalyzeAI = async () => {

    if (!selectedFile) {

      alert("Vui lòng chọn ảnh");

      return;
    }

    try {

      setLoadingAI(true);

      const form = new FormData();

      form.append(
        "file",
        selectedFile
      );

      const res = await fetch(

        "http://localhost:8000/trang-phuc/detect",

        {

          method: "POST",

          body: form
        }
      );

      const result = await res.json();

      console.log(result);

      const data = result.data;

      setFormData({

        tenTrangPhuc:
        data.loai?.tenLoai || "",

        loaiTrangPhuc:
        data.loai?.maLoai || "",

        mauSac:
        data.mau?.maMau || "",

        hoaTiet:
        data.hoaTiet?.maHoaTiet || "",

        kieuDang:
        data.kieuDang || "Cơ bản",

        hinhAnh:
        data.imageUrl || ""
      });

    } catch (e) {

      console.log(e);

      alert("Lỗi AI detect");

    } finally {

      setLoadingAI(false);
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {

    try {

      const maNguoiDung = localStorage.getItem("maNguoiDung");

      if (!maNguoiDung) {

        alert("Vui lòng đăng nhập");

        navigate("/dangnhap");

        return;
      }

      const res = await fetch(

        "http://localhost:8000/trang-phuc/them",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            tenTrangPhuc:
            formData.tenTrangPhuc,

            hinhAnh:
            formData.hinhAnh,

            maLoai:
            parseInt(formData.loaiTrangPhuc),

            maMau:
            parseInt(formData.mauSac),

            maHoaTiet:
            parseInt(formData.hoaTiet),

            kieuDang:
            formData.kieuDang,

            maNguoiDung:
            parseInt(maNguoiDung)
          })
        }
      );

      const data = await res.json();

      console.log(data);

      alert("Thêm trang phục thành công!");

      navigate("/tudo");

    } catch (e) {

      console.log(e);

      alert("Lỗi khi lưu trang phục");
    }
  };
  return (
    <div className="themTrangPhucPage">
      <Sidebar />
      <div className="themTrangPhuc">
        <div className="pageHeader">
          <button className="backBtn" onClick={() => navigate("/tudo")}><ArrowLeft size={20} /></button>
          <h1>Thêm trang phục</h1>
        </div>

        <div className="content">
          <div className="uploadCard">
            <h2>Ảnh trang phục</h2>
            {!preview ? (
              <label className="uploadBox">
                <Upload size={46} />
                <h3>Tải ảnh</h3>
                <input type="file" hidden onChange={handleUpload} />
              </label>
            ) : (
              <div className="previewBox">
                <img src={preview} alt="preview" />
                <button
                  className="analyzeBtn"
                  onClick={handleAnalyzeAI}
                  disabled={loadingAI}
                >

                  <Sparkles size={18} />

                  {
                    loadingAI
                    ? "Đang phân tích..."
                    : "Phân tích AI"
                  }

                </button>
                <button className="removeBtn" 
                  onClick={() => {
                    setPreview(null);
                    setSelectedFile(null);
                    setFormData({
                      tenTrangPhuc: "",
                      loaiTrangPhuc: "",
                      mauSac: "",
                      hoaTiet: "",
                      kieuDang: "",
                      hinhAnh: ""
                    });
                  }} ><X size={18} /></button>
              </div>
            )}
          </div>

          <div className="formCard">
            <h2>Thông tin trang phục</h2>
            {loadingAI && <div className="aiLoading"><Sparkles size={18} /> AI đang phân tích...</div>}
            
            <div className="formGroup">
              <label>Tên trang phục</label>
              <input type="text" name="tenTrangPhuc" value={formData.tenTrangPhuc} onChange={handleChange} />
            </div>

            <div className="formGroup">
              <label>Loại trang phục</label>
              <select name="loaiTrangPhuc" value={formData.loaiTrangPhuc} onChange={handleChange}>
                <option value="">Chọn loại</option>
                {dsLoai.map(item => <option key={item.maLoai} value={item.maLoai}>{item.tenLoai}</option>)}
              </select>
            </div>

            <div className="formGroup">
              <label>Màu sắc</label>
              <select name="mauSac" value={formData.mauSac} onChange={handleChange}>
                <option value="">Chọn màu</option>
                {dsMau.map(item => <option key={item.maMau} value={item.maMau}>{item.tenMau}</option>)}
              </select>
            </div>

            <div className="formGroup">
              <label>Họa tiết</label>
              <select name="hoaTiet" value={formData.hoaTiet} onChange={handleChange}>
                <option value="">Chọn họa tiết</option>
                {dsHoaTiet.map(item => <option key={item.maHoaTiet} value={item.maHoaTiet}>{item.tenHoaTiet}</option>)}
              </select>
            </div>

            <div className="formGroup">
              <label>Kiểu dáng</label>
              <select name="kieuDang" value={formData.kieuDang} onChange={handleChange}>
                <option value="">Chọn kiểu dáng</option>
                {DS_KIEU_DANG.map(item => <option key={item.id} value={item.id}>{item.ten}</option>)}
              </select>
            </div>

            <button className="submitBtn" onClick={handleSave}><Save size={18} /> Thêm trang phục</button>
          </div>
        </div>
      </div>
    </div>
  );
}