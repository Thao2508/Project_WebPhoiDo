import { X } from "lucide-react";

export default function UpdateLoaiDialog({
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
          Cập nhật loại trang phục
        </h2>

        <div className="update-form">

          <div className="update-group">

            <label>
              Tên loại
            </label>

            <input
              type="text"
              defaultValue="Áo thun"
            />

          </div>

          <div className="update-group">

            <label>
              Danh mục
            </label>

            <select defaultValue="Áo">

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

            Lưu cập nhật

          </button>

        </div>

      </div>

    </div>
  );
}