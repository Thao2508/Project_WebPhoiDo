import {
  X,
  Shirt,
  PersonStanding,
  Sparkles,
  CalendarDays,
  CheckCircle2
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

export default function UpdateRuleDialog({
  open,
  onClose,
  rule,
  reloadData
}) {

  /* DATA */

  const [loais,setLoais] =
    useState([]);

  const [phongCachs,setPhongCachs] =
    useState([]);

  const [dipSuDungs,setDipSuDungs] =
    useState([]);

  /* FORM */

  const [formData,setFormData] =
    useState({

      maLoai_1:"",

      maLoai_2:"",

      maPhongCach:"",

      maDipSD:"",

      hopLe:true
    });

  /* LOAD */

  useEffect(()=>{

    if(rule){

      setFormData({

        maLoai_1:
        rule.maLoai_1,

        maLoai_2:
        rule.maLoai_2,

        maPhongCach:
        rule.maPhongCach,

        maDipSD:
        rule.maDipSD,

        hopLe:
        rule.hopLe
      });
    }

    layLoai();

    layPhongCach();

    layDip();

  },[rule]);

  /* API */

  const layLoai =
  async()=>{

    try{

      const response =
        await axios.get(
          "http://127.0.0.1:8000/loai-trang-phuc/"
        );

      setLoais(
        response.data
      );

    }catch(error){

      console.log(error);
    }
  };

  const layPhongCach =
  async()=>{

    try{

      const response =
        await axios.get(
          "http://127.0.0.1:8000/phong-cach/"
        );

      setPhongCachs(
        response.data
      );

    }catch(error){

      console.log(error);
    }
  };

  const layDip =
  async()=>{

    try{

      const response =
        await axios.get(
          "http://127.0.0.1:8000/dip-su-dung/"
        );

      setDipSuDungs(
        response.data
      );

    }catch(error){

      console.log(error);
    }
  };

  /* FILTER */

  const loaiThanTren =
    loais.filter(item =>

      item.phamViSuDung
      ?.toLowerCase()
      .includes("thân trên")
    );

  const loaiThanDuoi =
    loais.filter(item =>

      item.phamViSuDung
      ?.toLowerCase()
      .includes("thân dưới")
    );

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

      !formData.maLoai_1 ||

      !formData.maLoai_2 ||

      !formData.maPhongCach ||

      !formData.maDipSD
    ){

      alert(
        "Vui lòng nhập đầy đủ thông tin"
      );

      return;
    }

    try{

      const response =
        await axios.put(

          `http://127.0.0.1:8000/luat-phoi-loai/${rule.maLuat}`,

          {

            maLoai_1:
            Number(formData.maLoai_1),

            maLoai_2:
            Number(formData.maLoai_2),

            maPhongCach:
            Number(formData.maPhongCach),

            maDipSD:
            Number(formData.maDipSD),

            hopLe:
            formData.hopLe
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

  if (!open || !rule) return null;

  return (

    <div
      className="dialog-overlay"
      onClick={onClose}
    >

      <div
        className="dialog-box large"
        onClick={(e)=>
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

        <div className="tqtl-form">

          {/* LOẠI 1 */}

          <div className="tqtl-group">

            <label>
              Trang phục thân trên
            </label>

            <div className="tqtl-input">

              <Shirt size={18} />

              <select
                value={formData.maLoai_1}

                onChange={(e)=>
                  handleChange(
                    "maLoai_1",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Chọn trang phục
                </option>

                {
                  loaiThanTren.map(item=>(

                    <option
                      key={item.maLoai}
                      value={item.maLoai}
                    >

                      {item.tenLoai}

                    </option>
                  ))
                }

              </select>

            </div>

          </div>

          {/* LOẠI 2 */}

          <div className="tqtl-group">

            <label>
              Trang phục thân dưới
            </label>

            <div className="tqtl-input">

              <PersonStanding size={18} />

              <select
                value={formData.maLoai_2}

                onChange={(e)=>
                  handleChange(
                    "maLoai_2",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Chọn trang phục
                </option>

                {
                  loaiThanDuoi.map(item=>(

                    <option
                      key={item.maLoai}
                      value={item.maLoai}
                    >

                      {item.tenLoai}

                    </option>
                  ))
                }

              </select>

            </div>

          </div>

          {/* PHONG CÁCH */}

          <div className="tqtl-group">

            <label>
              Phong cách
            </label>

            <div className="tqtl-input">

              <Sparkles size={18} />

              <select
                value={formData.maPhongCach}

                onChange={(e)=>
                  handleChange(
                    "maPhongCach",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Chọn phong cách
                </option>

                {
                  phongCachs.map(item=>(

                    <option
                      key={item.maPhongCach}
                      value={item.maPhongCach}
                    >

                      {item.tenPhongCach}

                    </option>
                  ))
                }

              </select>

            </div>

          </div>

          {/* DỊP */}

          <div className="tqtl-group">

            <label>
              Dịp sử dụng
            </label>

            <div className="tqtl-input">

              <CalendarDays size={18} />

              <select
                value={formData.maDipSD}

                onChange={(e)=>
                  handleChange(
                    "maDipSD",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Chọn dịp sử dụng
                </option>

                {
                  dipSuDungs.map(item=>(

                    <option
                      key={item.maDipSD}
                      value={item.maDipSD}
                    >

                      {item.tenDipSD}

                    </option>
                  ))
                }

              </select>

            </div>

          </div>

          {/* TRẠNG THÁI */}

          <div className="tqtl-group full-width">

            <label>
              Trạng thái
            </label>

            <div className="tqtl-input">

              <CheckCircle2 size={18} />

              <select
                value={String(formData.hopLe)}

                onChange={(e)=>
                  handleChange(
                    "hopLe",
                    e.target.value === "true"
                  )
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

          </div>

          {/* BUTTON */}

          <button
            className="tqtl-submit"
            onClick={handleUpdate}
          >

            Lưu cập nhật

          </button>

        </div>

      </div>

    </div>
  );
}