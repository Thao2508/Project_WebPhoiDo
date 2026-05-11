import "./YeuThich.scss";
import Sidebar from "../../../components/SideBar/SideBar";

import {
  Heart,
  Search,
} from "lucide-react";

import { useState } from "react";

export default function YeuThich() {

  const [favorites, setFavorites] = useState([

    {
      id: 1,

      ten: "đi dạo",

      phongcach: "Casual",
      ao:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",

      quan:
        "https://images.unsplash.com/photo-1506629905607-d9c297d4d42c?q=80&w=1000&auto=format&fit=crop"
    },

    {
      id: 2,

      ten: "bộ đi chơi",

      phongcach: "Streetwear",
      ao:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1000&auto=format&fit=crop",

      quan:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop"
    },

    {
      id: 3,

      ten: "bộ phối đi làm",

      phongcach: "Minimal",

      ao:
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1000&auto=format&fit=crop",

      quan:
        "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,

      ten: "bộ đi chơi",

      phongcach: "Streetwear",

      ao:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1000&auto=format&fit=crop",

      quan:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop"
    }

  ]);


  const handleRemoveFavorite = (id) => {

    setFavorites(
      favorites.filter((item) => item.id !== id)
    );

  };

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

            <p>
              Những outfit bạn đã lưu
            </p>

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

          {
            favorites.map((item) => (

              <div
                className="yt-card"
                key={item.id}
              >

                {/* HEART */}

                <button
                  className="yt-heart active"
                  onClick={() =>
                    handleRemoveFavorite(item.id)
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

                  <div className="yt-cloth">

                    <img
                      src={item.ao}
                      alt=""
                    />

                    <span>Áo</span>

                  </div>

                  {/* QUẦN */}

                  <div className="yt-cloth">

                    <img
                      src={item.quan}
                      alt=""
                    />

                    <span>Quần</span>

                  </div>

                </div>

                {/* INFO */}

                <div className="yt-info">

                  <span className="yt-tag">

                    {item.phongcach}

                  </span>

                  <h3>{item.ten}</h3>

                  <p>{item.mota}</p>

                </div>

              </div>

            ))
          }

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