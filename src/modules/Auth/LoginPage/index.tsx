import { useMutation } from "@tanstack/react-query";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useState } from "react";
import { loginApi } from "../../../apis/user";

import { useAppDispatch } from "../../../redux/hooks";
import { setCurrentUser } from "../../../redux/slices/user.slice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [formValues, setFormValues] = useState({
    //tạm thời gán chết giá trị
    taiKhoan: "admin_quyen_luc",
    matKhau: "159753",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (payload: any) => loginApi(payload),
    onSuccess: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setCurrentUser(user));
      if (user.maLoaiNguoiDung === "QuanTri") {
        navigate("/admin/user");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      console.log("onError", error);
    },
  });

  const onSubmit = () => {
    console.log("formValues", formValues);
    handleLogin(formValues);
  };

  return (
    <div className="w-[400px] ">
      <div className="my-4 text-center">
        <Typography className="font-bold text-3xl">Đăng nhập</Typography>
        <Typography className="mt-2">Hi, Chào mừng bạn quay lại 👋</Typography>
      </div>

      <Form layout="vertical" onFinish={onSubmit}>
        <Row gutter={[48, 16]}>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Tài khoản</label>
            <Input
              type="text"
              size="large"
              className="mt-1"
              placeholder="Vui lòng nhập tài khoản..."
            />
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Mật khẩu</label>
            <Input
              type="password"
              size="large"
              className="mt-1"
              placeholder="Vui lòng nhập mật khẩu..."
            />
          </Col>

          <Col span={24}>
            <Button
              loading={isPending}
              disabled={isPending}
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              Đăng nhập
            </Button>
          </Col>
        </Row>
      </Form>

      <Typography className="mt-8 text-center">
        Chưa có tài khoản?{" "}
        <span className="text-blue-700 font-medium cursor-pointer">
          Tạo tài khoản
        </span>
      </Typography>
    </div>
  );
}
