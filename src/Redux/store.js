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
  getCompanyReducer,
  UpdateCompanyInfo,
} from "./Reducers/CompnayReducers";
import {
  getAllCategory,
  createCategory,
  updateCategory,
} from "./Reducers/CategorReducer";
import { updateBannerInfo } from "./Reducers/BannerReducer";
import {
  newsCreateReducer,
  newsUpdateReducer,
  newsDeleteReducer,
} from "./Reducers/NewsReducer";
import {
  branchCreateReducer,
  branchUpdateReducer,
} from "./Reducers/BranchReducer";
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
  UpdatedCompanyInfo: UpdateCompanyInfo,
  CompanyInfo: getCompanyReducer,
  CategoryList: getAllCategory,
  createdCategory: createCategory,
  updatedCategory: updateCategory,
  updatedBanner: updateBannerInfo,
  newsCreate: newsCreateReducer,
  newUpdate: newsUpdateReducer,
  newsDeletion: newsDeleteReducer,
  branchCreate: branchCreateReducer,
  branchUpdate: branchUpdateReducer,
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
