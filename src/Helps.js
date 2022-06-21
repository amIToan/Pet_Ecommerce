import axios from "axios";
const BASE_URL = "http://admin.giai.vn:5000";
export const ImageURL = "http://admin.giai.vn:5000/Images/";
// const BASE_URL = "http://localhost:5000";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
// export const ImageURL = "http://localhost:5000/Images/";
export const Currency = (x) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    x
  );
// "proxy": "http://admin.giai.vn:5000http://localhost:5000",
