import axios from "axios";
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://admin.giai.vn:5000"
    : "http://localhost:5000";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const ImageURL =
  process.env.NODE_ENV === "production"
    ? "https://admin.giai.vn:5000/Images/"
    : "http://localhost:5000/Images/";
export const newsURL =
  process.env.NODE_ENV === "production"
    ? "https://admin.giai.vn:5000/Images/News/"
    : "http://localhost:5000/Images/News/";
export const Currency = (x) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    x
  );
