import { X } from "lucide-react";

export default function UpdateRuleDialog({
  open,
  onClose,
  rule,
}) {

  if (!open || !rule) return null;

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

        {/* CLOSE */}

        <button
          className="dialog-close"
          onClick={onClose}
        >

          <X size={18} />

        </button>

        {/* TITLE */}

        <h2>
          Cập nhật luật phối
        </h2>

        {/* FORM */}

        <div className="update-form">

          {/* LOAI 1 */}

          <div className="update-group">

            <label>
              Loại trang phục 1
            </label>

            <select defaultValue={rule.loai1}>

              <option>
                Áo thun
              </option>

              <option>
                Áo sơ mi
              </option>

              <option>
                Hoodie
              </option>

            </select>

          </div>

          {/* LOAI 2 */}

          <div className="update-group">

            <label>
              Loại trang phục 2
            </label>

            <select defaultValue={rule.loai2}>

              <option>
                Quần jean
              </option>

              <option>
                Quần short
              </option>

              <option>
                Quần tây
              </option>

            </select>

          </div>

          {/* PHONG CACH */}

          <div className="update-group">

            <label>
              Phong cách
            </label>

            <select defaultValue={rule.phongCach}>

              <option>
                Casual
              </option>

              <option>
                Formal
              </option>

              <option>
                Streetwear
              </option>

            </select>

          </div>

          {/* DIP */}

          <div className="update-group">

            <label>
              Dịp sử dụng
            </label>

            <select defaultValue={rule.dipSuDung}>

              <option>
                Đi làm
              </option>

              <option>
                Đi chơi
              </option>

              <option>
                Dạo phố
              </option>

            </select>

          </div>

          {/* HOPLE */}

          <div className="update-group">

            <label>
              Trạng thái
            </label>

            <select
              defaultValue={
                rule.hopLe
                  ? "true"
                  : "false"
              }
            >

              <option value="true">
                Hợp lệ
              </option>

              <option value="false">
                Không hợp lệ
              </option>

            </select>

          </div>

          {/* BUTTON */}

          <button className="save-btn">

            Lưu cập nhật

          </button>

        </div>

      </div>

    </div>
  );
}