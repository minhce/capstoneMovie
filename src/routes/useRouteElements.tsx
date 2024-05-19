import { Navigate, Outlet, useRoutes } from "react-router-dom";
import HomePage from "../modules/User/HomePage";
import UserLayout from "../layouts/UserLayout";
import MovieDetails from "../modules/User/MovieDetails";
import NotFound from "../modules/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../modules/Auth/LoginPage";
import RegisterPage from "../modules/Auth/RegisterPage";
import AdminLayout from "../layouts/AdminLayout";
import UserManagement from "../modules/Admin/UserManagement";
import MovieManagement from "../modules/Admin/MovieManagement";
import CinemaManagement from "../modules/Admin/CinemaManagement";
import AccountSettings from "../modules/Admin/AccountSettings";
import { useAppSelector } from "../redux/hooks";
import Cinema from "../modules/Cinema";

const ProtectedRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to={"/auth/login"} />;
};

const RejectedRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  // Nếu chưa đăng nhập (currentUser là nul) thì cho vào trang Login & Register. Ngược lại thì redirect sang home hoặc admin dựa vào maLoaiNguoiDung
  return currentUser === null ? <Outlet /> : <Navigate to={"/"} />;
};

const ProtectedAdminRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  // Khi có thông tin user, và user đó là QuanTri thì cho đi tiếp. Ngược lại thì đá ra trang login
  return currentUser && currentUser?.maLoaiNguoiDung === "QuanTri" ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/login"} />
  );
};

const useRouteElement = () => {
  const element = useRoutes([
    {
      path: "",
      element: <UserLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/detail/:id",
          element: <MovieDetails />,
        },
        {
          path: "/cinema", // Đường dẫn cho Cinema
          element: <Cinema />, // Component Cinema
        },
      ],
    },
    {
      path: "/auth",
      element: <RejectedRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "/auth/login",
              element: <LoginPage />,
            },
            {
              path: "/auth/register",
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/user",
          element: <UserManagement />,
        },
        {
          path: "/admin/movie",
          element: <MovieManagement />,
        },
        {
          path: "/admin/cinema",
          element: <CinemaManagement />,
        },
        {
          path: "/admin/account-settings",
          element: <AccountSettings />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return element;
};
export default useRouteElement;
