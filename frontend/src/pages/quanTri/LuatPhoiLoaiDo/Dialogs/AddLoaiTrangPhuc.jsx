import { X } from "lucide-react";

export default function AddLoaiDialog({
  open,
  onClose,
}) {

  if (!open) return null;

  return (

    <div
      className="dialog-overlay"
      onClick={onClose}
    >

      <div
        className="dialog-box"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <button
          className="dialog-close"
          onClick={onClose}
        >

          <X size={18} />

        </button>

        <h2>
          Thêm loại trang phục
        </h2>

        <div className="update-form">

          <div className="update-group">

            <label>
              Tên loại
            </label>

            <input
              type="text"
              placeholder="Nhập tên loại"
            />

          </div>

          <div className="update-group">

            <label>
              Danh mục
            </label>

            <select>

              <option>
                Áo
              </option>

              <option>
                Quần
              </option>

              <option>
                Giày
              </option>

            </select>

          </div>

          <button className="save-btn">

            Thêm loại trang phục

          </button>

        </div>

      </div>

    </div>
  );
}