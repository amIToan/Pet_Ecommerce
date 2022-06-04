import { createSlice } from "@reduxjs/toolkit";
const orderListReducer = createSlice({
    name: "OrderLists",
    initialState: {
        loading: false,
        orderLists: null,
        error: null
    },
    reducers: {
        requestOrderLists: (state) => {
            state.loading = true
        },
        getFullOrderLists: (state, action) => {
            state.loading = false;
            state.orderLists = action.payload;
            state.error = null
        },
        getOrderListFailed: (state, action) => {
            state.loading = false;
            state.orderLists = null;
            state.error = action.payload
        },
        resetOrderList: (state) => {
            state.loading = false;
            state.orderLists = null;
            state.error = null
        }
    }
})
export const { requestOrderLists, getFullOrderLists, getOrderListFailed, resetOrderList } = orderListReducer.actions;
export default orderListReducer.reducer
// export const orderListReducer = (state = {}, action) => {
//     switch (action.type) {
//         case ORDER_LIST_MY_REQUEST:
//             return { loading: true };
//         case ORDER_LIST_MY_SUCCESS:
//             return { loading: false, orderLists: action.payload };
//         case ORDER_LIST_MY_FAIL:
//             return { loading: false, error: action.payload };
//         case ORDER_LIST_MY_RESET:
//             return {};
//         default:
//             return state;
//     }
// };