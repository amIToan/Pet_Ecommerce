import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GetOrderList } from "../../redux/ApiRedux/apiRequest";
import { resetOrderList } from "../../redux/sliceReducer/OrderLists";
import Loading from "../Error.Loading/Loading";
import Message from "../Error.Loading/Error";
import moment from "moment";
const UserOrderList = () => {
  const dispatch = useDispatch();
  const { loading, orderLists, error } = useSelector(
    (state) => state.OrderList
  );
  useEffect(() => {
    GetOrderList(dispatch);
    return () => {
      dispatch(resetOrderList());
    };
  }, [dispatch]);
  return (
    <>
      {loading && <Loading />}
      {error && <Message variant={"alert-danger"}>{error.message}</Message>}
      <div className="d-flex justify-content-center align-items-center">
        {orderLists?.length > 0 ? (
          <div className="col-12 table-responsive mt-3">
            <table className="table">
              <thead className="bg-info">
                <tr>
                  <th>ID</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {orderLists?.map((item) => (
                  <tr
                    className={item.isPaid ? "alert-success" : "alert-danger"}
                    key={item._id}
                  >
                    <td>
                      <Link
                        to={`/orders/${item._id}`}
                        className="text-decoration-none text-black fw-bolder"
                      >
                        {item._id}
                      </Link>
                    </td>
                    <td>
                      {item.isPaid ? (
                        <span>Paid</span>
                      ) : item.isPending ? (
                        <span>Pending</span>
                      ) : (
                        <span>Not Paid</span>
                      )}
                    </td>
                    <td>
                      {item.isPaid
                        ? moment(item.paidAt).calendar()
                        : moment(item.createdAt).calendar()}
                    </td>
                    <td>{item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="col-12 alert alert-info text-center mt-3">
            No Orders
            <Link
              className="btn btn-success mx-2 px-3 py-2"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              START SHOPPING
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default UserOrderList;
