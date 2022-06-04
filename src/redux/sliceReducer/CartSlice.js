import { createSlice } from "@reduxjs/toolkit";
import { logoutSuccess } from "./LoginSlice";
const initialState = { Cart: [], shippingAddress: null, paymentMethod: null };
const CartSlice = createSlice({
  name: "cart",
  initialState: { ...initialState },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const addedItem = item && {
        product: item._id || item.product,
        name: item.name,
        image: item.image,
        price: item.price,
        countInStock: item.countInStock,
        quantity: item.quantity,
      };
      const existItem =
        state.Cart?.length > 0 &&
        state.Cart.find((x) => x.product === addedItem.product);
      if (existItem) {
        state.Cart.forEach((element) => {
          if (element.product === existItem.product) {
            element.quantity = addedItem.quantity;
          }
        });
        state.Cart = state.Cart.map((x) =>
          x.product === existItem.product ? addedItem : x
        );
      } else {
        state.Cart = [...state.Cart, addedItem];
      }
    },
    removeCartItem: (state, action) => {
      const item = action.payload;
      state.Cart = state.Cart.filter((x) => x.product !== item.product);
    },
    saveCartAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    saveCartMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    clearCart: (state) => {
      state.Cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, (state) => {
      Object.assign(state, initialState);
    });
  },
});
export const {
  addToCart,
  removeCartItem,
  saveCartAddress,
  saveCartMethod,
  clearCart,
} = CartSlice.actions;
export default CartSlice.reducer;
