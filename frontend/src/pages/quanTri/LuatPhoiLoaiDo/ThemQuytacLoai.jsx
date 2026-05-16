import "./ThemQuyTacLoai.scss";

import SideBarAdmin from "../../../components/SideBar/SideBarAdmin";

import {
  ArrowLeft,
  Shirt,
  Sparkles,
  CalendarDays,
  CheckCircle2,
  PersonStanding
} from "lucide-react";

import { Link,useNavigate } from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

export default function ThemQuyTacLoai() {

  const navigate = useNavigate();

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

  /* LOAD */

  useEffect(()=>{

    layLoai();

    layPhongCach();

    layDipSuDung();

  },[]);

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

  const layDipSuDung =
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

  /* CHANGE */

  const handleChange = (name,value)=>{

    setFormData({

      ...formData,

      [name]:value
    });
  };

  /* SUBMIT */

  const handleSubmit =
  async()=>{

    try{

      const response =
        await axios.post(

          "http://127.0.0.1:8000/luat-phoi-loai/",

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
        "Thêm quy tắc thành công"
      );

      navigate(
        "/quantri/luatphoiloai"
      );

    }catch(error){

      console.log(error);

      alert(
        "Thêm thất bại"
      );
    }
  };

  return (

    <div className="themquytacloai">

      <SideBarAdmin />

      <div className="tqtl-main">

        {/* HEADER */}

        <div className="tqtl-header">

          <div className="tqtl-title-row">

            <Link
              to="/quantri/luatphoiloai"
              className="back-btn"
            >

              <ArrowLeft size={20} />

            </Link>

            <div>

              <h1>
                Thêm quy tắc phối loại đồ
              </h1>

            </div>

          </div>

        </div>

        {/* FORM */}

        <div className="tqtl-wrapper">

          <div className="tqtl-form-box">

            <div className="tqtl-form">

              {/* LOAI 1 */}

              <div className="tqtl-group">

                <label>
                  Loại trang phục (thân trên)
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
                      Chọn loại
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

              {/* LOAI 2 */}

              <div className="tqtl-group">

                <label>
                  Loại trang phục (thân dưới)
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
                      Chọn loại
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

              {/* PHONG CACH */}

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

              {/* DIP */}

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

              {/* STATUS */}

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
                        e.target.value==="true"
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
                onClick={handleSubmit}
              >

                Thêm

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}