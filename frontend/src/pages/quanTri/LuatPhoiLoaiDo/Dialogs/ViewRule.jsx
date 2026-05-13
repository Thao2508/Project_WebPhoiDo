import {
  X,
  CheckCircle2,
  XCircle,
  Shirt,
  Sparkles,
  CalendarDays
} from "lucide-react";

export default function ViewRuleDialog({
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
          Chi tiết luật phối
        </h2>

        {/* GRID */}

        <div className="dialog-grid">

          {/* LOAI 1 */}

          <div className="dialog-card">

            <div className="dialog-card-label">

              <Shirt size={16} />

              <span>
                Loại trang phục 1
              </span>

            </div>

            <strong>
              {rule.loai1}
            </strong>

          </div>

          {/* LOAI 2 */}

          <div className="dialog-card">

            <div className="dialog-card-label">

              <Shirt size={16} />

              <span>
                Loại trang phục 2
              </span>

            </div>

            <strong>
              {rule.loai2}
            </strong>

          </div>

          {/* PHONG CACH */}

          <div className="dialog-card">

            <div className="dialog-card-label">

              <Sparkles size={16} />

              <span>
                Phong cách
              </span>

            </div>

            <strong>
              {rule.phongCach}
            </strong>

          </div>

          {/* DIP */}

          <div className="dialog-card">

            <div className="dialog-card-label">

              <CalendarDays size={16} />

              <span>
                Dịp sử dụng
              </span>

            </div>

            <strong>
              {rule.dipSuDung}
            </strong>

          </div>

          {/* STATUS */}

          <div className="dialog-card full-card">

            <div className="dialog-card-label">

              {
                rule.hopLe ? (

                  <CheckCircle2 size={16} />

                ) : (

                  <XCircle size={16} />

                )
              }

              <span>
                Trạng thái
              </span>

            </div>

            <div
              className={
                rule.hopLe
                  ? "status valid"
                  : "status invalid"
              }
            >

              {
                rule.hopLe
                  ? "Hợp lệ"
                  : "Không hợp lệ"
              }

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}