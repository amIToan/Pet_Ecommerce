import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
    name: "Product",
    initialState: {
        ProductList: null,
        isFetching: false,
        error: false
    },
    reducers: {
        productStart: (state) => {
            state.isFetching = true
        },
        productSuccess: (state, action) => {
            state.ProductList = action.payload
            state.isFetching = false
            state.error = false
        },
        productFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload
        }
    }
})
export const { productStart, productSuccess, productFailed } = productSlice.actions;
export default productSlice.reducer;