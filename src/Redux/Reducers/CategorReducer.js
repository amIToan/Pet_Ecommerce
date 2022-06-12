import {
  CREATE_CATEGORY_FAILED,
  CREATE_CATEGORY_INFO,
  CREATE_CATEGORY_RESET,
  CREATE_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILED,
  GET_CATEGORY_INFO,
  GET_CATEGORY_RESET,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILED,
  UPDATE_CATEGORY_INFO,
  UPDATE_CATEGORY_RESET,
  UPDATE_CATEGORY_SUCCESS,
} from "../Constants/CategoryConstants";

export const createCategory = (
  state = { loading: false, createdCategory: null, error: false },
  action
) => {
  switch (action.type) {
    case CREATE_CATEGORY_INFO:
      return { loading: true };
    case CREATE_CATEGORY_SUCCESS:
      return { loading: false, createdCategory: action.payload, error: false };
    case CREATE_CATEGORY_FAILED:
      return { loading: false, error: action.payload, createdCategory: null };
    case CREATE_CATEGORY_RESET:
      return { loading: false, createdCategory: null, error: false };
    default:
      return state;
  }
};
export const updateCategory = (
  state = { loading: false, updatedCategory: null, error: false },
  action
) => {
  switch (action.type) {
    case UPDATE_CATEGORY_INFO:
      return { loading: true };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        updatedCategory: action.payload,
        error: false,
      };
    case UPDATE_CATEGORY_FAILED:
      return {
        loading: false,
        error: action.payload,
        updatedCategory: null,
      };
    case UPDATE_CATEGORY_RESET:
      return { loading: false, updatedCategory: null, error: false };
    default:
      return state;
  }
};

export const getAllCategory = (
  state = { loading: false, listOfCategory: null, error: false },
  action
) => {
  switch (action.type) {
    case GET_CATEGORY_INFO:
      return { loading: true };
    case GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        listOfCategory: action.payload,
        error: false,
      };
    case GET_CATEGORY_FAILED:
      return {
        loading: false,
        error: action.payload,
        listOfCategory: null,
      };
    case GET_CATEGORY_RESET:
      return { loading: false, listOfCategory: null, error: false };
    default:
      return state;
  }
};
