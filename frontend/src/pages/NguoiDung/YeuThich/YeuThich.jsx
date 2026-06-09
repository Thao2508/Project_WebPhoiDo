import "./YeuThich.scss";
import Sidebar from "../../../components/SideBar/SideBar";

import {
  Heart,
  Search,
} from "lucide-react";

import { useState, useEffect } from "react";
import axios from "axios";

export default function YeuThich() {

  const [favorites, setFavorites] =
  useState([]);

  const handleRemoveFavorite = async (outfit) => {

    try {

      const maNguoiDung =
        localStorage.getItem(
          "maNguoiDung"
        );

      await axios.delete(

        "http://localhost:8000/yeu-thich/xoa",

        {

          data: {

            maNguoiDung,

            outfit:
              outfit.outfit
          }
        }
      );

      fetchFavorites();

    } catch (err) {

      console.log(err);
    }
  };

  const fetchFavorites = async () => {

    try {

      const maNguoiDung =
        localStorage.getItem(
          "maNguoiDung"
        );

      const res = await axios.get(

        `http://localhost:8000/yeu-thich/user/${maNguoiDung}`
      );

      setFavorites(
        res.data || []
      );

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    fetchFavorites();

  }, []);

  return (

    <div className="yeuthich">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="yeuthich-main">

        {/* HEADER */}

        <div className="yt-header">

          <div>

            <h1>Yêu thích</h1>

          </div>

        </div>

        {/* SEARCH */}

        <div className="yt-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Tìm outfit yêu thích..."
          />

        </div>

        {/* GRID */}
        <div className="yt-grid">

          {favorites.map((item) => (

            <div
              className="yt-card"
              key={item.maBoPhoi}
            >

              {/* HEART */}

              <button
                className="yt-heart active"
                onClick={() =>
                  handleRemoveFavorite(item)
                }
              >

                <Heart
                  size={18}
                  fill="currentColor"
                />

              </button>

              {/* OUTFIT */}

              <div className="yt-outfit-vertical">

                {/* ÁO */}

                {item?.outfit?.ao && (

                  <div className="yt-cloth">

                    <img
                      src={
                        item.outfit.ao.hinhAnh
                      }
                      alt=""
                    />
                  </div>
                )}

                {/* QUẦN */}

                {item?.outfit?.quan && (

                  <div className="yt-cloth">

                    <img
                      src={
                        item.outfit.quan.hinhAnh
                      }
                      alt=""
                    />
                  </div>
                )}

              </div>

              {/* INFO */}

              <div className="yt-info">

                <span className="yt-tag">

                  {
                  item.tenPhongCach
                  }

                  {" • "}

                  {
                  item.tenDipSuDung
                  }

                </span>

              </div>

            </div>
          ))}

        </div>


        {/* EMPTY */}

        {
          favorites.length === 0 && (

            <div className="yt-empty">

              <Heart size={52} />

              <h2>
                Chưa có outfit yêu thích
              </h2>

              <p>
                Hãy lưu outfit bạn thích để xem lại sau.
              </p>

            </div>

          )
        }

      </div>

    </div>
  );
}