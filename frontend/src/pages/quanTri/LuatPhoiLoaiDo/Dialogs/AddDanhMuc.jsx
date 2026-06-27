import { X } from "lucide-react";

import {
  useState
} from "react";

import axios from "axios";

export default function AddDanhMucDialog({
  open,
  onClose,
  reloadData
}) {

  const [formData,setFormData] =
    useState({

      tenDanhMuc:"",

      phamViSuDung:""
    });

  /* CHANGE */

  const handleChange =
  (name,value)=>{

    setFormData({

      ...formData,

      [name]:value
    });
  };

  /* ADD */

  const handleAdd =
  async()=>{

    if(

      !formData.tenDanhMuc ||

      !formData.phamViSuDung
    ){

      alert(
        "Vui lòng nhập đầy đủ thông tin"
      );

      return;
    }

    try{

      const response =
        await axios.post(

          "http://127.0.0.1:8000/danh-muc/",

          {

            tenDanhMuc:
            formData.tenDanhMuc,

            phamViSuDung:
            formData.phamViSuDung
          }
        );

      if(!response.data.success){

        alert(
          response.data.message
        );

        return;
      }

      alert(
        "Thêm danh mục thành công"
      );

      reloadData();

      onClose();

    }catch(error){

      console.log(error);

      alert(
        "Thêm danh mục thất bại"
      );
    }
  };

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

        {/* CLOSE */}

        <button
          className="dialog-close"
          onClick={onClose}
        >

          <X size={18} />

        </button>

        {/* TITLE */}

        <h2>
          Thêm danh mục
        </h2>

        {/* FORM */}

        <div className="update-form">

          {/* TEN */}

          <div className="update-group">

            <label>
              Tên danh mục
            </label>

            <input
              type="text"

              placeholder=
              "Nhập tên danh mục"

              value={
                formData.tenDanhMuc
              }

              onChange={(e)=>
                handleChange(
                  "tenDanhMuc",
                  e.target.value
                )
              }
            />

          </div>

          {/* PHAM VI */}

          <div className="update-group">

            <label>
              Phạm vi sử dụng
            </label>

            <select

              value={
                formData.phamViSuDung
              }

              onChange={(e)=>
                handleChange(
                  "phamViSuDung",
                  e.target.value
                )
              }
            >

              <option value="">
                Chọn phạm vi sử dụng
              </option>

              <option value="Thân trên">
                Thân trên
              </option>

              <option value="Thân dưới">
                Thân dưới
              </option>

            </select>

          </div>

          {/* BUTTON */}

          <button
            className="save-btn"
            onClick={handleAdd}
          >

            Thêm

          </button>

        </div>

      </div>

    </div>
  );
}