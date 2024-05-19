import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Radio,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  Upload,
} from "antd";

import {
  SyncOutlined,
  ClockCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMovieApi, getListMovieApi } from "../../../apis/movie";
import { PAGE_SIZE } from "../../../constants";

export default function MovieManagement() {
  const { handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "GP01",
      ngayKhoiChieu: "",
      trangThaiChieu: true,
      hot: true,
      danhGia: "",
      hinhAnh: undefined,
    },
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataEdit, setDataEdit] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["list-movie", { currentPage }],
    queryFn: () => getListMovieApi(currentPage),
  });

  const queryClient = useQueryClient();

  const { mutate: handleAddMovie, isPending } = useMutation({
    mutationFn: (formValues: FormData) => {
      return addMovieApi(formValues);
    },
    onSuccess: (data) => {
      // tắt modal
      setIsOpenModal(false);
      queryClient.refetchQueries({
        queryKey: ["list-movie", { currentPage }],
        type: "active",
      });
      // gọi lại dữ liệu
    },
    onError: (error) => {},
  });

  const columns = [
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      render: (tenPhim: string) => (
        <Typography.Paragraph className="w-[100px]" ellipsis={{ rows: 1 }}>
          {tenPhim}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (key: string) => (
        <div>
          <img className="w-[80px] h-[80px] rounded object-cover" src={key} />
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (key: string) => (
        <Typography.Paragraph className="w-[180px]" ellipsis={{ rows: 2 }}>
          {key}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      width: 140,
    },
    {
      title: "Đánh giá",
      dataIndex: "danhGia",
      render: (textDanhGia: string) => (
        <Typography className="w-[120px]">{textDanhGia}</Typography>
      ),
    },
    {
      title: "Hot",
      dataIndex: "hot",
      render: (isHot: boolean) => {
        return isHot ? <span className="text-xl">🔥</span> : <Tag>N/A</Tag>;
      },
    },
    {
      title: "Đang chiếu",
      dataIndex: "dangChieu",
      width: 140,
      render: (isShowing: boolean) => {
        return isShowing ? (
          <Tag icon={<SyncOutlined spin />} color="processing">
            Đang chiếu
          </Tag>
        ) : (
          <Tag>N/A</Tag>
        );
      },
    },
    {
      title: "Sắp chiếu",
      dataIndex: "sapChieu",
      width: 140,
      render: (isComing: boolean) => {
        return isComing ? (
          <Tag icon={<ClockCircleOutlined />} color="success">
            Sắp chiếu
          </Tag>
        ) : (
          <Tag>N/A</Tag>
        );
      },
    },
    {
      title: "Thao tác",
      render: (_: any, record: any) => (
        <Space size="small">
          <Popconfirm
            title="Xoá phim"
            description="Bạn có chắc chắn sẽ xoá phim này?"
            onConfirm={() => handleDelete(record)}
            okText={<span>OK</span>}
            cancelText="Huỷ"
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
          <Button
            type="default"
            onClick={() => {
              setIsOpenModal(true);
              setValue("tenPhim", record.tenPhim);
              setValue("trailer", record.trailer);
              setValue("moTa", record.moTa);
              setValue("trangThaiChieu", record.dangChieu);
              setValue("hinhAnh", record.hinhAnh);
              setValue("danhGia", record.danhGia);
              setDataEdit(record);
            }}
          >
            Cập nhật
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (record: any) => {
    console.log("record", record);
  };

  const hinhAnhValue = watch("hinhAnh");

  const previewImage = (file: File) => {
    return URL.createObjectURL(file);
  };

  const onSubmit = (formValues: any) => {
    const formData = new FormData();
    formData.append("tenPhim", formValues.tenPhim);
    formData.append("trailer", formValues.trailer);
    formData.append("danhGia", formValues.danhGia);
    formData.append("moTa", formValues.moTa);
    formData.append("hinhAnh", formValues.hinhAnh);
    formData.append("hot", formValues.hot);
    formData.append("dangChieu", formValues.trangThaiChieu ? "true" : "false");
    formData.append("sapChieu", formValues.trangThaiChieu ? "false" : "true");
    formData.append("ngayKhoiChieu", formValues.ngayKhoiChieu);
    formData.append("maNhom", "GP01");
    handleAddMovie(formData);
  };

  const dataSource = data?.items || [];
  const totalCount = data?.totalCount || 0;

  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: "Trang chủ",
              path: "/admin",
            },
            {
              title: "Quản lý phim",
            },
          ]}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setIsOpenModal(true);
            reset();
          }}
        >
          Thêm
        </Button>
      </div>
      <div className="mt-4 text-2xl">
        <h4>Danh sách phim</h4>
        <Table
          className="mt-2"
          columns={columns}
          rowKey={"maPhim"}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 1280 }}
          loading={isLoading}
        />
        <div className="flex float-end mt-4 pb-4">
          <Pagination
            defaultCurrent={currentPage} // khi user thao tác sẽ lấy đươch currentPage
            total={totalCount} // lấy từ api
            pageSize={PAGE_SIZE}
            onChange={(page: number) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
      <Modal
        title="Thêm phim"
        centered
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={false}
      >
        <Form className="mt-4" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={[18, 18]}>
            <Col span={24}>
              <label className="text-sm" htmlFor="">
                Tên phim
              </label>
              <Controller
                name="tenPhim"
                control={control}
                render={({ field }) => (
                  <Input
                    size="large"
                    className="mt-1"
                    placeholder="Tên phim"
                    {...field}
                  />
                )}
              />
            </Col>

            <Col span={24}>
              <label className="text-sm" htmlFor="">
                Trailer
              </label>
              <Controller
                name="trailer"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="large"
                      className="mt-1"
                      placeholder="https://www.youtube.com"
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col span={24}>
              <label className="text-sm" htmlFor="">
                Mô tả
              </label>
              <Controller
                name="moTa"
                control={control}
                render={({ field }) => {
                  return (
                    <Input.TextArea
                      size="large"
                      rows={4}
                      className="mt-1"
                      placeholder="Nhập mô tả..."
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="trangThaiChieu"
                control={control}
                render={({ field }) => {
                  return (
                    <Radio.Group {...field}>
                      <Radio value={true}>Đang chiếu</Radio>
                      <Radio value={false}>Sắp chiếu</Radio>
                    </Radio.Group>
                  );
                }}
              />
            </Col>
            <Col span={24}>
              <Controller
                control={control}
                name="hot"
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value}>
                    Phim hot
                  </Checkbox>
                )}
              />
            </Col>
            <Col span={12}>
              <label className="text-sm" htmlFor="">
                Đánh giá
              </label>
              <Controller
                name="danhGia"
                control={control}
                render={() => {
                  return (
                    <Input
                      size="large"
                      type="number"
                      max={10}
                      className="mt-1"
                      placeholder="0 - 10"
                    />
                  );
                }}
              />
            </Col>
            <Col span={12}>
              <label className="text-sm" htmlFor="">
                Ngày khởi chiếu
              </label>
              <Controller
                name="ngayKhoiChieu"
                control={control}
                render={() => {
                  return (
                    <DatePicker
                      className="mt-1 w-full"
                      size="large"
                      placeholder="Chọn ngày"
                      format={"DD/MM/YYYY"}
                    />
                  );
                }}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="hinhAnh"
                control={control}
                render={({ field: { onChange, ...filed } }) => {
                  return (
                    <Upload
                      beforeUpload={() => {
                        return false;
                      }}
                      {...filed}
                      showUploadList={false}
                      multiple={false}
                      onChange={({ file }) => onChange(file)}
                    >
                      <Button icon={<UploadOutlined />}>Upload hình</Button>
                    </Upload>
                  );
                }}
              />
              {hinhAnhValue && (
                <div className="mt-2">
                  <img
                    src={
                      typeof hinhAnhValue === "string"
                        ? hinhAnhValue
                        : previewImage(hinhAnhValue)
                    }
                    className="w-[100px] h-[100px] object-cover rounded"
                  />
                  <span
                    className="inline-block ml-3 cursor-pointer"
                    onClick={() => setValue("hinhAnh", undefined)}
                  >
                    <DeleteOutlined />
                  </span>
                </div>
              )}
            </Col>
            <Col span={24} className="text-end">
              <Button
                loading={isPending}
                disabled={isPending}
                htmlType="submit"
                size="large"
                type="primary"
              >
                Thêm phim
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
