import "./ThemQuyTacMau.scss";

import SideBarAdmin from "../../../components/SideBar/SideBarAdmin";

import Select from "react-select";

import {
  ArrowLeft,
  Sparkles,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

export default function ThemQuyTacMau() {

  const navigate = useNavigate();

  // DATA

  const [mauOptions,setMauOptions] = useState([]);

  const [phongCachs,setPhongCachs] = useState([]);

  const [dipSuDungs,setDipSuDungs] = useState([]);

  // FORM

  const [formData,setFormData] = useState({

    maMau_1:"",
    maMau_2:"",
    maPhongCach:"",
    maDipSD:"",
    hopLe:true
  });

  // LOAD DATA

  useEffect(()=>{

    layDanhSachMau();

    layDanhSachPhongCach();

    layDanhSachDipSD();

  },[]);

  // API MAU

  const layDanhSachMau = async()=>{

    try{

      const response = await axios.get(
        "http://127.0.0.1:8000/mau/"
      );

      const data = response.data.map(item=>({

        value:item.maMau,

        label:item.tenMau,

        hex:item.maMauHex
      }));

      setMauOptions(data);

    }catch(error){

      console.log(error);
    }
  };

  // API PHONG CACH

  const layDanhSachPhongCach = async()=>{

    try{

      const response = await axios.get(
        "http://127.0.0.1:8000/phong-cach/"
      );

      setPhongCachs(response.data);

    }catch(error){

      console.log(error);
    }
  };

  // API DIP SU DUNG

  const layDanhSachDipSD = async()=>{

    try{

      const response = await axios.get(
        "http://127.0.0.1:8000/dip-su-dung/"
      );

      setDipSuDungs(response.data);

    }catch(error){

      console.log(error);
    }
  };

  // FORMAT MAU

  const formatColorOption = (option)=>(

    <div className="color-option">

      <div
        className="color-preview"
        style={{
          background:option.hex
        }}
      ></div>

      <span>
        {option.label}
      </span>

    </div>
  );

  // HANDLE CHANGE

  const handleChange = (field,value)=>{

    setFormData(prev=>({

      ...prev,

      [field]:value
    }));
  };

  // SUBMIT

  const handleSubmit = async()=>{

    if(
      !formData.maMau_1 ||
      !formData.maMau_2 ||
      !formData.maPhongCach ||
      !formData.maDipSD
    ){

      alert(
        "Vui lòng nhập đầy đủ thông tin"
      );

      return;
    }

    try{

      const response = await axios.post(

        "http://127.0.0.1:8000/luat-phoi-mau/",

        formData
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
        "/quantri/luatphoimau"
      );

    }catch(error){

      console.log(error);

      alert(
        "Thêm thất bại"
      );
    }
  };

  return (

    <div className="themquytacmau">

      {/* SIDEBAR */}

      <SideBarAdmin />

      {/* MAIN */}

      <div className="tqtm-main">

        {/* HEADER */}

        <div className="tqtm-header">

          <div className="tqtm-title-row">

            {/* BACK */}

            <Link
              to="/quantri/luatphoimau"
              className="back-btn"
            >

              <ArrowLeft size={20} />

            </Link>

            {/* TITLE */}

            <div>

              <h1>
                Thêm quy tắc phối màu
              </h1>

            </div>

          </div>

        </div>

        {/* FORM */}

        <div className="tqtm-wrapper">

          <div className="tqtm-form-box">

            <div className="tqtm-form">

              {/* MAU 1 */}

              <div className="tqtm-group">

                <label>
                  Màu thứ nhất
                </label>

                <Select

                  options={mauOptions}

                  placeholder="Tìm màu..."

                  formatOptionLabel={
                    formatColorOption
                  }

                  value={
                    mauOptions.find(
                      item=>
                      item.value
                      ===
                      formData.maMau_1
                    )
                  }

                  onChange={(selected)=>

                    handleChange(
                      "maMau_1",
                      selected.value
                    )
                  }

                  className="react-select-container"

                  classNamePrefix="react-select"
                />

              </div>

              {/* MAU 2 */}

              <div className="tqtm-group">

                <label>
                  Màu thứ hai
                </label>

                <Select

                  options={mauOptions}

                  placeholder="Tìm màu..."

                  formatOptionLabel={
                    formatColorOption
                  }

                  value={
                    mauOptions.find(
                      item=>
                      item.value
                      ===
                      formData.maMau_2
                    )
                  }

                  onChange={(selected)=>

                    handleChange(
                      "maMau_2",
                      selected.value
                    )
                  }

                  className="react-select-container"

                  classNamePrefix="react-select"
                />

              </div>

              {/* PHONG CACH */}

              <div className="tqtm-group">

                <label>
                  Phong cách
                </label>

                <div className="tqtm-input">

                  <Sparkles size={18} />

                  <select

                    value={
                      formData.maPhongCach
                    }

                    onChange={(e)=>

                      handleChange(

                        "maPhongCach",

                        Number(
                          e.target.value
                        )
                      )
                    }
                  >

                    <option value="">
                      Chọn phong cách
                    </option>

                    {
                      phongCachs.map(item=>(

                        <option
                          key={
                            item.maPhongCach
                          }

                          value={
                            item.maPhongCach
                          }
                        >

                          {item.tenPhongCach}

                        </option>
                      ))
                    }

                  </select>

                </div>

              </div>

              {/* DIP */}

              <div className="tqtm-group">

                <label>
                  Dịp sử dụng
                </label>

                <div className="tqtm-input">

                  <CalendarDays size={18} />

                  <select

                    value={
                      formData.maDipSD
                    }

                    onChange={(e)=>

                      handleChange(

                        "maDipSD",

                        Number(
                          e.target.value
                        )
                      )
                    }
                  >

                    <option value="">
                      Chọn dịp sử dụng
                    </option>

                    {
                      dipSuDungs.map(item=>(

                        <option
                          key={
                            item.maDipSD
                          }

                          value={
                            item.maDipSD
                          }
                        >

                          {item.tenDipSD}

                        </option>
                      ))
                    }

                  </select>

                </div>

              </div>

              {/* STATUS */}

              <div className="tqtm-group full-width">

                <label>
                  Trạng thái
                </label>

                <div className="tqtm-input">

                  <CheckCircle2 size={18} />

                  <select

                    value={String(
                      formData.hopLe
                    )}

                    onChange={(e)=>

                      handleChange(

                        "hopLe",

                        e.target.value
                        ===
                        "true"
                      )
                    }
                  >

                    <option value="true">
                      Hợp lệ
                    </option>

                    <option value="false">
                      Không hợp
                    </option>

                  </select>

                </div>

              </div>

              {/* BUTTON */}

              <button
                className="tqtm-submit"
                onClick={handleSubmit}
              >

                Thêm quy tắc

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}