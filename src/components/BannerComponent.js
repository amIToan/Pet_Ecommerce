import { Link } from "react-router-dom";
import moment from "moment";
import { getBannerLists } from "../Redux/Actions/BannerActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_BANNER_RESET } from "../Redux/Constants/BannerConstants";
import Loading from "./LoadingError/Loading";
import Message from "./LoadingError/Error";
import { ImageURL } from "../Helps";
const BannerComponent = () => {
  const dispatch = useDispatch();
  const { loading, bannerInfo, error } = useSelector(
    (state) => state.BannerList
  );
  useEffect(() => {
    dispatch(getBannerLists());
    return () => {
      dispatch({ type: GET_BANNER_RESET });
    };
  }, [dispatch]);
  console.log(bannerInfo);
  return (
    <div className="container-fluid">
      <div className="container">
        <table className="table">
          {loading && <Loading />}
          {error && <Message />}
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Image</th>
              <th scope="col">Created Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {bannerInfo?.length > 0 ? (
              bannerInfo.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>
                    <img
                      src={`${ImageURL}${item.bannerUrlLink[0]}`}
                      alt={item.bannerName}
                      style={{ width: "100px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.bannerName}</td>
                  <td>{moment(item.createdAt).format("MMM Do YY")}</td>
                  <td className="d-flex justify-content-center align-item-center">
                    <Link to={`/banner/${item._id}`} className="text-success">
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerComponent;
