import {
  BRANCH_CREATE_FAIL,
  BRANCH_CREATE_REQUEST,
  BRANCH_CREATE_RESET,
  BRANCH_CREATE_SUCCESS,
  BRANCH_UPDATE_FAIL,
  BRANCH_UPDATE_REQUEST,
  BRANCH_UPDATE_RESET,
  BRANCH_UPDATE_SUCCESS,
} from "../Constants/BranchConstant";
// create news
export const branchCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BRANCH_CREATE_RESET:
      return { loading: true };
    case BRANCH_CREATE_SUCCESS:
      return { loading: false, success: true, branch: action.payload };
    case BRANCH_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BRANCH_CREATE_REQUEST:
      return {};
    default:
      return state;
  }
};
// UPDATE NEWS
export const branchUpdateReducer = (state = { branch: {} }, action) => {
  switch (action.type) {
    case BRANCH_UPDATE_REQUEST:
      return { loading: true };
    case BRANCH_UPDATE_SUCCESS:
      return { loading: false, success: true, branch: action.payload };
    case BRANCH_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BRANCH_UPDATE_RESET:
      return { branch: {} };
    default:
      return state;
  }
};
