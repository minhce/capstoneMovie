import { createSlice } from "@reduxjs/toolkit";

const userLocal = localStorage.getItem("user");
const initialState = {
  currentUser: userLocal ? JSON.parse(userLocal) : null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    logOut: (state) => {
      state.currentUser = null;
    },
  },
});
export const { setCurrentUser, logOut } = userSlice.actions;
export default userSlice;
