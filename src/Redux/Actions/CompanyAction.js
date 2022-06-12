import {
  CREATE_COMPANY_FAILED,
  CREATE_COMPANY_INFO,
  CREATE_COMPANY_SUCCESS,
  GET_COMPANY_START,
  GET_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAILED,
  UPDATE_COMPANY_START,
  UPDATE_COMPANY_SUCCESS,
} from "../Constants/CompanyConsants";
import { publicRequest } from "../../Helps";
import { logout } from "./userActions";
// CREATE CompanyInfo
export const createCompanyInfo = (company) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_COMPANY_INFO });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await publicRequest.post(`/api/company/`, company, config);

    dispatch({ type: CREATE_COMPANY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CREATE_COMPANY_FAILED,
      payload: message,
    });
  }
};

// UPDATE CompanyInfo
export const updateCompanyInfo =
  (id, company) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_COMPANY_START });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await publicRequest.put(`/api/company/${id}`, company, config);
      data && dispatch({ type: UPDATE_COMPANY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: UPDATE_COMPANY_FAILED,
        payload: message,
      });
    }
  };

// Get company info

export const getCompanyInfo = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_COMPANY_START });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await publicRequest.get(`/api/company/`, config);

    dispatch({ type: GET_COMPANY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CREATE_COMPANY_FAILED,
      payload: message,
    });
  }
};
