import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import listMovieReducer from "../modules/User/HomePage/duck/reducer";
import movieDetailsReducer from "../modules/User/MovieDetails/duck/reducer";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  listMovieReducer,
  movieDetailsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
