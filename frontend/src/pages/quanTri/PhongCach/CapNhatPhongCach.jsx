import "./CapNhatPhongCach.scss";
import Sidebar from "../../../components/SideBar/SideBarAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  X
} from "lucide-react";

export default function CapNhatPhongCach() {

  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [phongCachList, setPhongCachList] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    tenPhongCach: "",
    moTa: ""
  });

  useEffect(() => {

  layDanhSachPhongCach();

  }, []);

  const layDanhSachPhongCach = async () => {

    try {

      const response =
        await axios.get(
          "http://127.0.0.1:8000/phong-cach/"
        );

      setPhongCachList(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  // Mở dialog thêm
  const handleOpenAdd = () => {
    setIsEdit(false);

    setFormData({
      id: null,
      tenPhongCach: "",
      moTa: ""
    });

    setOpenDialog(true);
  };


  const handleOpenEdit = async (id) => {
  try {

    const response =
      await axios.get(
        `http://127.0.0.1:8000/phong-cach/${id}`
      );

    setIsEdit(true);

    setFormData(
      response.data
    );

    setOpenDialog(true);

  } catch (error) {

    console.log(error);
  }
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

  
  const handleSave = async () => {

  if (!formData.tenPhongCach.trim()) {

    alert("Vui lòng nhập tên phong cách");

    return;
  }

  try {

    // UPDATE

    if (isEdit) {

      const response =
        await axios.put(

          `http://127.0.0.1:8000/phong-cach/${formData.maPhongCach}`,

          {

            tenPhongCach:
              formData.tenPhongCach,

            moTa:
              formData.moTa
          }
        );

      if (!response.data.success) {

        alert(
          response.data.message
        );

        return;
      }

      alert(
        "Cập nhật thành công"
      );
    }

    // CREATE

    else {

      const response =
        await axios.post(

          "http://127.0.0.1:8000/phong-cach/",

          {

            tenPhongCach:
              formData.tenPhongCach,

            moTa:
              formData.moTa
          }
        );

      if (!response.data.success) {

        alert(
          response.data.message
        );

        return;
      }

      alert(
        "Thêm thành công"
      );
    }

    setOpenDialog(false);

    layDanhSachPhongCach();

  } catch (error) {

    console.log(error);

    alert("Có lỗi xảy ra");
  }
};

  // // Xóa
  // const handleDelete = (id) => {
  //   const confirmDelete = window.confirm(
  //     "Bạn có chắc muốn xóa phong cách?"
  //   );

  //   if (confirmDelete) {
  //     setPhongCachList(
  //       phongCachList.filter((item) => item.id !== id)
  //     );
  //   }
  // };

  return (
    <div className="phongcach-page">

      <Sidebar />

      <div className="phongcach-content">

        {/* Header */}
        <div className="page-header">

          <div>
            <h1>Quản lý phong cách</h1>
          </div>

          <button
            className="add-btn"
            onClick={handleOpenAdd}
          >
            <Plus size={18} />
            Thêm phong cách
          </button>
        </div>

        {/* Table */}
        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên phong cách</th>
                <th>Mô tả</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>

              {phongCachList.map((item) => (
                <tr key={item.maPhongCach}>

                  <td>{item.maPhongCach}</td>

                  <td>{item.tenPhongCach}</td>

                  <td>{item.moTa}</td>

                  <td>
                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleOpenEdit(item.maPhongCach)
                        }
                      >
                        <Pencil size={18} />
                      </button>

                      {/* <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        <Trash2 size={18} />
                      </button> */}

                    </div>
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
                  ? "Cập nhật phong cách"
                  : "Thêm phong cách"}
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
                <label>Tên phong cách</label>

                <input
                  type="text"
                  name="tenPhongCach"
                  placeholder="Nhập tên phong cách"
                  value={formData.tenPhongCach}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Mô tả</label>

                <textarea
                  rows="4"
                  name="moTa"
                  placeholder="Nhập mô tả..."
                  value={formData.moTa}
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