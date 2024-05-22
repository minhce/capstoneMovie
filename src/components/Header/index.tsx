import { Button } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/slices/user.slice";
import { UserOutlined } from "@ant-design/icons"; // Import UserOutlined

export default function Header() {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logOut());
  };

  return (
    <div className="flex h-[92px] items-center justify-between px-4">
      <img src="/img/logo.png" alt="Logo" className="font-semibold" />
      <div className="flex items-center gap-4">
        <Link to="/" className="font-medium cursor-pointer">
          Trang chủ
        </Link>
        <span className="font-medium cursor-pointer">Lịch chiếu</span>
        <span className="font-medium cursor-pointer">Phim</span>
        <span className="font-medium cursor-pointer">Quy định</span>
      </div>
      {currentUser ? (
        <>
          <div className="flex items-center gap-3">
            <span className="font-bold text-blue-500">
              Xin chào {currentUser.taiKhoan}!
            </span>
            {currentUser?.maLoaiNguoiDung === "QuanTri" && (
              <Button type="primary" danger onClick={() => navigate("/admin")}>
                Admin
              </Button>
            )}
            {/* Nút Quản Lý Tài Khoản cho khách hàng */}
            {currentUser?.maLoaiNguoiDung === "KhachHang" && (
              <Link to="/user" className="text-green-500"> {/* Thay đổi đường dẫn */}
                <UserOutlined /> Quản Lý Tài Khoản
              </Link>
            )}
            <Button onClick={handleLogout} type="primary">
              Đăng xuất
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <Button size="large" onClick={() => navigate("/auth/register")}>
            Đăng ký
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={() => navigate("/auth/login")}
          >
            Đăng nhập
          </Button>
        </div>
      )}
    </div>
  );
}