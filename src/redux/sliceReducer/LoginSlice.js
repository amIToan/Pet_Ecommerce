import { createSlice } from "@reduxjs/toolkit";
const loginSlice = createSlice({
  name: "login",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailed: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
    logoutStart: (state) => {
      state.isFetching = false;
    },
    logoutSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
    },
    logoutFailed: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
    updatedStart: (state) => {
      state.isFetching = false;
    },
    updatedSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    updatedFailed: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
  updatedStart,
  updatedSuccess,
  updatedFailed,
  tokenClear,
} = loginSlice.actions;
export default loginSlice.reducer;
