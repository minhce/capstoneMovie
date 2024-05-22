import * as ActionType from "./../../../../constants";
import { Action, Movie } from "../../../../types/movie.type";
import api from ".//../../../../apis/apiUtil";
import axios from 'axios'; // Thêm axios
import { Dispatch } from "redux";

// Xác định kiểu dữ liệu cho đối tượng response từ API
interface MovieListResponse {
  data: {
    content: Movie[];
  };
}

// Xác định giao diện lỗi
interface FetchMovieListError {
  message: string;
  code?: string; // Mã lỗi, nếu có
}

// Xử lý lỗi trong API response
const handleApiError = (error: unknown): Error | FetchMovieListError => {
  // Kiểm tra xem lỗi có phải là lỗi API hay không
  if (error instanceof Error) {
    return error; // Trả về đối tượng Error
  } else if (axios.isAxiosError(error) && error.response && error.response.data) { // Sử dụng axios.isAxiosError
    return { message: error.response.data.message }; // Sử dụng thông tin response.data
  } else {
    return { message: 'Lỗi không xác định' };
  }
};


// Action để lấy danh sách phim
export const actFetchListData = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(actListMovieRequest());

    try {
      const result: MovieListResponse = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
      dispatch(actListMovieSuccess(result.data.content));
    } catch (error: unknown) {
      dispatch(actListMovieFailed(handleApiError(error)));
    }
  };
};

// Action cho yêu cầu lấy danh sách phim
const actListMovieRequest = (): Action => ({
  type: ActionType.LIST_MOVIE_REQUEST,
});

// Action cho thành công khi lấy danh sách phim
const actListMovieSuccess = (data: Movie[]): Action => ({
  type: ActionType.LIST_MOVIE_SUCCESS,
  payload: data,
});

// Action cho lỗi khi lấy danh sách phim
const actListMovieFailed = (error: Error | FetchMovieListError): Action => ({
  type: ActionType.LIST_MOVIE_FAILED,
  payload: error,
});