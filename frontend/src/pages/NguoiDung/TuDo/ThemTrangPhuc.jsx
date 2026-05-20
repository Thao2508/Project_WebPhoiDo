import "./ThemTrangPhuc.scss";
import Sidebar from "../../../components/SideBar/SideBar";

import { useState, useEffect } from "react";
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

    hinhAnh: "",
  });


  useEffect(() => {

    loadLoai();

    loadMau();

    loadHoaTiet();

  }, []);

  const loadLoai = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/loai-trang-phuc/"
      );

      const data = await response.json();

      setDsLoai(data);

    } catch (error) {

      console.log(error);
    }
  };


  const loadMau = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/mau/"
      );

      const data = await response.json();

      setDsMau(data);

    } catch (error) {

      console.log(error);
    }
  };


  const loadHoaTiet = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/hoa-tiet/"
      );

      const data = await response.json();

      setDsHoaTiet(data);

    } catch (error) {

      console.log(error);
    }
  };


  const handleUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;
    setSelectedFile(file);
    setPreview(
      URL.createObjectURL(file)
    );

    setLoadingAI(true);

    try {

      const formDataUpload = new FormData();

      formDataUpload.append(
        "file",
        file
      );

      const response = await fetch(

        "http://localhost:8000/trang-phuc/detect",

        {
          method: "POST",

          body: formDataUpload,
        }
      );

      const data = await response.json();

      console.log(data);
      setFormData({

        tenTrangPhuc:
          data.tenTrangPhuc || "",

        loaiTrangPhuc:
          data.maLoai || "",

        mauSac:
          data.maMau || "",

        hoaTiet:
          data.maHoaTiet || "",

        hinhAnh: "",
      });

    } catch (error) {

      console.log(error);

      alert("Lỗi AI detect");

    } finally {

      setLoadingAI(false);
    }
  };


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,
    });
  };


  const handleSave = async () => {

    try {
      const form = new FormData();
      form.append(
        "file",
        selectedFile
      );
      form.append(
        "tenTrangPhuc",
        formData.tenTrangPhuc
      );

      form.append(
        "maLoai",
        formData.loaiTrangPhuc
      );

      form.append(
        "maMau",
        formData.mauSac
      );

      form.append(
        "maHoaTiet",
        formData.hoaTiet
      );

      form.append(
        "maNguoiDung",
        1
      );

      const response = await fetch(

        "http://localhost:8000/trang-phuc/them",

        {
          method: "POST",

          body: form
        }
      );



      const data = await response.json();

      console.log(data);

      alert("Đã thêm trang phục!");

      navigate("/tudo");

    } catch (error) {

      console.log(error);

      alert("Lỗi thêm trang phục");
    }
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


          {/* Upload */}
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
                  onClick={() => {

                    setPreview(null);

                    setSelectedFile(null);

                    setFormData({

                      tenTrangPhuc: "",

                      loaiTrangPhuc: "",

                      mauSac: "",

                      hoaTiet: "",

                      hinhAnh: "",
                    });
                  }}
                >

                  <X size={18} />

                </button>

              </div>
            )}

          </div>



          {/* Form */}
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

                <option value="">
                  Chọn loại
                </option>

                {dsLoai.map((item) => (

                  <option
                    key={item.maLoai}
                    value={item.maLoai}
                  >
                    {item.tenLoai}
                  </option>

                ))}

              </select>

            </div>



            {/* Mau */}
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

                <option value="">
                  Chọn màu
                </option>

                {dsMau.map((item) => (

                  <option
                    key={item.maMau}
                    value={item.maMau}
                  >
                    {item.tenMau}
                  </option>

                ))}

              </select>

            </div>



            {/* Hoa tiet */}
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
                  Chọn họa tiết
                </option>

                {dsHoaTiet.map((item) => (

                  <option
                    key={item.maHoaTiet}
                    value={item.maHoaTiet}
                  >
                    {item.tenHoaTiet}
                  </option>

                ))}

              </select>

            </div>



            {/* Button */}
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
