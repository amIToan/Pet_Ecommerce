import "./Header.scss";
import CustomizedBadges from "./Carticon";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import english from "../../assets/images/english.png";
import vietnam from "../../assets/images/vietnam.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector, useDispatch } from "react-redux";
import { ImageURL } from "../../RequestMethos";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/ApiRedux/apiRequest";
import { loginSuccess } from "../../redux/sliceReducer/LoginSlice";
import { memo } from "react";
import Loading from "../Error.Loading/Loading";
import Message from "../Error.Loading/Error";
import { createAxios } from "../../RequestMethos";
const Header = () => {
  const cartLength = useSelector((state) => state.Cart.Cart);
  const { companyInfo } = useSelector((state) => state.Company);
  const {
    currentUser: user,
    isFetching,
    error,
    message,
  } = useSelector((state) => state.Login);
  const handleUserOptions = (e) => {
    const nextElemet = e.currentTarget.nextSibling;
    nextElemet.classList.toggle("d-none");
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(user, loginSuccess, dispatch);
  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(dispatch, navigate, axiosJWT);
  };
  const Title = window.location.pathname.split("/")[1]
  document.title = Title ? Title : "PetShop"
  return (
    <header className="header-top container-fluid">
      {isFetching && <Loading />}
      {error && <Message>{message}</Message>}
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-5 col-xs-12 app_header_display">
            <div className="phone d-none d-md-inline-block">
              <strong>Hotline:</strong>{" "}
              <span>{companyInfo && companyInfo[0]?.Hotline}</span>
            </div>
            <div className="welcome-msg d-none d-md-inline-block">
              {" "}
              Chào mừng các bạn đến với{" "}
              <b>{companyInfo && companyInfo[0]?.companyName}</b>{" "}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-5 col-xs-12 d-flex justify-content-end align-items-center">
            {user ? (
              <>
                <div className="position-relative">
                  <div className="app_header_User" onClick={handleUserOptions}>
                    <img
                      src={
                        user?.avatar
                          ? `${ImageURL}/${user.avatar}`
                          : `${ImageURL}/avatar.jpg`
                      }
                      alt="avatar"
                      className="d-block rounded-circle"
                    />
                    <div className="app_header_user_name">{user.name}</div>
                    <KeyboardArrowDownIcon />
                  </div>
                  <div className=" d-flex flex-column justify-content-center align-items-center shadow app_header_user_options d-none">
                    <Link to={"/userProfile"}>User Profile</Link>
                    <a href="/" onClick={handleLogout}>
                      Log out
                    </a>
                  </div>
                </div>
                <div className="app_header_badge app_header_borderright ">
                  <Link to={"/cart"}>
                    <CustomizedBadges quantity={cartLength?.length} />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="app_header_register px-1 app_header_cursor">
                  <span>
                    <HowToRegIcon />
                  </span>
                  <Link
                    to="/register"
                    className=" text-decoration-none text-dark app_header_display"
                  >
                    Đăng ký
                  </Link>
                </div>
                <div className="app_header_borderright px-1 app_header_cursor">
                  <span>
                    <LoginIcon />
                  </span>
                  <Link
                    to="/login"
                    className="text-decoration-none text-dark app_header_display"
                  >
                    Đăng Nhập
                  </Link>
                </div>
                <div className="app_header_badge app_header_borderright ">
                  <Link to={"/cart"}>
                    <CustomizedBadges quantity={cartLength?.length} />
                  </Link>
                </div>
              </>
            )}
            <div className="app_header_languages px-2">
              <div className="app_header_languages_VietNam app_header_cursor">
                <img src={vietnam} alt="Viet Nam" />
                <span className="app_header_display">Tiếng Việt</span>
                <KeyboardArrowDownIcon
                  fontSize="10"
                  className="app_header_display"
                />
              </div>
              <div className="app_header_languages_English app_header_cursor">
                <span>
                  <img src={english} alt="english" />
                </span>
                <span>English</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
