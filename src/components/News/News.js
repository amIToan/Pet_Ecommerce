import "./News.scss";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState, useEffect } from "react";
import publicRequest, { newsImageURL } from "../../RequestMethos";
import moment from "moment";
import { Link } from "react-router-dom";
const News = () => {
  const [state, setState] = useState();
  useEffect(() => {
    async function fetchingState() {
      const { data } = await publicRequest.get(
        `/news/all/?pageSize=12&pageNumber=1`
      );
      data.allPosts && setState(data.allPosts.slice(0, 4));
    }
    fetchingState();
    return () => {
      setState(null);
    };
  }, []);
  return (
    <div className="app_News_container mb-5">
      <div className="container">
        <div className="app_News_title">
          <h2>Tin tức</h2>
        </div>
        <div className="row">
          {state && state?.length > 0 ? (
            <>
              {state.map((item) => (
                <>
                  <div className="col-12 col-md-3">
                    <h3 className="app_News_subHeadline mb-3">
                      {item?.title.toUpperCase()}
                    </h3>
                    <img
                      src={`${newsImageURL}/${item?.image[0]}`}
                      alt="Mo ta san pham"
                      className="d-block img-fluid mb-3"
                      style={{ aspectRadio: 4 / 4 }}
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
                      <Link to={`news/details/${item._id}`}>Xem thêm</Link>
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <>
              <h3 className="app_News_subHeadline">No data ...</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
