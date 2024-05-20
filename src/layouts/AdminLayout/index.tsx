import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, theme } from "antd";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

export default function AdminLayout() {
  const { currentUser } = useAppSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: <span> Cài đặt tài khoản </span>,
    },
    {
      key: "2",
      label: <span>Đăng xuất</span>,
    },
  ];

  if (!currentUser) return <Navigate to={"/auth/login"} />;
  if (currentUser && currentUser.maLoaiNguoiDung === "KhachHang")
    return <Navigate to={"/"} />;

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link to={"/admin"}>
          <div className="h-[72px] my-1 text-white flex items-center justify-center">
            <img src="/vite.svg" width={55} className="cursor-pointer" />
          </div>
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          className="pt-1"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: "Trang chủ",
            },
            {
              key: "/admin/user",
              icon: <UserOutlined />,
              label: "Quản lý người dùng",
            },
            {
              key: "/admin/movie",
              icon: <VideoCameraOutlined />,
              label: "Quản lý phim",
            },
            {
              key: "/admin/cinema",
              icon: <UploadOutlined />,
              label: "Quản lý rạp chiếu phim",
            },
            {
              key: "/admin/account-settings",
              icon: <SettingOutlined />,
              label: "Cài đặt",
            },
          ]}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex items-center justify-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="h-[64px] w-[64px]"
            />
            <Dropdown menu={{ items }} arrow={{ pointAtCenter: true }}>
              <div className="pr-4">
                <Avatar
                  size={"large"}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "scroll",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
