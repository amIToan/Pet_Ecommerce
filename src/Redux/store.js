import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  orderDetailsReducer,
  orderListReducer,
  orderUpdateReducer,
} from "./Reducers/OrderReducres";
import {
  companyCreateUpdateReducer,
  getCompanyReducer,
  UpdateCompanyInfo,
} from "./Reducers/CompnayReducers";
import {
  getAllCategory,
  createCategory,
  updateCategory,
} from "./Reducers/CategorReducer";
import {
  bannerInfoReducer,
  updateBannerInfo,
  bannerInfoDetail,
} from "./Reducers/BannerReducer";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderUpdate: orderUpdateReducer,
  // CompanyAction: companyCreateUpdateReducer,
  UpdatedCompanyInfo: UpdateCompanyInfo,
  CompanyInfo: getCompanyReducer,
  CategoryList: getAllCategory,
  createdCategory: createCategory,
  updatedCategory: updateCategory,
  BannerList: bannerInfoReducer,
  BannerDetail: bannerInfoDetail,
  updatedBanner: updateBannerInfo,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
