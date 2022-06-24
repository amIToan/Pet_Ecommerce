import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import { publicRequest } from "../../Helps";
import SinglePost from "./SinglePost";
const MainLists = () => {
  const [news, setNews] = useState(null);
  const [reset, setReset] = useState(null);
  const {
    userLogin: { userInfo },
  } = useSelector((state) => state);
  useEffect(() => {
    async function fetchingNews() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await publicRequest.get(
        `/api/news/all?pageSize=100&pageNumber=1`,
        config
      );
      data.allPosts && setNews(data.allPosts);
    }
    fetchingNews();
    return () => {
      setNews(null);
      setReset(null);
    };
  }, [reset]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">News</h2>
        <div>
          <Link to="/addnews" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>All category</option>
                <option>Electronics</option>
                <option>Clothings</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          {!news || reset ? (
            <Loading />
          ) : (
            <div className="row">
              {news &&
                news.length > 0 &&
                news.map((news) => (
                  <SinglePost Post={news} setReset={setReset} />
                ))}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainLists;
