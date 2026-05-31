import "./QuanLyLuatPhoiLoai.scss";

import SideBarAdmin from "../../../components/SideBar/SideBarAdmin";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Shirt,
  Shapes,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useState , useEffect} from "react";
import axios from "axios";

import ViewRuleDialog from "./Dialogs/ViewRule";
import UpdateRuleDialog from "./Dialogs/UpdateRule";

import AddDanhMucDialog from "./Dialogs/AddDanhMuc";
import UpdateDanhMucDialog from "./Dialogs/UpdateDanhMuc";

import AddLoaiDialog from "./Dialogs/AddLoaiTrangPhuc";
import UpdateLoaiDialog from "./Dialogs/UpdateLoaiTrangPhuc";


export default function QuanLyLuatLoaiDo() {

  /* RULE */

  const [openView, setOpenView] =
    useState(false);

  const [openUpdate, setOpenUpdate] =
    useState(false);

  const [selectedRule, setSelectedRule] =
    useState(null);

  const [rules,setRules] =
  useState([]);

  const [keyword, setKeyword] =
  useState("");

  const [danhMucs,setDanhMucs] =
    useState([]);

  const [loais,setLoais] =
    useState([]);

  /* DANH MUC */

  const [openAddDanhMuc, setOpenAddDanhMuc] =
    useState(false);

  const [openUpdateDanhMuc, setOpenUpdateDanhMuc] =
    useState(false);

  /* LOAI */

  const [openAddLoai, setOpenAddLoai] =
    useState(false);

  const [openUpdateLoai, setOpenUpdateLoai] =
    useState(false);

  const [selectedLoai,setSelectedLoai] =
  useState(null);

  const [selectedDanhMuc,setSelectedDanhMuc] =
  useState(null);

  useEffect(()=>{

    layDanhSachLuat();

    layDanhSachDanhMuc();

    layDanhSachLoai();

  },[]);

  const layDanhSachLuat =
async()=>{

  try{

    const response =
      await axios.get(
        "http://127.0.0.1:8000/luat-phoi-loai/"
      );

        setRules(
          response.data
        );

      }catch(error){

        console.log(error);
      }
    };

    const layDanhSachDanhMuc =
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

    const layDanhSachLoai =
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

    const handleDeleteRule =
    async(id)=>{

      const confirmDelete =
        window.confirm(
          "Bạn có chắc muốn xóa?"
        );

      if(!confirmDelete){
        return;
      }

      try{

        const response =
          await axios.delete(
            `http://127.0.0.1:8000/luat-phoi-loai/${id}`
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

    const filteredRules =
    rules.filter((rule) => {

      const text =
        `
        ${rule.tenLoai1}
        ${rule.tenLoai2}
        ${rule.tenPhongCach}
        ${rule.tenDipSD}
        `
        .toLowerCase();

      return text.includes(
        keyword.toLowerCase()
      );
    });

  return (

    <div className="quanlyluatloai">

      <SideBarAdmin />

      <div className="qll-main">

        {/* HEADER */}

        <div className="qll-header">

          <div>

            <h1>
              Quy tắc phối loại trang phục
            </h1>

          </div>

          <Link
            to="/quantri/themquytacloai"
            className="add-rule-btn"
          >

            <Plus size={18} />

            <span>
              Thêm quy tắc
            </span>

          </Link>

        </div>

        {/* SEARCH */}

        <div className="qll-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={keyword}
            onChange={(e)=>
              setKeyword(e.target.value)
            }
          />

        </div>

        {/* TABLE */}

        <div className="qll-table-box">
          <div className="table-scroll"> 
            <table>

              <thead>

                <tr>

                  <th>Loại 1</th>

                  <th>Loại 2</th>

                  <th>Phong cách</th>

                  <th>Dịp</th>

                  <th>Trạng thái</th>

                  <th>Hành động</th>

                </tr>

              </thead>

              <tbody>

                {
                  filteredRules.map((rule) => (

                    <tr key={rule.maLuat}>

                      <td>{rule.tenLoai1}</td>

                      <td>{rule.tenLoai2}</td>

                      <td>{rule.tenPhongCach}</td>

                      <td>{rule.tenDipSD}</td>

                      <td>

                        {
                          rule.hopLe ? (

                            <div className="status valid">

                              <CheckCircle2 size={15} />

                              <span>
                                Hợp lệ
                              </span>

                            </div>

                          ) : (

                            <div className="status invalid">

                              <XCircle size={15} />

                              <span>
                                Không hợp
                              </span>

                            </div>

                          )
                        }

                      </td>

                      <td>

                        <div className="action-group">

                          <button
                            className="icon-btn view-btn"
                            onClick={() => {

                              setSelectedRule(rule);

                              setOpenView(true);
                            }}
                          >

                            <Eye size={17} />

                          </button>

                          <button
                            className="icon-btn update-btn"
                            onClick={() => {

                              setSelectedRule(rule);

                              setOpenUpdate(true);
                            }}
                          >

                            <Pencil size={17} />

                          </button>

                          <button className="icon-btn delete-btn" onClick={()=>
                            handleDeleteRule(rule.maLuat)}>

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

        {/* GRID */}

        <div className="bottom-grid">

          {/* DANH MUC */}

          <div className="small-table-box">

            <div className="small-header">

              <h2>
                Danh mục
              </h2>

              <button
                className="small-add-btn"
                onClick={() =>
                  setOpenAddDanhMuc(true)
                }
              >

                <Plus size={16} />

              </button>

            </div>
            <div className="small-scroll">
              <table>

                <tbody>

                  {
                    danhMucs.map((item, index) => (

                      <tr key={index}>

                        <td>{item.tenDanhMuc}</td>

                        <td>{item.phamViSuDung}</td>

                        <td>

                          <button
                            className="mini-update-btn"
                            onClick={() => {
                              setSelectedDanhMuc(item);
                              setOpenUpdateDanhMuc(true);
                            }}
                          >

                            <Pencil size={14} />

                          </button>

                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>
            </div>
          </div>

          {/* LOAI */}

          <div className="small-table-box">

            <div className="small-header">

              <h2>
                Loại trang phục
              </h2>

              <button
                className="small-add-btn"
                onClick={() =>
                  setOpenAddLoai(true)
                }
              >

                <Plus size={16} />

              </button>

            </div>

            <div className="small-scroll">
              <table>

                <tbody>

                  {
                    loais.map((item, index) => (

                      <tr key={index}>

                        <td>{item.tenLoai}</td>

                        <td>{item.tenDanhMuc}</td>

                        <td>

                          <button
                            className="mini-update-btn"
                            onClick={() => {
                              setSelectedLoai(item);
                              setOpenUpdateLoai(true);
                            }}
                          >

                            <Pencil size={14} />

                          </button>

                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>
            </div>

          </div>

        </div>

      </div>

      {/* DIALOGS */}

      <ViewRuleDialog
        open={openView}
        onClose={() =>
          setOpenView(false)
        }
        rule={selectedRule}
      />

      <UpdateRuleDialog
        open={openUpdate}

        onClose={() =>
          setOpenUpdate(false)
        }

        rule={selectedRule}

        reloadData={
          layDanhSachLuat
        }
      />

      <AddDanhMucDialog

        open={openAddDanhMuc}

        onClose={() =>
          setOpenAddDanhMuc(false)
        }

        reloadData={
          layDanhSachDanhMuc
        }
      />

      <UpdateDanhMucDialog

        open={openUpdateDanhMuc}

        onClose={() =>
          setOpenUpdateDanhMuc(false)
        }

        danhMuc={selectedDanhMuc}

        reloadData={
          layDanhSachDanhMuc
        }
      />

      <AddLoaiDialog

        open={openAddLoai}

        onClose={() =>
          setOpenAddLoai(false)
        }

        reloadData={
          layDanhSachLoai
        }
      />

      <UpdateLoaiDialog
        open={openUpdateLoai}

        onClose={() =>
          setOpenUpdateLoai(false)
        }

        loai={selectedLoai}

        reloadData={
          layDanhSachLoai
        }
      />

    </div>
  );
}