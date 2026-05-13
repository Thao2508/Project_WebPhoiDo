import "./QuanLyLuatLoaiDo.scss";

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

import { useState } from "react";

import ViewRuleDialog from "./Dialogs/ViewRule";
import UpdateRuleDialog from "./Dialogs/UpdateRule";

import AddDanhMucDialog from "./Dialogs/AddDanhMuc";
import UpdateDanhMucDialog from "./Dialogs/UpdateDanhMuc";

import AddLoaiDialog from "./Dialogs/AddLoaiTrangPhuc";
import UpdateLoaiDialog from "./Dialogs/UpdateLoaiTrangPhuc";

/* DATA */

const RULES = [
  {
    id: 1,
    loai1: "Áo thun",
    loai2: "Quần jean",
    phongCach: "Casual",
    dipSuDung: "Đi chơi",
    hopLe: true,
  },
];

const DANH_MUCS = [
  {
    ten: "Áo",
    phamVi: "Thân trên",
  },
];

const LOAIS = [
  {
    ten: "Áo thun",
    danhMuc: "Áo",
  },
];

export default function QuanLyLuatLoaiDo() {

  /* RULE */

  const [openView, setOpenView] =
    useState(false);

  const [openUpdate, setOpenUpdate] =
    useState(false);

  const [selectedRule, setSelectedRule] =
    useState(null);

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
          />

        </div>

        {/* TABLE */}

        <div className="qll-table-box">

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
                RULES.map((rule) => (

                  <tr key={rule.id}>

                    <td>{rule.loai1}</td>

                    <td>{rule.loai2}</td>

                    <td>{rule.phongCach}</td>

                    <td>{rule.dipSuDung}</td>

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

                        <button className="icon-btn delete-btn">

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

            <table>

              <tbody>

                {
                  DANH_MUCS.map((item, index) => (

                    <tr key={index}>

                      <td>{item.ten}</td>

                      <td>{item.phamVi}</td>

                      <td>

                        <button
                          className="mini-update-btn"
                          onClick={() =>
                            setOpenUpdateDanhMuc(true)
                          }
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

            <table>

              <tbody>

                {
                  LOAIS.map((item, index) => (

                    <tr key={index}>

                      <td>{item.ten}</td>

                      <td>{item.danhMuc}</td>

                      <td>

                        <button
                          className="mini-update-btn"
                          onClick={() =>
                            setOpenUpdateLoai(true)
                          }
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
      />

      <AddDanhMucDialog
        open={openAddDanhMuc}
        onClose={() =>
          setOpenAddDanhMuc(false)
        }
      />

      <UpdateDanhMucDialog
        open={openUpdateDanhMuc}
        onClose={() =>
          setOpenUpdateDanhMuc(false)
        }
      />

      <AddLoaiDialog
        open={openAddLoai}
        onClose={() =>
          setOpenAddLoai(false)
        }
      />

      <UpdateLoaiDialog
        open={openUpdateLoai}
        onClose={() =>
          setOpenUpdateLoai(false)
        }
      />

    </div>
  );
}