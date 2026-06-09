import "./TrangChu.scss";

import Sidebar from "../../../components/SideBar/SideBar";

import {
  Bell,
  Search,
  User,
  Sparkles,
  Upload,
  Heart,
  Shirt,
  ArrowRight
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


export default function TrangChu() {

  const navigate = useNavigate();

  // USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isLogin = !!user;

  // STATE
  const [outfits, setOutfits] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [thongKe, setThongKe] = useState({

    tongTrangPhuc: 0,
    tongOutfitYeuThich: 0
  });

  // API
  useEffect(() => {

    layOutfit();

    if (user) {

      layThongKe();
    }

  }, []);


  const layOutfit = async (
    search = ""
  ) => {

    try {

      const res = await axios.get(

        "http://localhost:8000/trang-chu/goi-y-outfit",

        {
          params: {

            keyword: search,

            maNguoiDung:
              user?.maNguoiDung
          }
        }
      );

      setOutfits(res.data);

    } catch (error) {

      console.log(error);
    }
  };



  const layThongKe = async () => {

    try {

      const res = await axios.get(

        `http://localhost:8000/trang-chu/thong-ke/${user.maNguoiDung}`
      );

      setThongKe(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleSearch = (
    e
  ) => {

    const value = e.target.value;

    setKeyword(value);

    layOutfit(value);
  };

  const handleYeuThich = async (
    maBoPhoi
  ) => {

    if (!isLogin) {

      requireLogin();

      return;
    }

    try {

      await axios.post(

        `http://localhost:8000/trang-chu/yeu-thich/${maBoPhoi}`,

        null,

        {
          params: {

            maNguoiDung:
              user.maNguoiDung
          }
        }
      );

      layOutfit(keyword);

    } catch (error) {

      console.log(error);
    }
  };

  // LOGIN REQUIRED
  const requireLogin = () => {

    navigate("/dangnhap");
  };

  return (

    <div className="home">

      {/* SIDEBAR */}
      {isLogin && <Sidebar />}

      {/* MAIN */}
      <div className={isLogin ? "main logged" : "main"}>

        {/* TOPBAR */}
        <div className="topbar">

          {/* GUEST LOGO */}
          {!isLogin && (

            <div className="guest-logo">

              <Shirt size={24} />

              <span>Outfitly</span>

            </div>
          )}

          {/* SEARCH */}
          <div className="search-box">

            <Search size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm outfit, phong cách, dịp sử dụng..."
              value={keyword}
              onChange={handleSearch}
            />
          </div>

          {/* RIGHT */}
          <div className="top-right">

            {isLogin ? (

              <>
                <Bell size={20} />

                <div
                  className="profile"
                  onClick={() =>
                    navigate("/trangcanhan")
                  }
                >
                  <div className="profile-icon">
                    <User size={20} />
                  </div>

                  <span>
                    {user?.tenDangNhap}
                  </span>

                </div>
              </>

            ) : (

              <div className="auth-buttons">

                <Link to="/dangnhap">

                  <button className="login-btn">
                    Đăng nhập
                  </button>

                </Link>

                <Link to="/dangky">

                  <button className="register-btn">
                    Đăng ký
                  </button>

                </Link>

              </div>
            )}

          </div>

        </div>

        {/* ========================= */}
        {/* CHƯA ĐĂNG NHẬP */}
        {/* ========================= */}

        {!isLogin && (

          <>

            {/* HERO */}
            <div className="hero">

              <div className="hero-left">

                <h1>
                  Phối đồ theo
                  <br />
                  phong cách của bạn
                </h1>

                <p className="hero-desc">

                  Outfitly giúp bạn phối hợp áo và quần
                  phù hợp theo phong cách, màu sắc
                  và dịp sử dụng.

                </p>

                <div className="hero-buttons">

                  <button
                    className="primary-btn"
                    onClick={requireLogin}
                  >

                    <Sparkles size={18} />

                    Phối đồ ngay

                  </button>

                  <button className="secondary-btn">

                    Khám phá outfit

                  </button>

                </div>

              </div>

              <div className="hero-right">

                <img
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1600&auto=format&fit=crop"
                  alt=""
                />

              </div>

            </div>

          </>
        )}

        {/* ========================= */}
        {/* ĐÃ ĐĂNG NHẬP */}
        {/* ========================= */}

        {isLogin && (

          <>

            <p className="hello">

              Xin chào, {user?.tenDangNhap} 👋

            </p>

            <h1 className="dashboard-title">

              Hôm nay bạn muốn phối đồ như thế nào?

            </h1>

            <div className="dashboard-grid">

              {/* ACTIONS */}
              <div className="actions">

                <div className="action-card"
                  onClick={() =>
                    navigate("/phoido")
                  }
                >

                  <div className="icon purple">

                    <Sparkles size={22} />

                  </div>

                  <div>

                    <h3>Phối đồ ngay</h3>

                    <p>
                      Nhận gợi ý outfit phù hợp với phong cách của bạn
                    </p>

                  </div>

                </div>

                <div className="action-card"
                  onClick={() =>
                    navigate("/themtrangphuc")
                  }
                >

                  <div className="icon orange">

                    <Upload size={22} />

                  </div>

                  <div>

                    <h3>Upload trang phục</h3>

                    <p>
                      Thêm trang phục vào tủ đồ của bạn
                    </p>

                  </div>

                </div>

              </div>

              {/* STATS */}
              <div className="stats">

                <div className="stat-card">

                  <div className="stat-icon purple">

                    <Shirt size={20} />

                  </div>

                  <div>

                    <h3>
                      {thongKe.tongTrangPhuc}
                    </h3>

                    <p>Tủ đồ của bạn</p>

                  </div>

                </div>

                <div className="stat-card">

                  <div className="stat-icon yellow">

                    <Heart size={20} />

                  </div>

                  <div>

                    <h3>
                      {thongKe.tongOutfitYeuThich}
                    </h3>

                    <p>Outfit đã lưu</p>

                  </div>

                </div>

              </div>

            </div>

          </>
        )}

        {/* SECTION */}
        <div className="section-header">

          <h2>Bộ phối gợi ý dành cho bạn</h2>

          <span>

            Xem tất cả

            <ArrowRight size={16} />

          </span>

        </div>

        {/* OUTFITS */}
        <div className="outfits">
        {
          outfits.length > 0 ? (

            outfits.map((item, index) => (

              <div
                className="outfit-card"
                key={index}
              >

                <button
                  className={`heart ${
                    item.daYeuThich
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleYeuThich(
                      item.maBoPhoi
                    )
                  }
                >

                  <Heart
                    size={18}
                    fill={
                      item.daYeuThich
                        ? "#ff4d6d"
                        : "white"
                    }
                  />

                </button>

                <div className="outfit-vertical">
                  {
                    item.trangPhucs.map((tp) => (

                      <div
                        className="cloth-item"
                        key={tp.maTrangPhuc}
                      >

                        <img
                          src={tp.hinhAnh}
                          alt=""
                          className="cloth"
                        />

                      </div>

                    ))
                  }

                </div>

                <div className="outfit-info">

                  <div className="tags">

                    <span className="style">
                      {item.phongCach}
                    </span>

                    <span className="occasion">
                      {item.dipSuDung}
                    </span>

                  </div>

                  <p className="outfit-desc">

                    Outfit phù hợp cho phong cách{" "}
                    {item.phongCach?.toLowerCase()}

                  </p>

                </div>

              </div>
            ))

          ) : (

            <div className="empty-outfit">

              <h3>
                Không tìm thấy outfit nào
              </h3>

              <p>
                Hãy thử tìm kiếm với từ khóa khác
              </p>

            </div>
          )
        }

      </div>

        {/* CTA */}
        {!isLogin && (

          <div className="cta-banner">

            <div>

              <h2>
                Đăng nhập để trải nghiệm đầy đủ tính năng
              </h2>

              <p>
                Quản lý tủ đồ, lưu outfit yêu thích
                và nhận gợi ý cá nhân hóa.
              </p>

            </div>

            <button onClick={requireLogin}>

              Bắt đầu ngay

            </button>

          </div>
        )}

      </div>

    </div>
  );
}
