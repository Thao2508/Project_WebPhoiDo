import "./PhoiDo.scss";

import Sidebar from "../../../components/SideBar/SideBar";

import {
  Sparkles,
  ImagePlus,
  X,
  Heart,
  Check
} from "lucide-react";

import {
  useState,
  useEffect
} from "react";

const DS_KIEU_DANG = [

  {
    id: "Cơ bản",
    ten: "Cơ bản"
  },

  {
    id: "Rộng",
    ten: "Rộng"
  },

  {
    id: "Ôm",
    ten: "Ôm"
  },

  {
    id: "Ống rộng",
    ten: "Ống rộng"
  },

  {
    id: "Rách",
    ten: "Rách"
  },

  {
    id: "Croptop",
    ten: "Croptop"
  },

  {
    id: "Xếp ly",
    ten: "Xếp ly"
  },

  {
    id: "Tầng",
    ten: "Tầng"
  }
];

export default function PhoiDoNgay() {

  const [images, setImages] =
    useState([]);

  const [loadingAI, setLoadingAI] =
    useState(false);

  const [detectMessage, setDetectMessage] =useState("");

  const [loadingGenerate,
    setLoadingGenerate]
    = useState(false);

  const [dsLoai, setDsLoai] =
    useState([]);

  const [dsMau, setDsMau] =
    useState([]);

  const [dsHoaTiet, setDsHoaTiet]
    = useState([]);

  const [dsPhongCach,
    setDsPhongCach]
    = useState([]);

  const [dsDipSuDung,
    setDsDipSuDung]
    = useState([]);

  const [selectedStyle,
    setSelectedStyle]
    = useState(null);

  const [selectedOccasion,
    setSelectedOccasion]
    = useState(null);

  const [result, setResult]
    = useState([]);


  useEffect(() => {

    loadLoai();

    loadMau();

    loadHoaTiet();

    loadPhongCach();

    loadDipSuDung();

  }, []);


  const loadLoai = async () => {

    try {

      const res = await fetch(
        "http://localhost:8000/loai-trang-phuc/"
      );

      setDsLoai(await res.json());

    } catch (e) {

      console.log(e);
    }
  };

  const loadMau = async () => {

    try {

      const res = await fetch(
        "http://localhost:8000/mau/"
      );

      setDsMau(await res.json());

    } catch (e) {

      console.log(e);
    }
  };

  const loadHoaTiet = async () => {

    try {

      const res = await fetch(
        "http://localhost:8000/hoa-tiet/"
      );

      setDsHoaTiet(await res.json());

    } catch (e) {

      console.log(e);
    }
  };

  const loadPhongCach = async () => {

    try {

      const res = await fetch(
        "http://localhost:8000/phong-cach/"
      );

      setDsPhongCach(
        await res.json()
      );

    } catch (e) {

      console.log(e);
    }
  };

  const loadDipSuDung = async () => {

    try {

      const res = await fetch(
        "http://localhost:8000/dip-su-dung/"
      );

      setDsDipSuDung(
        await res.json()
      );

    } catch (e) {

      console.log(e);
    }
  };

  // =========================
  // UPLOAD
  // =========================

  const handleUpload = async (e) => {

    const files =
      Array.from(e.target.files);

    if (
      images.length + files.length > 4
    ) {

      alert(
        "Chỉ được upload tối đa 4 ảnh"
      );

      return;
    }

    setLoadingAI(true);

    const newItems = [];

    try {

      for (const file of files) {

        const preview =
          URL.createObjectURL(file);

        const form = new FormData();

        form.append("file", file);

        const res = await fetch(

          "http://localhost:8000/trang-phuc/detect",

          {
            method: "POST",
            body: form
          }
        );

        const result =
          await res.json();

        console.log(
          "DETECT RESULT:",
          result
        );

        if (!result.data) {
          throw new Error(
            result.message ||
            "Detect lỗi"
          );
        }

        const data =
          result.data;

        newItems.push({

          file,

          preview,

          formData: {

            tenTrangPhuc:
            data.loai?.tenLoai || "",

            loaiTrangPhuc:
            data.loai?.maLoai || "",

            phamViSuDung:
            data.loai?.phamViSuDung || "",

            mauSac:
            data.mau?.maMau || "",

            hoaTiet:
            data.hoaTiet?.maHoaTiet || "",

            kieuDang:
            data.kieuDang || "Cơ bản",

            hinhAnh:
            data.imageUrl || ""
          }
        });
      }

      setImages((prev) => [

        ...prev,

        ...newItems
      ]);
      setDetectMessage(
        "✓ Đã phân tích xong hình ảnh. Vui lòng kiểm tra lại thông tin trang phục trước khi phối đồ."
      );

    } catch (e) {
      console.error(e);
      alert(
        e.message ||
        "Lỗi AI detect"
      );

    } finally {

      setLoadingAI(false);
    }
  };

  // =========================
  // UPDATE FIELD
  // =========================

  const updateField = (
    index,
    field,
    value
  ) => {

    const newImages = [...images];

    newImages[index]
      .formData[field] = value;

    // update phạm vi sử dụng

    if (
      field === "loaiTrangPhuc"
    ) {

      const loai = dsLoai.find(

        (item) =>

          item.maLoai ===
          parseInt(value)
      );

      newImages[index]
        .formData
        .phamViSuDung =

        loai?.phamViSuDung || "";
    }

    setImages(newImages);
  };

  
  const removeImage = (index) => {

    if (
      images[index]?.preview
    ) {

      URL.revokeObjectURL(
        images[index].preview
      );
    }

    const newImages =
      [...images];

    newImages.splice(
      index,
      1
    );

    setImages(newImages);
    if (newImages.length === 0) {
      setDetectMessage("");
    }
  };

  // =========================
  // VALIDATE
  // =========================

  const validateBeforeGenerate =
    () => {

    if (!selectedStyle) {

      alert(
        "Vui lòng chọn phong cách"
      );

      return false;
    }

    if (!selectedOccasion) {

      alert(
        "Vui lòng chọn dịp sử dụng"
      );

      return false;
    }
    const invalidType = images.find(
      item => !item.formData.loaiTrangPhuc
    );

    if (invalidType) {

      alert(
        "Có ảnh chưa xác định được loại trang phục. Vui lòng chọn loại trang phục thủ công nếu ảnh là trang phục, hoặc xóa ảnh và tải lên ảnh khác trước khi phối đồ."
      );

      return false;
    }
    const invalidColor = images.find(
      item => !item.formData.mauSac
    );

    if (invalidColor) {

      alert(
        "Có ảnh chưa xác định được màu sắc. Vui lòng chọn màu sắc thủ công hoặc tải lên ảnh có màu sắc rõ ràng trước khi phối đồ."
      );

      return false;
    }
    let hasTop = false;

    let hasBottom = false;

    images.forEach((item) => {

      const phamVi =
        item.formData
        .phamViSuDung;

      if (
        phamVi === "Thân trên"
      ) {

        hasTop = true;
      }

      if (
        phamVi === "Thân dưới"
      ) {

        hasBottom = true;
      }
    });

    if (!hasTop || !hasBottom) {

      alert(
        "Cần ít nhất 1 trang phục thân trên và 1 trang phục thân dưới để phối"
      );

      return false;
    }

    return true;
  };


  const handleGenerate =
    async () => {

    if (
      !validateBeforeGenerate()
    ) {

      return;
    }
    setResult([]);
    try {

      setLoadingGenerate(true);

      const body = {

        maPhongCach:
        selectedStyle,

        maDipSD:
        selectedOccasion,

        items: images.map(
          (item) => ({

            maLoai:
            parseInt(
              item.formData
              .loaiTrangPhuc
            ),

            maMau:
            parseInt(
              item.formData
              .mauSac
            ),

            maHoaTiet:
            parseInt(
              item.formData
              .hoaTiet
            ),

            kieuDang:
            item.formData
            .kieuDang,

            hinhAnh:
            item.formData
            .hinhAnh
          })
        )
      };

      console.log(body);

      const res = await fetch(

        "http://localhost:8000/phoi-do/goi-y",

        {

          method: "POST",

          headers: {

            "Content-Type":
            "application/json"
          },

          body:
          JSON.stringify(body)
        }
      );

      const data =
        await res.json();

      console.log(data);

      // backend fail

      if (!data.success) {

        alert(
          data.message ||
          "Không thể phối đồ"
        );

        return;
      }

      // lấy outfit

      const outfits =
        data.data?.[0]?.outfits || [];

      console.log( "FULL DATA 0:", data.data?.[0] );

      // không có outfit

      if (outfits.length === 0) {

        alert(
          "Không tìm thấy outfit phù hợp"
        );

        return;
      }
      alert(
        `Đã tìm thấy ${outfits.length} bộ phối phù hợp.`
      );
      setResult(
        outfits.map(item => ({

          ...item,

          isFavorite: false,

          daLuuTrangPhuc: false
        }))
      );

    } catch (e) {

      console.log(e);

      alert("Lỗi phối đồ");

    } finally {

      setLoadingGenerate(false);
    }
  };

  const handleCancel = () => {

    setImages([]);

    setResult([]);

    setSelectedStyle(null);

    setSelectedOccasion(null);
    setDetectMessage("");
  };

  const saveClothingItem =
    async (item) => {

      const maNguoiDung =
        localStorage.getItem(
          "maNguoiDung"
        );

      const payload = {

        tenTrangPhuc:
          item.tenTrangPhuc,

        hinhAnh:
          item.hinhAnh,

        maLoai:
          item.maLoai,

        maMau:
          item.maMau,

        maHoaTiet:
          item.maHoaTiet,

        kieuDang:
          item.kieuDang,

        maNguoiDung:
          parseInt(maNguoiDung)
      };

      const res = await fetch(

        "http://localhost:8000/trang-phuc/them",

        {

          method: "POST",

          headers: {

            "Content-Type":
            "application/json"
          },

          body:
          JSON.stringify(payload)
        }
      );

      if (!res.ok) {

        throw new Error(
          "Không thể lưu trang phục"
        );
      }

      return await res.json();
    };

  const handleSaveOutfit =
  async (item, index) => {

    try {

      const maNguoiDung =
        parseInt(
          localStorage.getItem(
            "maNguoiDung"
          )
        );

      let aoId;
      let quanId;

      if (
        item.daLuuTrangPhuc
      ) {

        aoId =
          item.ao.maTrangPhuc;

        quanId =
          item.quan.maTrangPhuc;
      }

      else {

        const aoSaved =
          await saveClothingItem(
            item.ao
          );

        const quanSaved =
          await saveClothingItem(
            item.quan
          );

        aoId =
          aoSaved.data
          .maTrangPhuc;

        quanId =
          quanSaved.data
          .maTrangPhuc;
      }

      const body = {

        maNguoiDung,

        trangThai: 0,

        maLuat:
          item.maLuat,

        maLuatMau:
          item.maLuatMau,

        outfit: {

          ao: {

            maTrangPhuc:
              aoId
          },

          quan: {

            maTrangPhuc:
              quanId
          }
        }
      };

      const res = await fetch(

        "http://localhost:8000/yeu-thich/tao",

        {

          method: "POST",

          headers: {

            "Content-Type":
            "application/json"
          },

          body:
          JSON.stringify(body)
        }
      );

      const data =
        await res.json();

      if (!data.success) {

        alert(
          data.message
        );

        return;
      }


      const newResult =
        [...result];

      newResult[index] = {

        ...item,

        isFavorite: true,

        daLuuTrangPhuc: true,

        ao: {

          ...item.ao,

          maTrangPhuc:
            aoId
        },

        quan: {

          ...item.quan,

          maTrangPhuc:
            quanId
        }
      };

      setResult(newResult);

      alert(
        "Đã lưu outfit yêu thích"
      );

    } catch (e) {

      console.log(e);

      alert(
        "Lỗi lưu outfit"
      );
    }
  };

  const handleUnFavoriteOutfit =
  async (item, index) => {

    try {

      const maNguoiDung =
        parseInt(
          localStorage.getItem(
            "maNguoiDung"
          )
        );

      const body = {

        maNguoiDung,

        outfit: {

          ao: {

            maTrangPhuc:
            item.ao.maTrangPhuc
          },

          quan: {

            maTrangPhuc:
            item.quan.maTrangPhuc
          }
        }
      };

      const res = await fetch(

        "http://localhost:8000/yeu-thich/xoa",

        {

          method: "DELETE",

          headers: {

            "Content-Type":
            "application/json"
          },

          body:
          JSON.stringify(body)
        }
      );

      const data =
        await res.json();

      if (!data.success) {

        alert(
          data.message
        );

        return;
      }

      const newResult =
        [...result];

      newResult[index] = {

        ...item,

        isFavorite: false
      };

      setResult(newResult);

      alert(
        "Đã bỏ yêu thích"
      );

    } catch (e) {

      console.log(e);

      alert(
        "Lỗi bỏ yêu thích"
      );
    }
  };

  return (

    <div className="phoido">

      <Sidebar />

      <div className="phoido-main">

        <div className="ph-header">

          <h1>
            Phối đồ ngay
          </h1>

        </div>

        <div className="ph-content">

          {/* LEFT */}

          <div className="ph-left">

            {/* PHONG CÁCH */}

            <div className="ph-card">

              <h3>
                Chọn phong cách
              </h3>

              <div className="ph-tags">

                {dsPhongCach.map(
                  (item) => (

                  <button
                    type="button"
                    key={item.maPhongCach}
                    className={
                      selectedStyle === item.maPhongCach
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedStyle(item.maPhongCach)
                    }
                  >
                    {selectedStyle === item.maPhongCach && (
                      <Check size={14} className="tag-check" />
                    )}

                    {item.tenPhongCach}
                  </button>
                ))}
              </div>
            </div>

            {/* DỊP SỬ DỤNG */}

            <div className="ph-card">

              <h3>
                Dịp sử dụng
              </h3>

              <div className="ph-tags">

                {dsDipSuDung.map(
                  (item) => (

                  <button
                    key={item.maDipSD}
                    className={
                      selectedOccasion === item.maDipSD
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedOccasion(item.maDipSD)
                    }
                  >
                    {selectedOccasion === item.maDipSD && (
                      <Check size={14} className="tag-check" />
                    )}

                    {item.tenDipSD}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT */}

          <div className="ph-right">

            {/* UPLOAD */}

            {images.length < 4 && (

              <div className="upload-box">

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="upload"
                  onChange={
                    handleUpload
                  }
                  hidden
                />

                <label
                  htmlFor="upload"
                  className="upload-label"
                >

                  <ImagePlus
                    size={42}
                  />

                  <h3>
                    Upload trang phục
                  </h3>

                  <p>
                    Tối đa 4 ảnh
                  </p>

                </label>

              </div>
            )}
            {loadingAI && (
              <div className="ai-loading">
                <div className="spinner"></div>
                <p>Đang phân tích hình ảnh...</p>
              </div>
            )}
            {detectMessage && !loadingAI && (
              <div className="detect-message">
                {detectMessage}
              </div>
            )}
            {/* PREVIEW */}

            {images.length > 0 && (

              <div className="preview-grid">

                {images.map(
                  (item, index) => (

                  <div
                    className="preview-card"
                    key={index}
                  >

                    <img
                      src={
                        item.preview
                      }
                      alt=""
                    />

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeImage(index)
                      }
                    >

                      <X size={16} />

                    </button>

                    <div className="detect-form">

                      {/* LOẠI */}

                      <div className="formGroup">

                        <label>
                          Loại trang phục
                        </label>

                        <select

                          value={
                            item.formData
                            .loaiTrangPhuc
                          }

                          onChange={(e) =>
                            updateField(
                              index,
                              "loaiTrangPhuc",
                              e.target.value
                            )
                          }
                        >

                          <option value="">
                            Chọn loại
                          </option>

                          {dsLoai.map(
                            (l) => (

                            <option
                              key={
                                l.maLoai
                              }
                              value={
                                l.maLoai
                              }
                            >

                              {l.tenLoai}

                            </option>
                          ))}
                        </select>
                      </div>

                      {/* MÀU */}

                      <div className="formGroup">

                        <label>
                          Màu sắc
                        </label>

                        <select

                          value={
                            item.formData
                            .mauSac
                          }

                          onChange={(e) =>
                            updateField(
                              index,
                              "mauSac",
                              e.target.value
                            )
                          }
                        >

                          <option value="">
                            Chọn màu
                          </option>

                          {dsMau.map(
                            (m) => (

                            <option
                              key={
                                m.maMau
                              }
                              value={
                                m.maMau
                              }
                            >

                              {m.tenMau}

                            </option>
                          ))}
                        </select>
                      </div>

                      {/* HỌA TIẾT */}

                      <div className="formGroup">

                        <label>
                          Họa tiết
                        </label>

                        <select

                          value={
                            item.formData
                            .hoaTiet
                          }

                          onChange={(e) =>
                            updateField(
                              index,
                              "hoaTiet",
                              e.target.value
                            )
                          }
                        >

                          <option value="">
                            Chọn họa tiết
                          </option>

                          {dsHoaTiet.map(
                            (h) => (

                            <option
                              key={
                                h.maHoaTiet
                              }
                              value={
                                h.maHoaTiet
                              }
                            >

                              {
                                h.tenHoaTiet
                              }

                            </option>
                          ))}
                        </select>
                      </div>

                      {/* KIỂU DÁNG */}

                      <div className="formGroup">

                        <label>
                          Kiểu dáng
                        </label>

                        <select

                          value={
                            item.formData
                            .kieuDang
                          }

                          onChange={(e) =>
                            updateField(
                              index,
                              "kieuDang",
                              e.target.value
                            )
                          }
                        >

                          {DS_KIEU_DANG.map(
                            (k) => (

                            <option
                              key={k.id}
                              value={k.id}
                            >

                              {k.ten}

                            </option>
                          ))}
                        </select>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* BUTTON */}

            <div className="action-buttons">

              <button
                className="cancel-btn"
                onClick={handleCancel}
              >
                Hủy
              </button>

              <button

                className="generate-btn"

                onClick={
                  handleGenerate
                }

                disabled={
                  loadingGenerate
                  || loadingAI
                }
              >

                <Sparkles size={18} />

                {
                  loadingGenerate
                  ? "Đang phối đồ..."
                  : "Phối đồ ngay"
                }

              </button>

            </div>

            {/* RESULT */}

            <div className="result-box">

              {result.length === 0 ? (

                <div className="empty-result">

                  <p>
                    Bộ phối đạt tiêu chí sẽ hiển thị ở đây
                  </p>

                </div>

              ) : (
                <div className="result-grid">

                  {result.map((item, index) => (

                    <div
                      className="outfit-card"
                      key={index}
                    >
                      <button
                        className={`favorite-btn ${
                          item.isFavorite
                            ? "active"
                            : ""
                        }`}
                        onClick={() => {
                          if (
                            item.isFavorite
                          ) {

                            handleUnFavoriteOutfit(
                              item,
                              index
                            );
                          }
                          else {

                            handleSaveOutfit(
                              item,
                              index
                            );
                          }
                        }}
                      >
                        <Heart />
                      </button>

                      <div className="outfit-item">

                        <img
                          src={item.ao?.hinhAnh}
                          alt=""
                        />

                        <p>
                          {item.ao?.tenTrangPhuc}
                        </p>

                      </div>

                      <div className="outfit-item">

                        <img
                          src={item.quan?.hinhAnh}
                          alt=""
                        />

                        <p>
                          {item.quan?.tenTrangPhuc}
                        </p>

                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
