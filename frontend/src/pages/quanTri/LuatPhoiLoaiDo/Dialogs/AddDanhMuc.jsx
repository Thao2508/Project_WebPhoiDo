import { X } from "lucide-react";

export default function AddDanhMucDialog({
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
          Thêm danh mục
        </h2>

        <div className="update-form">

          <div className="update-group">

            <label>
              Tên danh mục
            </label>

            <input
              type="text"
              placeholder="Nhập tên danh mục"
            />

          </div>

          <div className="update-group">

            <label>
              Phạm vi sử dụng
            </label>

            <input
              type="text"
              placeholder="Ví dụ: Thân trên"
            />

          </div>

          <button className="save-btn">

            Thêm danh mục

          </button>

        </div>

      </div>

    </div>
  );
}