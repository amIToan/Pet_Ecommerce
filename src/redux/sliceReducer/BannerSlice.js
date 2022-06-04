import { createSlice } from "@reduxjs/toolkit";
const BannerSlice = createSlice({
  name: "Banner",
  initialState: {
    loading: false,
    Banner: null,
    error: false,
  },
  reducers: {
    BannerStart: (state) => {
      state.loading = true;
    },
    BannerSuccess: (state, action) => {
      state.loading = false;
      state.Banner = action.payload;
    },
    BannerError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    BannerReset: (state) => {
      state.loading = false;
      state.Banner = null;
      state.error = false;
    },
  },
});
export const { BannerStart, BannerSuccess, BannerError, BannerReset } =
  BannerSlice.actions;
export default BannerSlice.reducer;
