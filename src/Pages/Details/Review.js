import { useState } from "react";
import { createReview } from "../../redux/ApiRedux/apiRequest";
import { useDispatch } from "react-redux";
const Review = ({ productId }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState({});

  return (
    <>
      <h6>WRITE A CUSTOMER REVIEW</h6>
      <form>
        <div className="my-4">
          <strong>Rating</strong>
          <select
            className="col-12 bg-light p-3 mt-2 border-0 rounded form-control"
            name="rating"
            onChange={(e) =>
              setReview({ ...review, [e.target.name]: e.target.value })
            }
            required
          >
            <option>Select...</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <div className="my-4">
          <strong>Comment</strong>
          <textarea
            row="3"
            className=" form-control col-12 bg-light p-3 mt-2 border-0 rounded"
            name="comment"
            onChange={(e) =>
              setReview({ ...review, [e.target.name]: e.target.value })
            }
            required
          ></textarea>
        </div>
        <div className="my-3">
          <button
            className="col-12 bg-info border-0 p-3 rounded text-black fw-bold"
            onClick={(e) => {
              e.preventDefault();
              createReview(productId, review, dispatch);
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Review;
