import "./DangNhapAdmin.scss";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function DangNhapAdmin() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [matKhau, setMatKhau] =
    useState("");

  // LOGIN

  const handleLogin = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/dangnhap",
        {
          method: "POST",

          headers: {
            "Content-Type":
            "application/json",
          },

          body: JSON.stringify({
            email,
            matKhau,
          }),
        }
      );

      const data =
        await response.json();

      // SUCCESS

      if (data.success) {

        localStorage.setItem(
          "admin",
          JSON.stringify(data.admin)
        );

        navigate("/quantri/taikhoan");

      }

      // FAILED

      else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Lỗi server");

    }

  };

  return (

    <div className="dangnhap-admin">

      <div className="form-dangnhap">

        <h2>
          Đăng nhập admin
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={matKhau}
          onChange={(e) =>
            setMatKhau(e.target.value)
          }
        />

        <button onClick={handleLogin}>

          Đăng nhập

        </button>

      </div>

    </div>
  );
}