import * as ActionType from "./../../../../constants";
import { Action } from "../../../../types/movie.type";
import api from ".//../../../../apis/apiUtil";

export const acFetchMovieDetails = (id: string) => {
  return (dispatch: any) => {
    dispatch(actMovieDetailRequest());
    // call api
    api
      .get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
      .then((response) => dispatch(actMovieDetailSuccess(response.data.content)))
      .catch((error: any) => dispatch(actMovieDetailFailed(error)));
  };
};

const actMovieDetailRequest = (): Action => {
  return {
    type: ActionType.MOVIE_DETAIL_REQUEST,
  };
};
const actMovieDetailSuccess = (data: any): Action => {
  return {
    type: ActionType.MOVIE_DETAIL_SUCCESS,
    payload: data,
  };
};
const actMovieDetailFailed = (error: any): Action => {
  return {
    type: ActionType.MOVIE_DETAIL_FAILED,
    payload: error,
  };
};
