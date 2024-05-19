export type Banner = {
  maBanner: number;
  maPhim: number;
  hinhAnh: string;
};

export interface DataMovieListPagination {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: Movie[];
}

export interface Movie {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: Date;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}


export type ListMovieState<T> = {
  loading: boolean;
  data: T[] | null;
  error: any;
};

export type Action = {
  type: string;
  payload?: any;
};

export type MovieDetailsState<K> = {
  loading: boolean;
  data: K | null;
  error: any;
};

export interface MovieDetails {
  heThongRapChieu: HeThongRapChieu[];
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
  ngayKhoiChieu: Date;
  danhGia: number;
}
export interface HeThongRapChieu {
  cumRapChieu: CumRapChieu[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
}

export interface CumRapChieu {
  lichChieuPhim: LichChieuPhim[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
}

export interface LichChieuPhim {
  maLichChieu: string;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: Date;
  giaVe: number;
  thoiLuong: number;
}
