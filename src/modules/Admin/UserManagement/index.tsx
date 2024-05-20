import {
  Breadcrumb,
  Button,
  Pagination,
  Popconfirm,
  Space,
  Table,
  Tag,
} from "antd";

export default function UserManagement() {
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
    },
    {
      title: "Mã KH",
      dataIndex: "maLoaiNguoiDung",
      render: (maLoaiNguoiDung: string) => {
        return maLoaiNguoiDung === "KhachHang" ? (
          <Tag color="default">Khách hàng</Tag>
        ) : (
          <Tag color="success">Quản Trị</Tag>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Xoá người dùng"
            description="Bạn có chắc chắn sẽ xoá người dùng này?"
            onConfirm={() => handleDelete(record)}
            okText={<span>OK</span>}
            cancelText="Huỷ"
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
          <Button type="default">Cập nhật</Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (record: any) => {};

  const mockData = [
    {
      taiKhoan: "13123",
      hoTen: "NguyenVan1234",
      email: "Quyenvan@gmail.com",
      soDT: "0987654321",
      matKhau: "BC42Movie12120088888888",
      maLoaiNguoiDung: "KhachHang",
    },
    {
      taiKhoan: "abcdfgh",
      hoTen: "Có ai trong đây xin được job chưa ạ",
      email: "huiq@gmail.com",
      soDT: "0933882823893",
      matKhau: "12312311",
      maLoaiNguoiDung: "KhachHang",
    },
    {
      taiKhoan: "admin_quyen_luc",
      hoTen: "admin_quyen_luc",
      email: "admin_quyen_luc@gmail.com",
      soDT: "0323467891",
      matKhau: "159753",
      maLoaiNguoiDung: "QuanTri",
    },
    {
      taiKhoan: "admin0002",
      hoTen: "Có ai trong đây xin được job chưa ạ",
      email: "AdminS@gmail.com",
      soDT: "0323467891",
      matKhau: "yurtal_tunalsos1",
      maLoaiNguoiDung: "KhachHang",
    },
    {
      taiKhoan: "admin0003",
      hoTen: "Có ai trong đây xin được job chưa ạ",
      email: "phan03110991@gmail.com",
      soDT: "0987654324",
      matKhau: "John123@f",
      maLoaiNguoiDung: "KhachHang",
    },
    {
      taiKhoan: "admin01",
      hoTen: "Có ai trong đây xin được job chưa ạ",
      email: "admin01@gmail.com",
      soDT: "09876543212",
      matKhau: "BC42Movie2",
      maLoaiNguoiDung: "KhachHang",
    },
    {
      taiKhoan: "admin1123",
      hoTen: "admin",
      email: "loqav@mailinator.com",
      soDT: "0963258741",
      matKhau: "123456",
      maLoaiNguoiDung: "QuanTri",
    },
    {
      taiKhoan: "admin321",
      hoTen: "admin 123",
      email: "admin321@gmail.com",
      soDT: "0987654321",
      matKhau: "321321",
      maLoaiNguoiDung: "KhachHang",
    },
    {
      taiKhoan: "admin55555555555555",
      hoTen: "NguyenVan833",
      email: "trmthanh220895@gmail.com",
      soDT: "0323467891",
      matKhau: "BC42Movie2",
      maLoaiNguoiDung: "KhachHang",
    },
    {
      taiKhoan: "admin996",
      hoTen: "PhucDv",
      email: "admin996@gmail.com",
      soDT: "0396244169",
      matKhau: "phuc@123",
      maLoaiNguoiDung: "KhachHang",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: "Trang chủ",
              path: "/admin",
            },
            {
              title: "Quản lý người dùng",
            },
          ]}
        />
        <Button type="primary" size="large">
          Thêm
        </Button>
      </div>
      <div className="mt-4 text-2xl">
        <h4>Danh sách người dùng</h4>
        <Table
          className="mt-2"
          columns={columns}
          rowKey={"taiKhoan"}
          dataSource={mockData}
          pagination={false}
        />
        <div className="flex float-end mt-4 pb-4">
          <Pagination defaultCurrent={1} total={20} pageSize={10} />
        </div>
      </div>
    </div>
  );
}
