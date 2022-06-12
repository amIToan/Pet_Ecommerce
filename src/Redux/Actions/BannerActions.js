import { publicRequest } from "../../Helps";
import { logout } from "./userActions";
import {
  GET_BANNER_DETAIL_FAILED,
  GET_BANNER_DETAIL_INFO,
  GET_BANNER_DETAIL_SUCCESS,
  GET_BANNER_FAILED,
  GET_BANNER_INFO,
  GET_BANNER_SUCCESS,
  UPDATE_BANNER_FAILED,
  UPDATE_BANNER_INFO,
  UPDATE_BANNER_SUCCESS,
} from "../Constants/BannerConstants";

export const getBannerLists = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BANNER_INFO });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await publicRequest.get(`/api/banner/`, config);
    data && dispatch({ type: GET_BANNER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: GET_BANNER_FAILED,
      payload: message,
    });
  }
};

export const getBannerDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BANNER_DETAIL_INFO });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await publicRequest.get(`/api/banner/${id}`, config);
    data && dispatch({ type: GET_BANNER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: GET_BANNER_DETAIL_FAILED,
      payload: message,
    });
  }
};
// UPDATE PRODUCT
export const updateBanner = (id, banner) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_BANNER_INFO });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await publicRequest.put(`/api/banner/${id}`, banner, config);
    dispatch({ type: UPDATE_BANNER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: UPDATE_BANNER_FAILED,
      payload: message,
    });
  }
};
