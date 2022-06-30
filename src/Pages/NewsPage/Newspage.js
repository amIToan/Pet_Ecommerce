import Map from "../../components/maps/Map";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import moment from "moment";
import Loading from "../../components/Error.Loading/Loading";
import Message from "../../components/Error.Loading/Error";
import publicRequest from "../../RequestMethos";
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import { newsImageURL } from "../../RequestMethos";
import Pagination from "../../components/Pagination/Pagination";
import "../../components/News/News.scss";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
async function fetchingData(pageNumber = 1) {
  const { data } = await publicRequest.get(
    `/news/all/?pageSize=16&pageNumber=${pageNumber}`
  );
  return data;
}
const Newspage = () => {
  const { pageNumber } = useParams();
  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    ["pagination", pageNumber],
    () => fetchingData(pageNumber),
    {
      keepPreviousData: true,
      cacheTime: 600000,
      staleTime: 300000,
    }
  );
  return (
    <>
      <Navbar />
      <Map />
      {isLoading && <Loading />}
      {isError && <Message variant={"alert-danger"}>{isError}</Message>}
      <div className="app_News_container container my-4">
        <div className="row">
          {data?.allPosts?.length > 0 ? (
            data.allPosts.map((item) => (
              <>
                <div className="col-12 col-md-3" key={item._id}>
                  <h3 className="app_News_subHeadline mb-3">{item?.title}</h3>
                  <img
                    src={`${newsImageURL}/${item?.image[0]}`}
                    alt="Mo ta san pham"
                    className="d-block img-fluid mb-3"
                  />
                  <div
                    className="app_News_shortDesc"
                    dangerouslySetInnerHTML={{
                      __html: item.description.slice(0, 150) + "...",
                    }}
                  />
                  <div className="app_News_Date">
                    <CalendarMonthIcon />
                    {moment(item.createdAt).calendar()}
                  </div>
                  <div className="app_News_forMore">
                    <Link to={`/news/details/${item._id}`}>Xem thêm</Link>
                  </div>
                </div>
              </>
            ))
          ) : (
            <div className="col-12 alert alert-danger fw-bolder fs-3">
              Không có thông tin về dữ liệu!!!
            </div>
          )}
          <div className="col-12">
            <Pagination pages={data?.pages} page={data?.page} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Newspage;
