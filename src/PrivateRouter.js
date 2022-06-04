import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { memo } from "react";
import jwt_decode from "jwt-decode";
const PrivateRouter = () => {
  let timeDate = new Date();
  const accessToken = useSelector((state) => state.Login?.currentUser?.token);
  const decodedToken = accessToken && jwt_decode(accessToken);
  if (!accessToken || (decodedToken?.exp < timeDate?.getTime() / 1000)) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};
export default memo(PrivateRouter);
