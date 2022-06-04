import { createSlice } from "@reduxjs/toolkit";

const ReviewReducer = createSlice({
  name: "review",
  initialState: {
    loading: false,
    success: false,
    error: false,
  },
  reducers: {
    reviewRequest: (state) => {
      state.loading = true;
    },
    reviewSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    reviewFailed: (state, action) => {
      state.error = action.payload;
      state.success = action.false;
    },
    resetReview: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
    },
  },
});
export const { reviewRequest, reviewSuccess, reviewFailed, resetReview } =
  ReviewReducer.actions;
export default ReviewReducer.reducer;
