import { createSlice } from "@reduxjs/toolkit";
const OrderSlice = createSlice({
  name: "Order",
  initialState: {
    OrderUser: null,
    isFetching: false,
    error: false,
    success: false,
  },
  reducers: {
    createOrder: (state) => {
      state.isFetching = true;
    },
    createOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.success = true;
      state.OrderUser = action.payload;
    },
    createOrderFailed: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
    resetOrder: (state) => {
      state.OrderUser = null;
      state.isFetching = false;
      state.error = false;
      state.success = false;
    },
  },
});
export const {
  createOrder,
  createOrderSuccess,
  createOrderFailed,
  resetOrder,
} = OrderSlice.actions;
export default OrderSlice.reducer;
