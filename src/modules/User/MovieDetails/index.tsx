import { useParams, Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acFetchMovieDetails } from "./duck/actions";
import { RootState } from "../../../redux/store";
import dayjs from "dayjs";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.movieDetailsReducer
  );

  useEffect(() => {
    if (id) {
      dispatch(acFetchMovieDetails(id));
    }
  }, [id]);

  const date = new Date(data?.ngayKhoiChieu || "");
  const cinemaSystems = data?.heThongRapChieu || [];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-3">
          <img
            src={data?.hinhAnh}
            className="w-100 rounded"
            style={{ objectFit: "cover" }}
            height={400}
            alt={data?.tenPhim}
          />
        </div>
        <div className="col-9 d-flex flex-column justify-content-between">
          <div>
            <h4 className="font-weight-bold">Tên phim: {data?.tenPhim}</h4>
            <p>Mô tả: {data?.moTa}</p>
            <p>Đánh giá: {data?.danhGia}</p>
            <p>Ngày khởi chiếu: {dayjs(date).format("DD/MM/YYYY")}</p>
          </div>
          <div style={{ width: 200 }}>
            <button className="btn btn-success">Xem trailer</button>
          </div>
        </div>
      </div>

      <Tab.Container id="left-tabs-example" defaultActiveKey="BHDStar">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {cinemaSystems.map((system) => (
                <Nav.Item key={system.maHeThongRap}>
                  <Nav.Link eventKey={system.maHeThongRap}>
                    <img src={system.logo} style={{ width: 120, height: 120 }} alt="Logo" />
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {cinemaSystems.map((system) => (
                <Tab.Pane eventKey={system.maHeThongRap} key={system.maHeThongRap}>
                  {system.cumRapChieu.map((cinema) => (
                    <div key={cinema.maCumRap}>
                      <h5>{cinema.tenCumRap}</h5>
                      <Row>
                        {cinema.lichChieuPhim.map((showtime, index) => (
                          <Col sm={2} key={index}>
                            <Button variant="primary">
                              {dayjs(showtime.ngayChieuGioChieu).format("DD/MM hh:mm")}
                            </Button>
                            {/* Nút Đặt vé liên kết đến trang Cinema với query parameters */}
                            <Link
                              to={`/cinema?tenPhim=${data?.tenPhim}&suatChieu=${cinema.tenCumRap}&ngay=${dayjs(showtime.ngayChieuGioChieu).format("DD/MM/YYYY")}&gio=${dayjs(showtime.ngayChieuGioChieu).format("hh:mm")}`}
                              className="btn btn-danger mt-2"
                            >
                              Đặt vé
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  ))}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}