import {
  CREATE_CATEGORY_FAILED,
  CREATE_CATEGORY_INFO,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILED,
  DELETE_CATEGORY_LOADING,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILED,
  GET_CATEGORY_INFO,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILED,
  UPDATE_CATEGORY_INFO,
  UPDATE_CATEGORY_SUCCESS,
} from "../Constants/CategoryConstants";
import { logout } from "./userActions";
import { publicRequest } from "../../Helps";

export const createCategoryAction =
  (Category) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_CATEGORY_INFO });

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
        `/api/categories/create`,
        Category,
        config
      );

      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CREATE_CATEGORY_FAILED,
        payload: message,
      });
    }
  };

export const getListOfCate = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CATEGORY_INFO });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await publicRequest.get(`/api/categories/get`, config);
    data && dispatch({ type: GET_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: GET_CATEGORY_FAILED,
      payload: message,
    });
  }
};
export const updatedCate = (id, formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_INFO });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await publicRequest.put(`/api/categories/${id}`, formData, config);
    data && dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: UPDATE_CATEGORY_FAILED,
      payload: message,
    });
  }
};
export const deleteCategoryAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_CATEGORY_LOADING });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await publicRequest.delete(`/api/categories/${id}`, config);
    console.log(data);
    data && dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed")
    {
      dispatch(logout());
    }
    dispatch({
      type: DELETE_CATEGORY_FAILED,
      payload: message,
    });
  }
}
