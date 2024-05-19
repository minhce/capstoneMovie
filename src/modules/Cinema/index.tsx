import React, { useState } from "react";
import { Button, Checkbox, Row, Col, Typography, Space } from "antd";
import { useSearchParams } from "react-router-dom";
import '../../css/Cinema.css'; // Import CSS tùy chỉnh

const { Title, Text } = Typography;

const seatData = [
  { row: "A", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { row: "B", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { row: "C", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { row: "D", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  // ... thêm các hàng ghế khác
];

const seatStatus = {
  AVAILABLE: "available",
  SELECTED: "selected",
  RESERVED: "reserved",
};

export default function Cinema() {
  const [searchParams] = useSearchParams();
  const tenPhim = searchParams.get("tenPhim");
  const suatChieu = searchParams.get("suatChieu");
  const ngay = searchParams.get("ngay");
  const gio = searchParams.get("gio");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, seat) => {
    const seatId = `${row}${seat}`;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleConfirmBooking = () => {
    console.log("Ghế đã chọn:", selectedSeats);
  };

  return (
    <div className="cinema-container">
      <Title level={2} className="cinema-title">Đặt vé xem phim</Title>
      <div className="movie-info">
        <Text strong className="movie-title">{tenPhim}</Text>
        <Text className="showtime" style={{ fontSize: '18px', fontWeight: 'bold', color: 'blue' }}>
          Suất chiếu: {ngay} - {gio} - {suatChieu}
        </Text>
      </div>
      <div className="screen-container">
        <div className="screen"></div>
        <Text strong className="screen-text">Màn hình</Text>
      </div>
      <div className="seat-map">
        {seatData.map((row) => (
          <Row key={row.row} gutter={[16, 16]} justify="center">
            {row.seats.map((seat) => (
              <Col key={`${row.row}${seat}`}>
                <Checkbox
                  className="seat-checkbox"
                  checked={selectedSeats.includes(`${row.row}${seat}`)}
                  onChange={() => handleSeatClick(row.row, seat)}
                >
                  {seat}
                </Checkbox>
              </Col>
            ))}
          </Row>
        ))}
      </div>
      <div className="seat-legend">
        <Space>
          <div className="seat-legend-item">
            <Checkbox checked disabled className="seat-checkbox" /> <Text>Ghế trống</Text>
          </div>
          <div className="seat-legend-item">
            <Checkbox checked={true} disabled className="seat-checkbox" /> <Text>Ghế đã chọn</Text>
          </div>
          <div className="seat-legend-item">
            <Checkbox checked={false} disabled className="seat-checkbox" /> <Text>Ghế đã đặt</Text>
          </div>
        </Space>
      </div>
      <div className="booking-info">
        <Text strong>Tên người dùng: [Tên người dùng]</Text>
        <Text>Số lượng ghế: {selectedSeats.length}</Text>
        <Text>Tổng tiền: [Tổng tiền]</Text>
      </div>
      <Button type="primary" onClick={handleConfirmBooking} className="confirm-button" size="small">
        Xác nhận
      </Button>
    </div>
  );
}