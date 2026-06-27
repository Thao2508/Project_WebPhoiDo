import { X } from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

export default function UpdateDanhMucDialog({

  open,

  onClose,

  danhMuc,

  reloadData
}) {

  /* FORM */

  const [formData,setFormData] =
    useState({

      tenDanhMuc:"",

      phamViSuDung:""
    });

  /* LOAD */

  useEffect(()=>{

    if(danhMuc){

      setFormData({

        tenDanhMuc:
        danhMuc.tenDanhMuc,

        phamViSuDung:
        danhMuc.phamViSuDung
      });
    }

  },[danhMuc]);

  /* CHANGE */

  const handleChange =
  (name,value)=>{

    setFormData({

      ...formData,

      [name]:value
    });
  };

  /* UPDATE */

  const handleUpdate =
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
        await axios.put(

          `http://127.0.0.1:8000/danh-muc/${danhMuc.maDanhMuc}`,

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
        "Cập nhật thành công"
      );

      reloadData();

      onClose();

    }catch(error){

      console.log(error);

      alert(
        "Cập nhật thất bại"
      );
    }
  };

  if (!open || !danhMuc) return null;

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
          Cập nhật danh mục
        </h2>

        {/* FORM */}

        <div className="update-form">

          {/* TÊN */}

          <div className="update-group">

            <label>
              Tên danh mục
            </label>

            <input
              type="text"

              value={formData.tenDanhMuc}

              onChange={(e)=>
                handleChange(
                  "tenDanhMuc",
                  e.target.value
                )
              }
            />

          </div>

          {/* PHẠM VI */}

          <div className="update-group">

            <label>
              Phạm vi sử dụng
            </label>

            <select

              value={formData.phamViSuDung}

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
            onClick={handleUpdate}
          >

            Lưu

          </button>

        </div>

      </div>

    </div>
  );
}