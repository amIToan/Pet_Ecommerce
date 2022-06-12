import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../components/LoadingError/Toast";
import { toast } from "react-toastify";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { DropzoneArea } from "material-ui-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { getBannerDetail, updateBanner } from "../Redux/Actions/BannerActions";
import {
  GET_BANNER_DETAIL_RESET,
  UPDATE_BANNER_RESET,
} from "../Redux/Constants/BannerConstants";
import { ImageURL } from "../Helps";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const ModifiedBanner = ({ match }) => {
  const dispatch = useDispatch();
  const bannerId = match.params.bannerId;
  const { loading, bannerInfo, error } = useSelector(
    (state) => state.BannerDetail
  );
  const [banner, setBanner] = useState({});
  const [image, setImage] = useState([]);
  const {
    loading: loadingUpdate,
    updatedBannerInfo,
    error: errorUpdate,
  } = useSelector((state) => state.updatedBanner);

  function changeLinkImage(params) {
    if (params?.length > 0) {
      const newLinkImages = params.map((item) => `${ImageURL}${item}`);
      return newLinkImages;
    }
  }
  useEffect(() => {
    dispatch(getBannerDetail(bannerId));
    if (updatedBannerInfo) {
      toast.success("You have updated Banner successfully", ToastObjects);
      dispatch({ type: UPDATE_BANNER_RESET });
    }
    return () => {
      dispatch({ type: GET_BANNER_DETAIL_RESET });
    };
  }, [updatedBannerInfo, dispatch, bannerId]);
  useEffect(() => {
    setBanner({ ...bannerInfo });
  }, [bannerInfo]);
  const handleUpdate = (e) => {
    e.preventDefault();
    const getFormData = (object) =>
      Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
      }, new FormData());
    const formData = getFormData(banner);
    for (const first in image) {
      if (image[first].length > 0) {
        image[first].forEach((item) => formData.append(first, item));
      }
    }
    dispatch(updateBanner(bannerId, formData));
  };

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <section className="content-main my-3" style={{ maxWidth: "1200px" }}>
          <Toast />
          <form onSubmit={handleUpdate}>
            <div className="content-header">
              <Link to="/banner" className="btn btn-danger text-white">
                Go to Banners
              </Link>
              <h2 className="content-title">Update Banner</h2>
              <div>
                <button type="submit" className="btn btn-primary">
                  Publish now
                </button>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-xl-8 col-lg-8">
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    {(error || errorUpdate) && (
                      <Message variant="alert-danger">{error}</Message>
                    )}
                    {(loading || loadingUpdate) && <Loading />}
                    <div className="mb-4">
                      <label htmlFor="bannerName" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        name="bannerName"
                        value={banner.bannerName ? banner.bannerName : ""}
                        required
                        onChange={(e) =>
                          setBanner({
                            ...banner,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="bannerPosition" className="form-label">
                        Position
                      </label>
                      <select
                        name="bannerPosition"
                        id="bannerPosition"
                        className="form-control"
                        onChange={(e) =>
                          setBanner({
                            ...banner,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                      >
                        <option
                          value="1"
                          selected={bannerInfo?.bannerPosition === 1 && true}
                        >
                          Đầu trang chủ
                        </option>
                        <option
                          value="2"
                          selected={bannerInfo?.bannerPosition === 2 && true}
                        >
                          {" "}
                          Giữa trang
                        </option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="bannerPosition" className="form-label">
                        Banner Images
                      </label>
                      {bannerInfo?.bannerUrlLink && (
                        <DropzoneArea
                          clearOnUnmount={true}
                          acceptedFiles={["image/*"]}
                          dropzoneText={"Drag and drop an image here or click"}
                          filesLimit={10}
                          previewGridClasses={{
                            item: "Mui-3",
                          }}
                          initialFiles={changeLinkImage(
                            bannerInfo?.bannerUrlLink
                          )}
                          name="uploadToan"
                          onChange={(files) => {
                            console.log(files);
                            if (Object.keys(files).length > 0) {
                              setImage({
                                ...image,
                                bannerUrlLink: files,
                              });
                            } else {
                              setImage({
                                ...image,
                                bannerUrlLink: [],
                              });
                            }
                          }}
                        />
                      )}
                      {!bannerInfo?.bannerUrlLink && (
                        <DropzoneArea
                          clearOnUnmount={true}
                          acceptedFiles={["image/*"]}
                          dropzoneText={"Drag and drop an image here or click"}
                          filesLimit={10}
                          previewGridClasses={{
                            item: "Mui-3",
                          }}
                          name="uploadToanImages"
                          onChange={(files) => {
                            console.log(files);
                            if (Object.keys(files).length > 0) {
                              setImage({
                                ...image,
                                bannerUrlLink: files,
                              });
                            } else {
                              setImage({
                                ...image,
                                bannerUrlLink: [],
                              });
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default ModifiedBanner;
