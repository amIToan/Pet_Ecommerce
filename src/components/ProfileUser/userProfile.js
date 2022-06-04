import Map from "../maps/Map";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/footer";
import { useState, useLayoutEffect, useRef } from "react";
import "./userProfile.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ImageURL } from "../../RequestMethos";
import { updatedUser } from "../../redux/ApiRedux/apiRequest";
import { createAxios } from "../../RequestMethos";
import { loginSuccess } from "../../redux/sliceReducer/LoginSlice";
import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import UserOrderList from "./userOrderList";
const UserProfile = () => {
  const dispatch = useDispatch();
  const [nav, setNav] = useState(false);
  const [state, setState] = useState({});
  const userInfo = useSelector((state) => state.Login.currentUser);
  const axiosJWT = createAxios(userInfo, loginSuccess, dispatch);
  useLayoutEffect(() => {
    setState({ ...state, name: userInfo.name, email: userInfo.email });
  }, [userInfo, dispatch]);
  const handleUpdate = (e) => {
    e.preventDefault();
    if (state.password !== state.confirmedpassword) {
      toast.error(
        "The password is not like the comfirmed password! Pleas, try again!"
      );
    } else {
      const getFormData = (object) =>
        Object.keys(object).reduce((formData, key) => {
          formData.append(key, object[key]);
          return formData;
        }, new FormData());
      const formData = getFormData(state);
      const resultUpdate = updatedUser(formData, dispatch, axiosJWT);
      resultUpdate
        ? toast("You've updated successfully!")
        : toast("You've updated failed! Please, try again!");
    }
  };
  const getSrcAva = useRef();
  const handleUploadImg = (e) => {
    const File = e.target.files[0];
    getSrcAva.current.src = URL.createObjectURL(File);
    setState({ ...state, [e.target.name]: e.target.files[0] });
  };
  return (
    <>
      <Navbar />
      <Map />
      <div className="container  mt-lg-5 mt-3 mb-5">
        <div className="row align-items-start justify-content-between">
          <div className="col-12 col-md-4 p-0 shadow">
            <div className="app_UserProfile_Top pb-0">
              <div className="app_UserProfile_ImgCover"></div>
              <div className="app_UserProfile_Info">
                <h5>{userInfo?.name}</h5>
                <p>Joined {moment(userInfo.createdAt).format("LL")}</p>
              </div>
              <div className="app_Userprofile_Avatar">
                <div
                  className="position-relative"
                  style={{ height: "100%", width: "100%" }}
                >
                  <img
                    src={
                      userInfo?.avatar
                        ? `${ImageURL}/${userInfo.avatar}`
                        : `${ImageURL}/avatar.jpg`
                    }
                    ref={getSrcAva}
                    alt="avatar"
                    className="d-block rounded-circle app_Userprofile_Avatar_Img"
                  />
                  <div className="app_UserProfile_upload">
                    <label htmlFor="avatar" style={{ padding: 0, margin: 0 }}>
                      <LinkedCameraIcon className="d-block w-100" />
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="avatar"
                      id="avatar"
                      style={{ width: "0px", opacity: 0 }}
                      onChange={handleUploadImg}
                      onLoad={() => {
                        URL.revokeObjectURL(getSrcAva.current.src); // free memory
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="app_UserProfile_ToggleContent">
              <div
                className={
                  !nav
                    ? "d-block text-start w-100 fw-bold bg-light p-3"
                    : "d-block text-start w-100 p-3"
                }
                onClick={() => setNav(false)}
              >
                Profile Setting
              </div>
              <div
                className={
                  nav
                    ? "d-block text-start w-100 fw-bold bg-light p-3 "
                    : "d-block text-start w-100 p-3 "
                }
                onClick={() => setNav(true)}
              >
                Order Lists
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 ">
            {!nav ? (
              <>
                <form method="post" className="mt-3" onSubmit={handleUpdate}>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                  {/* Same as */}
                  <ToastContainer />
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <label htmlFor="username" className="form-label">
                        User Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="UserName"
                        name="name"
                        onChange={(e) =>
                          setState({
                            ...state,
                            [e.target.name]: e.target.value,
                          })
                        }
                        value={state.name}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="Email" className="form-label">
                        Email Adress
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="Email"
                        name="Email"
                        onChange={(e) =>
                          setState({
                            ...state,
                            [e.target.name]: e.target.value,
                          })
                        }
                        value={state.email}
                      />
                      <div className="form-text">
                        We'll never share your email with anyone else.
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={(e) =>
                          setState({
                            ...state,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="confirmedpassword" className="form-label">
                        Confirmed Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmedpassword"
                        name="confirmedpassword"
                        onChange={(e) =>
                          setState({
                            ...state,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-12 mt-4">
                      <button className=" btn d-block fw-bold w-100 bg-info p-2">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <>
                <UserOrderList />
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
