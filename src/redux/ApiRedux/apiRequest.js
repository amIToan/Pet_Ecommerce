import publicRequest from "../../RequestMethos";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailed,
  updatedStart,
  updatedSuccess,
  updatedFailed,
} from "../sliceReducer/LoginSlice";
import {
  registerStart,
  registerSuccess,
  registerFailed,
} from "../sliceReducer/RegisterSlice";
import { Config } from "../../RequestMethos";
import {
  productFailed,
  productStart,
  productSuccess,
} from "../sliceReducer/ProductSlice";
import {
  createOrder,
  createOrderFailed,
  createOrderSuccess,
} from "../sliceReducer/OrderSlice";
import {
  getOrderFailed,
  getOrderSuccess,
  getSpecificOrder,
  updateOrderInfo,
} from "../sliceReducer/DetailsOrder";
import {
  PaymentFailed,
  PaymentPending,
  PaymentSuccess,
  startPayment,
} from "../sliceReducer/PaymentSlice";
import {
  getFullOrderLists,
  getOrderListFailed,
  requestOrderLists,
} from "../sliceReducer/OrderLists";
import {
  reviewFailed,
  reviewRequest,
  reviewSuccess,
} from "../sliceReducer/ReviewSlice";
import {
  CompanyError,
  CompanyStart,
  CompanySuccess,
} from "../sliceReducer/CompanySlice";
import {
  BannerError,
  BannerStart,
  BannerSuccess,
} from "../sliceReducer/BannerSlice";
export const LoginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/users/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(
      loginFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/users/register", user);
    dispatch(registerSuccess(res.data));
    navigate("/login");
  } catch (error) {
    dispatch(
      registerFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const logoutUser = async (dispatch, navigate, axiosJWT) => {
  dispatch(logoutStart());
  const config = Config();
  try {
    const res = await axiosJWT.post("/users/logout", "", config);
    localStorage.clear();
    localStorage.removeItem("persist:root");
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (error) {
    console.log(error);
    dispatch(
      logoutFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );

    localStorage.removeItem("persist:root");
  }
};
export const updatedUser = async (user, dispatch, axiosJWT) => {
  dispatch(updatedStart());
  const token = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).Login
  ).currentUser.token;
  const Config = {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axiosJWT.put("/users/profile", user, Config);
    dispatch(updatedSuccess(res.data));
    return true;
  } catch (error) {
    console.log(error);
    dispatch(
      updatedFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
    return false;
  }
};

// Products
export const ProductAPI = async (dispatch) => {
  dispatch(productStart());
  try {
    const res = await publicRequest.get(`/products/all`);
    dispatch(productSuccess(res.data));
    return true;
  } catch (error) {
    dispatch(
      productFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
    return false;
  }
};
// export const ProductPagination = async (dispatch, keyword = " ", pageNumber = " ") => {
//   dispatch(productStart());
//   try {
//     const res = await publicRequest.get(
//       `/products?keyword=${keyword}&pageNumber=${pageNumber}`
//     );
//     dispatch(productSuccess(res.data));
//     return true;
//   } catch (error) {
//     dispatch(
//       productFailed(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       )
//     );
//     return false;
//   }
// };

// Create Order for User
export const actionCreateOrder = async (order, dispatch) => {
  dispatch(createOrder());
  try {
    const config = Config();
    const res = await publicRequest.post("/orders/", order, config);
    dispatch(createOrderSuccess(res.data));
  } catch (error) {
    dispatch(
      createOrderFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

/////// get Specified Order
export const specifiedOrderAction = async (id, dispatch) => {
  dispatch(getSpecificOrder());
  try {
    const config = Config();
    const res = await publicRequest.get(`/orders/${id}`, config);
    dispatch(getOrderSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(
      getOrderFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
///////////// orderPayments
export const orderPayment = async (id, paymentResult, dispatch, method) => {
  dispatch(startPayment());
  try {
    const config = Config();
    const res = await publicRequest.put(
      `/orders/${id}/pay`,
      paymentResult,
      config
    );
    if (method == "PayPal") {
      res.data && dispatch(PaymentSuccess());
      dispatch(updateOrderInfo(res.data));
    } else {
      res.data && dispatch(PaymentPending());
      dispatch(updateOrderInfo(res.data));
    }
  } catch (error) {
    dispatch(
      PaymentFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

/////// Get order List
export const GetOrderList = async (dispatch) => {
  dispatch(requestOrderLists());
  const config = Config();
  try {
    const res = await publicRequest.get(`/orders/`, config);
    res.data && dispatch(getFullOrderLists(res.data));
  } catch (error) {
    dispatch(
      getOrderListFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const createReview = async (id, review, dispatch) => {
  dispatch(reviewRequest());
  const config = Config();
  try {
    const res = await publicRequest.post(
      `/products/${id}/review`,
      review,
      config
    );
    res && dispatch(reviewSuccess());
  } catch (error) {
    dispatch(
      reviewFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
// COmpany
export const getCompanyInfo = async (dispatch) => {
  dispatch(CompanyStart());
  try {
    const res = await publicRequest.get(`/company/`);
    res.data && dispatch(CompanySuccess(res.data));
  } catch (error) {
    dispatch(
      CompanyError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
// Banner
export const getBannerList = async (dispatch) => {
  dispatch(BannerStart());
  try {
    const res = await publicRequest.get(`/banner/`);
    res.data && dispatch(BannerSuccess(res.data));
  } catch (error) {
    dispatch(
      BannerError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
