import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteNEWS } from "../../Redux/Actions/NewsAction";
import { newsURL } from "../../Helps";
//const news = process.env.NODE_ENV;
const SinglePost = (props) => {
  const { Post, setReset } = props;
  const dispatch = useDispatch();
  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteNEWS(id));
      setReset(true);
    }
  };
  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={`${newsURL}${Post.image[0]}`} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {Post.title}
            </Link>
            <div className="row">
              <Link
                to={`/news/${Post._id}`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(Post._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SinglePost;
