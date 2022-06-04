import { configureStore, combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "../redux/sliceReducer/LoginSlice";
import RegisterReducer from "../redux/sliceReducer/RegisterSlice";
import ProductReducer from "../redux/sliceReducer/ProductSlice";
import CartReducer from "../redux/sliceReducer/CartSlice";
import OrderReducer from "../redux/sliceReducer/OrderSlice";
import DetailsOrder from "../redux/sliceReducer/DetailsOrder";
import PaymentReducer from "../redux/sliceReducer/PaymentSlice";
import OrderListReducer from "../redux/sliceReducer/OrderLists";
import ReviewReducer from "../redux/sliceReducer/ReviewSlice";
import CompanyReducer from "../redux/sliceReducer/CompanySlice";
import BannerReducer from "../redux/sliceReducer/BannerSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
export const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["Register", "Payment", "Review", "Company", "Banner"],
};
const rootReducer = combineReducers({
  Register: RegisterReducer,
  Product: ProductReducer,
  Cart: CartReducer,
  Order: OrderReducer,
  SpecifiedOrder: DetailsOrder,
  Payment: PaymentReducer,
  OrderList: OrderListReducer,
  Review: ReviewReducer,
  Login: LoginReducer,
  Company: CompanyReducer,
  Banner: BannerReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});
export let persistor = persistStore(store);
