import "./QuanLyLuatPhoiMau.scss";
import SideBarAdmin from "../../../components/SideBar/SideBarAdmin";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Palette,
  X
} from "lucide-react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function QuanLyLuatPhoiMau() {

  const [openAddColor, setOpenAddColor] =
    useState(false);

  const [colors, setColors] =
  useState([]);

  const [phongCachs, setPhongCachs] =
  useState([]);

  const [dipSuDungs, setDipSuDungs] =
  useState([]);

  const [rules, setRules] =
  useState([]);

  const [tenMau, setTenMau] =
  useState("");

  const [maHex, setMaHex] =
  useState("");

  const [openUpdateRule,setOpenUpdateRule]=useState(false);

  const [selectedRule,setSelectedRule]=useState(null);

  const [updateData,setUpdateData]=useState({
    maMau_1:"",
    maMau_2:"",
    maPhongCach:"",
    maDipSD:"",
    hopLe:true
  });

  useEffect(() => {
    layDanhSachMau();
    layDanhSachLuat();
    layDanhSachPhongCach();
    layDanhSachDipSD();
  }, []);

  const layDanhSachMau =
  async () => {

    try {

      const response =
        await axios.get(
          "http://127.0.0.1:8000/mau/"
        );

      setColors(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  const layDanhSachPhongCach =
  async () => {

  try {

    const response =
      await axios.get(
        "http://127.0.0.1:8000/phong-cach/"
      );

    setPhongCachs(
      response.data
    );

  } catch (error) {

    console.log(error);
  }
};

  const layDanhSachDipSD =
  async () => {

    try {

      const response =
        await axios.get(
          "http://127.0.0.1:8000/dip-su-dung/"
        );

      setDipSuDungs(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  const layDanhSachLuat =
  async () => {

    try {

      const response =
        await axios.get(
          "http://127.0.0.1:8000/luat-phoi-mau/"
        );

      setRules(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  const handleThemMau =
  async () => {

    try {

      const response =
        await axios.post(

          "http://127.0.0.1:8000/mau/",

          {

            tenMau:
              tenMau,

            maMauHex:
              maHex
          }
        );

      // FAIL

      if (
        !response.data.success
      ) {

        alert(
          response.data.message
        );

        return;
      }

      alert(
        "Thêm màu thành công"
      );

      setOpenAddColor(false);

      setTenMau("");

      setMaHex("");

      layDanhSachMau();

    } catch (error) {

      console.log(error);
    }
  };

  const openUpdateDialog = (rule) => {

    setSelectedRule(rule);

    setUpdateData({

      maMau_1: rule.maMau_1,

      maMau_2: rule.maMau_2,

      maPhongCach: rule.maPhongCach,

      maDipSD: rule.maDipSD,

      hopLe: rule.hopLe
    });

    setOpenUpdateRule(true);
  };


  const closeUpdateDialog=()=>{

    setOpenUpdateRule(false);

    setSelectedRule(null);

    setUpdateData({
      maMau_1:"",
      maMau_2:"",
      maPhongCach:"",
      maDipSD:"",
      hopLe:true
    });
  };

    const handleChange=(field,value)=>{

      setUpdateData(prev=>({
        ...prev,
        [field]: field === "hopLe"? value: Number(value)
      }));
    };


  const handleUpdateRule=async()=>{

    try{

      const payload={
        maMau_1:Number(updateData.maMau_1),
        maMau_2:Number(updateData.maMau_2),
        maPhongCach:Number(updateData.maPhongCach),
        maDipSD:Number(updateData.maDipSD),
        hopLe:updateData.hopLe
      };

      const response=await axios.put(
        `http://127.0.0.1:8000/luat-phoi-mau/${selectedRule.maLuatMau}`,
        payload
      );

      if(!response.data.success){
        alert(response.data.message);
        return;
      }

      alert("Cập nhật thành công");

      closeUpdateDialog();

      layDanhSachLuat();

    }catch(error){

      console.log(error);

      alert("Cập nhật thất bại");
    }
  };

  const handleDeleteRule = async(id)=>{

  const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa?"
    );

    if(!confirmDelete){
      return;
    }

    try{

      const response = await axios.delete(
        `http://127.0.0.1:8000/luat-phoi-mau/${id}`
      );

      if(!response.data.success){

        alert("Xóa thất bại");

        return;
      }

      alert("Xóa thành công");

      layDanhSachLuat();

    }catch(error){

      console.log(error);

      alert("Xóa thất bại");
    }
  };


  return (

    <div className="ql-luatmau">

      {/* SIDEBAR */}

      <SideBarAdmin />

      {/* MAIN */}

      <div className="qlm-main">

        {/* HEADER */}

        <div className="qlm-header">

          <div>

            <h1>
              Quản lý quy tắc phối màu
            </h1>
          </div>

        </div>

        {/* COLOR SECTION */}

        <div className="color-section">

          {/* TOP */}

          <div className="color-top">

            <h2>
              Màu sắc hệ thống
            </h2>

            <button
              className="add-color-btn"
              onClick={() =>
                setOpenAddColor(true)
              }
            >

              <Palette size={17} />

              <span>
                Thêm màu
              </span>

            </button>

          </div>

          {/* COLOR TABLE */}

            <div className="color-table-box">

            <div className="table-scroll"> 

            <table>

                <thead>

                <tr>

                    <th>Màu</th>

                    <th>Tên màu</th>

                    <th>Mã HEX</th>

                </tr>

                </thead>

                <tbody>

                {
                    colors.map((color) => (

                    <tr key={color.maMau}>

                        {/* PREVIEW */}

                        <td>

                        <div
                            className="table-preview-color"
                            style={{
                            background: color.maMauHex
                            }}
                        ></div>

                        </td>

                        {/* NAME */}

                        <td>

                        {color.tenMau}

                        </td>

                        {/* HEX */}

                        <td>

                        <span className="hex-code">

                            {color.maMauHex}

                        </span>

                        </td>

                    </tr>

                    ))
                }

                </tbody>

            </table>
            </div>

            </div>

        </div>

        {/* SEARCH */}

        <div className="qlm-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Tìm kiếm luật phối màu..."
          />

        </div>

        <div className="rule-top">

        <h2>
            Danh sách quy tắc phối màu
        </h2>

        <Link
        to="/quantri/themluatmau"
        className="add-rule-btn"
        >

        <Plus size={18} />

        <span>
            Thêm quy tắc
        </span>

        </Link>

        </div>
        {/* TABLE */}

        <div className="qlm-table-box">
          <div className="table-scroll"> 

          <table>

            <thead>

              <tr>

                <th>Màu 1</th>

                <th>Màu 2</th>

                <th>Phong cách</th>

                <th>Dịp sử dụng</th>

                <th>Trạng thái</th>

                <th>Hành động</th>

              </tr>

            </thead>

            <tbody>

              {
                rules.map((rule) => (

                  <tr key={rule.maLuatMau}>

                    {/* MAU 1 */}

                    <td>

                      <div className="table-color">

                        <div className="color-dot"
                            style={{background: rule.maMauHex1 || "#ccc"}}>
                        </div>

                        <span>
                          {rule.tenMau1}
                        </span>

                      </div>

                    </td>

                    {/* MAU 2 */}

                    <td>

                      <div className="table-color">

                        <div className="color-dot" 
                        style={{ background: rule.maMauHex2 || "#ccc"}}>
                        </div>

                        <span>
                          {rule.tenMau2}
                        </span>

                      </div>

                    </td>

                    {/* STYLE */}

                    <td>

                      <span className="style-tag">

                        {rule.tenPhongCach}

                      </span>

                    </td>

                    {/* DIP */}

                    <td>

                      {rule.tenDipSD}

                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={
                          rule.hopLe

                          ? "status active"

                          : "status invalid"
                        }
                      >

                        {
                          rule.hopLe

                          ? "Hợp lệ"

                          : "Không hợp"
                        }

                      </span>

                    </td>

                    {/* ACTION */}

                    <td>

                      <div className="action-group">

                        {/* UPDATE */}

                        <button
                          className="icon-btn update-btn"

                          onClick={() =>
                            openUpdateDialog(rule)
                          }
                        >

                          <Pencil size={17} />

                        </button>

                        {/* DELETE */}

                        <button
                          className="icon-btn delete-btn"

                          onClick={()=>
                            handleDeleteRule(rule.maLuatMau)
                          }
                        >

                          <Trash2 size={17} />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>
          </div>

        </div>

      </div>

      {/* ADD COLOR DIALOG */}

      {
        openAddColor && (

          <div
            className="dialog-overlay"
            onClick={() =>
              setOpenAddColor(false)
            }
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
                onClick={() =>
                  setOpenAddColor(false)
                }
              >

                <X size={18} />

              </button>

              <h2>
                Thêm màu sắc
              </h2>

              <div className="dialog-form">

                {/* TEN MAU */}

                <div className="dialog-group">

                  <label>
                    Tên màu
                  </label>

                  <input
                    type="text"
                    placeholder="Ví dụ: Xanh pastel"

                    value={tenMau}

                    onChange={(e) =>
                      setTenMau(
                        e.target.value
                      )
                    }
                  />

                </div>

                {/* HEX */}

                <div className="dialog-group">

                  <label>
                    Mã HEX
                  </label>

                  <input
                    type="text"
                    placeholder="#A5B4FC"

                    value={maHex}

                    onChange={(e) =>
                      setMaHex(
                        e.target.value
                      )
                    }
                  />

                </div>

                {/* BUTTON */}

                <button
                  className="save-btn"
                  onClick={handleThemMau}>
                  Thêm màu
                </button>

              </div>

            </div>

          </div>

        )
      }

      {
      openUpdateRule && selectedRule && (

      <div
        className="dialog-overlay"
        onClick={closeUpdateDialog}
      >

        <div
          className="dialog-box update-rule-dialog"
          onClick={(e)=>e.stopPropagation()}
        >

          {/* CLOSE */}

          <button
            className="dialog-close"
            onClick={closeUpdateDialog}
          >

            <X size={18}/>

          </button>

          <h2>
            Cập nhật quy tắc phối màu
          </h2>

          <div className="dialog-form">

            {/* MAU 1 */}

            <div className="dialog-group">

              <label>
                Màu thứ nhất
              </label>

              <select
                value={updateData.maMau_1}

                onChange={(e)=>
                  handleChange(
                    "maMau_1",
                    e.target.value
                  )
                }
              >

                {
                  colors.map(item=>(

                    <option
                      key={item.maMau}
                      value={item.maMau}
                    >

                      {item.tenMau}

                    </option>
                  ))
                }

              </select>

            </div>

            {/* MAU 2 */}

            <div className="dialog-group">

              <label>
                Màu thứ hai
              </label>

              <select
                value={updateData.maMau_2}

                onChange={(e)=>
                  handleChange(
                    "maMau_2",
                    e.target.value
                  )
                }
              >

                {
                  colors.map(item=>(

                    <option
                      key={item.maMau}
                      value={item.maMau}
                    >

                      {item.tenMau}

                    </option>
                  ))
                }

              </select>

            </div>

            {/* PHONG CACH */}

            <div className="dialog-group">

              <label>
                Phong cách
              </label>

              <select
                value={updateData.maPhongCach}

                onChange={(e)=>
                  handleChange(
                    "maPhongCach",
                    e.target.value
                  )
                }
              >

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

            {/* DIP */}

            <div className="dialog-group">

              <label>
                Dịp sử dụng
              </label>

              <select
                value={updateData.maDipSD}

                onChange={(e)=>
                  handleChange(
                    "maDipSD",
                    e.target.value
                  )
                }
              >

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

            {/* STATUS */}

            <div className="dialog-group">

              <label>
                Trạng thái
              </label>

              <select
                value={String(updateData.hopLe)}

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
                  Không hợp
                </option>

              </select>

            </div>

            {/* BUTTON */}

            <button
              className="save-btn"
              onClick={handleUpdateRule}
            >

              Cập nhật quy tắc

            </button>

          </div>

        </div>

      </div>
      )}
    
    </div>
  );
}