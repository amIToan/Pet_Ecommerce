import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_START,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../Constants/ProductConstants";
import { publicRequest } from "../../Helps";
import { logout } from "./userActions";

export const listProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await publicRequest.get(`/api/products/all`, config);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message || error.response.data) {
    //   dispatch(logout());
    // }
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await publicRequest.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message || error.response.data) {
    //   dispatch(logout());
    // }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE PRODUCT
export const createProduct = (productInfo) => async (dispatch, getState) => {
  console.log(productInfo);
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await publicRequest.post(
      `/api/products/`,
      productInfo,
      config
    );

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message || error.response.data) {
    //   dispatch(logout());
    // }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

// EDIT PRODUCT
export const editProduct = (id) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_EDIT_START });
  try {
    const { data } = await publicRequest.get(`/api/products/${id}`);
    data && dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message || error.response.data) {
    //   dispatch(logout());
    // }
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: message,
    });
  }
};
// UPDATE PRODUCT
export const updateProduct = (id, product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await publicRequest.put(
      `/api/products/${id}`,
      product,
      config
    );
    data && dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message || error.response.data) {
    //   dispatch(logout());
    // }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};
