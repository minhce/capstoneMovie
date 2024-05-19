import React from "react";
import { Row, Form, Col, Input, Button, Typography } from "antd";

export default function RegisterPage() {
  return (
    <div className="w-[400px]">
      <div className="my-4 text-center">
        <Typography className="font-bold text-3xl">Tạo tài khoản</Typography>
        <Typography className="mt-2 text-center">
          Bạn đã có tài khoản?{" "}
          <span className="text-blue-700 font-medium cursor-pointer">
            Đăng nhập
          </span>
        </Typography>
      </div>
      <Form layout="vertical">
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
            <label className="text-xs text-[#6A7280]">*Họ tên</label>
            <Input
              type="text"
              size="large"
              className="mt-1"
              placeholder="Nguyễn Văn A"
            />
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Địa chỉ email</label>
            <Input
              type="email"
              size="large"
              className="mt-1"
              placeholder="xyz@gmail.com"
            />
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Số điện thoại</label>
            <Input
              type="text"
              size="large"
              className="mt-1"
              placeholder="09888999**"
            />
          </Col>

          <Col span={24}>
            <Button type="primary" size="large" block>
              Tạo tài khoản
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
