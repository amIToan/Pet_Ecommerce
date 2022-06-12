import {
  GET_BANNER_DETAIL_FAILED,
  GET_BANNER_DETAIL_INFO,
  GET_BANNER_DETAIL_RESET,
  GET_BANNER_DETAIL_SUCCESS,
  GET_BANNER_FAILED,
  GET_BANNER_INFO,
  GET_BANNER_RESET,
  GET_BANNER_SUCCESS,
  UPDATE_BANNER_FAILED,
  UPDATE_BANNER_INFO,
  UPDATE_BANNER_RESET,
  UPDATE_BANNER_SUCCESS,
} from "../Constants/BannerConstants";

export const bannerInfoReducer = (
  state = { loading: false, bannerInfo: null, error: false },
  action
) => {
  switch (action.type) {
    case GET_BANNER_INFO:
      return { loading: true };
    case GET_BANNER_SUCCESS:
      return { loading: false, bannerInfo: action.payload, error: false };
    case GET_BANNER_FAILED:
      return { loading: false, error: action.payload };
    case GET_BANNER_RESET:
      return { loading: false, bannerInfo: null, error: false };
    default:
      return state;
  }
};
export const bannerInfoDetail = (
  state = { loading: false, bannerInfo: null, error: false },
  action
) => {
  switch (action.type) {
    case GET_BANNER_DETAIL_INFO:
      return { loading: true };
    case GET_BANNER_DETAIL_SUCCESS:
      return { loading: false, bannerInfo: action.payload, error: false };
    case GET_BANNER_DETAIL_FAILED:
      return { loading: false, error: action.payload };
    case GET_BANNER_DETAIL_RESET:
      return { loading: false, bannerInfo: null, error: false };
    default:
      return state;
  }
};
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
