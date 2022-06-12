// POST AND EDIT COMPANY INFO

import {
  CREATE_COMPANY_FAILED,
  CREATE_COMPANY_INFO,
  CREATE_COMPANY_SUCCESS,
  GET_COMPANY_FAILED,
  GET_COMPANY_START,
  GET_COMPANY_SUCCESS,
  RESET_COMPANY,
  RESET_COMPANY_ACTION,
  UPDATE_COMPANY_FAILED,
  UPDATE_COMPANY_START,
  UPDATE_COMPANY_SUCCESS,
} from "../Constants/CompanyConsants";

// Create PRODUCT
export const companyCreateUpdateReducer = (
  state = { loading: false, companyInfo: null, error: false },
  action
) => {
  switch (action.type) {
    case CREATE_COMPANY_INFO:
      return { loading: true };
    case CREATE_COMPANY_SUCCESS:
      return { loading: false, companyInfo: action.payload, error: false };
    case CREATE_COMPANY_FAILED:
      return { loading: false, error: action.payload, companyInfo: null };
    case RESET_COMPANY_ACTION:
      return { loading: false, companyInfo: null, error: false };
    default:
      return state;
  }
};
export const UpdateCompanyInfo = (
  state = { loading: false, updatedCompanyInfo: null, error: false },
  action
) => {
  switch (action.type) {
    case UPDATE_COMPANY_START:
      return { loading: true };
    case UPDATE_COMPANY_SUCCESS:
      return {
        loading: false,
        updatedCompanyInfo: action.payload,
        error: false,
      };
    case UPDATE_COMPANY_FAILED:
      return {
        loading: false,
        error: action.payload,
        updatedCompanyInfo: null,
      };
    case RESET_COMPANY_ACTION:
      return { loading: false, updatedCompanyInfo: null, error: false };
    default:
      return state;
  }
};

// Get company Info
export const getCompanyReducer = (
  state = { loading: false, companyInfo: null, error: false },
  action
) => {
  switch (action.type) {
    case GET_COMPANY_START:
      return { loading: true };
    case GET_COMPANY_SUCCESS:
      return { loading: false, companyInfo: action.payload, error: false };
    case GET_COMPANY_FAILED:
      return { loading: false, error: action.payload, companyInfo: null };
    case RESET_COMPANY:
      return { loading: false, companyInfo: null, error: false };
    default:
      return state;
  }
};
