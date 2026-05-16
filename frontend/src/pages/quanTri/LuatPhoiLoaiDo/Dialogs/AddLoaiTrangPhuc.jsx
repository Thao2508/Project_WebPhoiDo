import { X } from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

export default function AddLoaiDialog({
  open,
  onClose,
  reloadData
}) {

  /* DATA */

  const [danhMucs,setDanhMucs] =
    useState([]);

  /* FORM */

  const [formData,setFormData] =
    useState({

      tenLoai:"",

      maDanhMuc:""
    });

  /* LOAD */

  useEffect(()=>{

    layDanhMuc();

  },[]);

  /* API */

  const layDanhMuc =
  async()=>{

    try{

      const response =
        await axios.get(
          "http://127.0.0.1:8000/danh-muc/"
        );

      setDanhMucs(
        response.data
      );

    }catch(error){

      console.log(error);
    }
  };

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

      !formData.tenLoai ||

      !formData.maDanhMuc
    ){

      alert(
        "Vui lòng nhập đầy đủ thông tin"
      );

      return;
    }

    try{

      const response =
        await axios.post(

          "http://127.0.0.1:8000/loai-trang-phuc/",

          {

            tenLoai:
            formData.tenLoai,

            maDanhMuc:
            Number(formData.maDanhMuc)
          }
        );

      if(!response.data.success){

        alert(
          response.data.message
        );

        return;
      }

      alert(
        "Thêm loại trang phục thành công"
      );

      reloadData();

      onClose();

    }catch(error){

      console.log(error);

      alert(
        "Thêm loại thất bại"
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
          Thêm loại trang phục
        </h2>

        {/* FORM */}

        <div className="update-form">

          {/* TEN */}

          <div className="update-group">

            <label>
              Tên loại
            </label>

            <input
              type="text"

              placeholder=
              "Nhập tên loại"

              value={
                formData.tenLoai
              }

              onChange={(e)=>
                handleChange(
                  "tenLoai",
                  e.target.value
                )
              }
            />

          </div>

          {/* DANH MUC */}

          <div className="update-group">

            <label>
              Danh mục
            </label>

            <select

              value={
                formData.maDanhMuc
              }

              onChange={(e)=>
                handleChange(
                  "maDanhMuc",
                  e.target.value
                )
              }
            >

              <option value="">
                Chọn danh mục
              </option>

              {
                danhMucs.map(item=>(

                  <option
                    key={item.maDanhMuc}
                    value={item.maDanhMuc}
                  >

                    {item.tenDanhMuc}

                  </option>
                ))
              }

            </select>

          </div>

          {/* BUTTON */}

          <button
            className="save-btn"
            onClick={handleAdd}
          >

            Thêm loại trang phục

          </button>

        </div>

      </div>

    </div>
  );
}