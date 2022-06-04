import { createSlice } from "@reduxjs/toolkit";
const PaymentSlice = createSlice({
  name: "Payment",
  initialState: {
    isLoading: false,
    success: false,
    error: false,
    isPending: false,
  },
  reducers: {
    startPayment: (state) => {
      state.isLoading = true;
    },
    PaymentSuccess: (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.error = false;
      state.info = action.payload
    },
    PaymentPending: (state, action) => {
      state.isLoading = false;
      state.isPending = true;
      state.info = action.payload
    },
    PaymentFailed: (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = true;
      state.message = action.payload;
    },
    resetPayment: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = false;
      state.isPending = false;
    },
  },
});
export const {
  startPayment,
  PaymentSuccess,
  PaymentFailed,
  PaymentPending,
  resetPayment,
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
