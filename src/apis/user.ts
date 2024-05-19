import api from "./apiUtil";

export const loginApi = async (payload: {
  taiKhoan: string;
  matKhau: string;
}) => {
  try {
    const response = await api.post("/QuanLyNguoiDung/DangNhap", payload);
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};
