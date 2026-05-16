import "./CapNhatDipSD.scss";
import Sidebar from "../../../components/SideBar/SideBarAdmin";
import { useState,useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  X
} from "lucide-react";

export default function CapNhatDipSD() {

  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [dipSuDungList,setDipSuDungList]=useState([]);

  const [formData, setFormData] = useState({
    maDipSD: null,
    tenDipSD: ""
  });

  useEffect(()=>{

  layDanhSachDipSD();

  },[]);
  const layDanhSachDipSD=async()=>{

    try{

      const response=
      await axios.get(
        "http://127.0.0.1:8000/dip-su-dung/"
      );

      setDipSuDungList(
        response.data.data || response.data
      );

    }catch(error){

      console.log(error);
    }
  };

  // Mở dialog thêm
  const handleOpenAdd = () => {

    setIsEdit(false);

    setFormData({
      maDipSD: null,
      tenDipSD: ""
    });

    setOpenDialog(true);
  };

  // Mở dialog cập nhật
  const handleOpenEdit=async(id)=>{

  try{

    const response=
    await axios.get(
      `http://127.0.0.1:8000/dip-su-dung/${id}`
    );

    setIsEdit(true);

    setFormData(
      response.data.data || response.data
    );

    setOpenDialog(true);

  }catch(error){

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

  // Lưu
  const handleSave=async()=>{

  if(!formData.tenDipSD.trim()){

    alert("Vui lòng nhập tên dịp sử dụng");

    return;
  }

  try{

    // UPDATE

    if(isEdit){

      const response=
      await axios.put(

        `http://127.0.0.1:8000/dip-su-dung/${formData.maDipSD}`,

        {
          tenDipSD:
          formData.tenDipSD
        }
      );

      if(!response.data.success){

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

    else{

      const response=
      await axios.post(

        "http://127.0.0.1:8000/dip-su-dung/",

        {
          tenDipSD:
          formData.tenDipSD
        }
      );

      if(!response.data.success){

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

    layDanhSachDipSD();

  }catch(error){

    console.log(error);

    alert("Có lỗi xảy ra");
  }
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

                <tr key={item.maDipSD}>

                  <td>{item.maDipSD}</td>

                  <td>{item.tenDipSD}</td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleOpenEdit(item.maDipSD)
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
                  name="tenDipSD"
                  placeholder="Nhập tên dịp sử dụng"
                  value={formData.tenDipSD}
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