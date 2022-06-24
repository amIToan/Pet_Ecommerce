import { publicRequest } from "../../Helps";
import {
  NEWS_CREATE_FAIL,
  NEWS_CREATE_REQUEST,
  NEWS_CREATE_SUCCESS,
  NEWS_DELETE_FAIL,
  NEWS_DELETE_REQUEST,
  NEWS_DELETE_SUCCESS,
  NEWS_EDIT_RESET,
  NEWS_EDIT_START,
  NEWS_EDIT_SUCCESS,
  NEWS_UPDATE_FAIL,
  NEWS_UPDATE_REQUEST,
  NEWS_UPDATE_RESET,
  NEWS_UPDATE_SUCCESS,
} from "../Constants/NewsConstant";
import { logout } from "./userActions";

// DELETE news
export const deleteNEWS = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEWS_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await publicRequest.delete(`/api/news/${id}`, config);

    dispatch({ type: NEWS_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NEWS_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE News
export const createNEWs = (news) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEWS_CREATE_REQUEST });

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
      `/api/news/create_posts`,
      news,
      config
    );

    dispatch({ type: NEWS_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NEWS_CREATE_FAIL,
      payload: message,
    });
  }
};

// UPDATE news
export const updateNews = (id, news) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEWS_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await publicRequest.put(`/api/news/${id}`, news, config);
    data && dispatch({ type: NEWS_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
      dispatch({
        type: NEWS_UPDATE_RESET,
        payload: message,
      });
    }
    dispatch({
      type: NEWS_UPDATE_FAIL,
      payload: message,
    });
  }
};
