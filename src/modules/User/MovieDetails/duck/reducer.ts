import * as ActionType from "../../../../constants";
import { Action, MovieDetails } from "../../../../types/movie.type";
import { MovieDetailsState } from "./../../../../types/movie.type";

const initialState: MovieDetailsState<MovieDetails> = {
  loading: false,
  data: null,
  error: null,
};

const movieDetailsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.MOVIE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        error: null
      };

    case ActionType.MOVIE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };

    case ActionType.MOVIE_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload
      };

    default:
      return state;
  }
};

export default movieDetailsReducer;