import "./DangNhapAdmin.scss";

export default function DangNhapAdmin() {
  return (
    <div className="dangnhap-admin">
      <div className="form-dangnhap">
        <h2>Đăng nhập</h2>

        <input type="text" placeholder="Tên đăng nhập" />

        <input type="password" placeholder="Mật khẩu" />

        <button>Đăng nhập</button>
      </div>
    </div>
  );
}