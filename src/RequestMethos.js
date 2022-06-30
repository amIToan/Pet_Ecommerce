import jwt_decode from "jwt-decode";
import axios from "axios";
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://admin.giai.vn:5000/api"
    : "http://localhost:5000/api";
axios.defaults.withCredentials = true;
const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  credentials: "include",
});
// api refreshToken
const refreshTokenFunc = async () => {
  try {
    const res = await publicRequest.post("/users/refresh", "", {
      withCredentials: true,
      credentials: "include",
    });
    return res.data;
  } catch (error) {}
};
export const createAxios = (user, stateSuccess, dispatch) => {
  let axiosJWT = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    credentials: "include",
  });
  axiosJWT.interceptors.request.use(
    async (config) => {
      let timeDate = new Date();
      const decodedToken = jwt_decode(user?.token);
      if (decodedToken.exp < timeDate.getTime() / 1000) {
        const newTokens = await refreshTokenFunc();
        const refreshUser = {
          ...user,
          token: newTokens.token,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["authorization"] = "Bearer " + newTokens.token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  return axiosJWT;
};
export const Config = () => {
  const token = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.Login
  ).currentUser?.token;
  if (token) {
    return {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
  } else {
    return false;
  }
};
export const ImageURL =
  process.env.NODE_ENV === "production"
    ? "http://admin.giai.vn:5000/Images"
    : "http://localhost:5000/Images";
export const newsImageURL =
  process.env.NODE_ENV === "production"
    ? "http://admin.giai.vn:5000/Images/News"
    : "http://localhost:5000/Images/News";
export const toastConfig = {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};
export const Currency = (x) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    x
  );
export default publicRequest;
