import { publicRequest } from "../../Helps";
import {
  BRANCH_CREATE_REQUEST,
  BRANCH_CREATE_SUCCESS,
  BRANCH_UPDATE_FAIL,
  BRANCH_UPDATE_REQUEST,
  BRANCH_UPDATE_RESET,
  BRANCH_UPDATE_SUCCESS,
} from "../Constants/BranchConstant";
import { logout } from "./userActions";
// CREATE News
export const createBranch = (branch) => async (dispatch, getState) => {
  try {
    dispatch({ type: BRANCH_CREATE_REQUEST });
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
      `/api/news/branch`,
      branch,
      config
    );

    dispatch({ type: BRANCH_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BRANCH_UPDATE_RESET,
      payload: message,
    });
  }
};

// UPDATE news
export const updateBranch = (branch) => async (dispatch, getState) => {
  try {
    dispatch({ type: BRANCH_UPDATE_REQUEST });
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
      `/api/news/branch/unique`,
      branch,
      config
    );
    data && dispatch({ type: BRANCH_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
      dispatch({
        type: BRANCH_UPDATE_RESET,
        payload: message,
      });
    }
    dispatch({
      type: BRANCH_UPDATE_FAIL,
      payload: message,
    });
  }
};
