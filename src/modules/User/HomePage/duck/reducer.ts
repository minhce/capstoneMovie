import * as ActionType from "../../../../constants";
import { Action, ListMovieState, Movie } from "../../../../types/movie.type";


const initialState: ListMovieState<Movie> = {
  loading: false,
  data: null,
  error: null,
};


const listMovieReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LIST_MOVIE_REQUEST: {
      return { 
        ...state, 
        loading: true, 
        data: null,
        error: null 
      };
    }

    case ActionType.LIST_MOVIE_SUCCESS: {
      return { 
        ...state, 
        loading: false,
        data: action.payload,
        error: null 
      };
    }

    case ActionType.LIST_MOVIE_FAILED: {
      return { 
        ...state, 
        loading: false,
        data: null,
        error: action.payload 
      };
    }

    default:
      return state; 
  }
};

export default listMovieReducer;