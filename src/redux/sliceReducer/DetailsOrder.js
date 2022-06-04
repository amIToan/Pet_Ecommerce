import { createSlice, createAction } from "@reduxjs/toolkit";
export const updateOrderInfo = createAction('updateOrder')
const lolstate = {
  OrderDetail: null,
  isFetching: false,
  error: false,
}
const OrderDetail = createSlice({
  name: "specifiedOrder",
  initialState: {
    OrderDetail: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getSpecificOrder: (state) => {
      state.isFetching = true;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.OrderDetail = action.payload;
      state.message = null;
    },
    getOrderFailed: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.OrderDetail = action.payload;
      state.message = action.payload;
    },
    resetOrderDetail: (state) => {
      Object.assign(state, lolstate)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrderInfo, (state, action) => {
        state.isFetching = false;
        state.update = true;
        state.OrderDetail = action.payload;
        state.error = false;
        state.message = null;
      })
  }
});
export const { getSpecificOrder, getOrderSuccess, getOrderFailed, resetOrderDetail } =
  OrderDetail.actions;
export default OrderDetail.reducer;
