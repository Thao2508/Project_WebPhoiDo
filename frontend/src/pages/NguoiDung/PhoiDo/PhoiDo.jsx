// PhoiDoNgay.jsx

import "./PhoiDo.scss";

import Sidebar from "../../../components/SideBar/SideBar";

import {
  Upload,
  Sparkles,
  ImagePlus,
  X,
} from "lucide-react";

import { useState } from "react";

export default function PhoiDoNgay() {
  const [images, setImages] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    const imageUrls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setImages([...images, ...imageUrls]);
  };

  const removeImage = (index) => {
    const newImages = [...images];

    newImages.splice(index, 1);

    setImages(newImages);
  };

  return (
    <div className="phoido">

      <Sidebar />

      <div className="phoido-main">

        {/* HEADER */}
        <div className="ph-header">
              <h1>Phối đồ ngay</h1>
        </div>

        {/* FORM */}
        <div className="ph-content">

          {/* LEFT */}
          <div className="ph-left">

            {/* STYLE */}
            <div className="ph-card">

              <h3>Chọn phong cách</h3>

              <div className="ph-tags">

                <button>Casual</button>
                <button>Korean</button>
                <button>Minimal</button>
                <button>Streetwear</button>
                <button>Vintage</button>

              </div>

            </div>

            {/* OCCASION */}
            <div className="ph-card">

              <h3>Dịp sử dụng</h3>

              <div className="ph-tags">

                <button>Đi học</button>
                <button>Đi làm</button>
                <button>Đi chơi</button>
                <button>Party</button>
                <button>Cafe</button>

              </div>

            </div>


          </div>

          {/* RIGHT */}
          <div className="ph-right">

            {/* UPLOAD */}
            <div className="upload-box">

              <input
                type="file"
                multiple
                accept="image/*"
                id="upload"
                onChange={handleUpload}
                hidden
              />

              <label
                htmlFor="upload"
                className="upload-label"
              >

                <ImagePlus size={42} />

                <h3>Upload trang phục</h3>

                <p>
                  Hỗ trợ upload nhiều ảnh áo và quần
                </p>

              </label>

            </div>

            {/* PREVIEW */}
            {images.length > 0 && (
              <div className="preview-grid">

                {images.map((img, index) => (
                  <div
                    className="preview-item"
                    key={index}
                  >

                    <img src={img} alt="" />

                    <button
                      onClick={() =>
                        removeImage(index)
                      }
                    >

                      <X size={16} />

                    </button>

                  </div>
                ))}

              </div>
            )}

            {/* ACTION */}
            <button className="generate-btn">

              <Sparkles size={18} />

              Phối đồ ngay

            </button>
            <div className="empty-result">
            <p>
                Hãy chọn phong cách, dịp sử dụng
                và upload trang phục để bắt đầu phối đồ
            </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}