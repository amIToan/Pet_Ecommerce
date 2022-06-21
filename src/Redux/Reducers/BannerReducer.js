import {
  UPDATE_BANNER_FAILED,
  UPDATE_BANNER_INFO,
  UPDATE_BANNER_RESET,
  UPDATE_BANNER_SUCCESS,
} from "../Constants/BannerConstants";
export const updateBannerInfo = (
  state = { loading: false, updatedBannerInfo: null, error: false },
  action
) => {
  switch (action.type) {
    case UPDATE_BANNER_INFO:
      return { loading: true };
    case UPDATE_BANNER_SUCCESS:
      return {
        loading: false,
        updatedBannerInfo: action.payload,
        error: false,
      };
    case UPDATE_BANNER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_BANNER_RESET:
      return { loading: false, updatedBannerInfo: null, error: false };
    default:
      return state;
  }
};
