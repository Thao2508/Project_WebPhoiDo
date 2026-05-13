import "./CapNhatDipSD.scss";
import Sidebar from "../../../components/SideBar/SideBarAdmin";
import { useState } from "react";
import {
  Plus,
  Pencil,
  X
} from "lucide-react";

export default function CapNhatDipSD() {

  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [dipSuDungList, setDipSuDungList] = useState([
    {
      id: 1,
      tenDipSuDung: "Đi học"
    },
    {
      id: 2,
      tenDipSuDung: "Đi chơi"
    },
    {
      id: 3,
      tenDipSuDung: "Công sở"
    }
  ]);

  const [formData, setFormData] = useState({
    id: null,
    tenDipSuDung: ""
  });

  // Mở dialog thêm
  const handleOpenAdd = () => {

    setIsEdit(false);

    setFormData({
      id: null,
      tenDipSuDung: ""
    });

    setOpenDialog(true);
  };

  // Mở dialog cập nhật
  const handleOpenEdit = (item) => {

    setIsEdit(true);

    setFormData(item);

    setOpenDialog(true);
  };

  // Đóng dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Nhập dữ liệu
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Lưu
  const handleSave = () => {

    if (!formData.tenDipSuDung.trim()) {
      alert("Vui lòng nhập tên dịp sử dụng");
      return;
    }

    if (isEdit) {

      const updatedList = dipSuDungList.map((item) =>
        item.id === formData.id ? formData : item
      );

      setDipSuDungList(updatedList);

    } else {

      const newItem = {
        ...formData,
        id: Date.now()
      };

      setDipSuDungList([
        ...dipSuDungList,
        newItem
      ]);
    }

    setOpenDialog(false);
  };

  return (
    <div className="dipsudung-page">

      <Sidebar />

      <div className="dipsudung-content">

        {/* Header */}
        <div className="page-header">

          <h1>Quản lý dịp sử dụng</h1>

          <button
            className="add-btn"
            onClick={handleOpenAdd}
          >
            <Plus size={18} />
            Thêm dịp sử dụng
          </button>

        </div>

        {/* Table */}
        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên dịp sử dụng</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>

              {dipSuDungList.map((item) => (

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>{item.tenDipSuDung}</td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleOpenEdit(item)
                      }
                    >
                      <Pencil size={18} />
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Dialog */}
      {openDialog && (

        <div className="dialog-overlay">

          <div className="dialog">

            {/* Header */}
            <div className="dialog-header">

              <h3>
                {isEdit
                  ? "Cập nhật dịp sử dụng"
                  : "Thêm dịp sử dụng"}
              </h3>

              <button
                className="close-btn"
                onClick={handleCloseDialog}
              >
                <X size={20} />
              </button>

            </div>

            {/* Body */}
            <div className="dialog-body">

              <div className="form-group">

                <label>Tên dịp sử dụng</label>

                <input
                  type="text"
                  name="tenDipSuDung"
                  placeholder="Nhập tên dịp sử dụng"
                  value={formData.tenDipSuDung}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* Footer */}
            <div className="dialog-footer">

              <button
                className="cancel-btn"
                onClick={handleCloseDialog}
              >
                Hủy
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                {isEdit ? "Cập nhật" : "Thêm"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}