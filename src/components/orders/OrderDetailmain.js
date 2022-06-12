import { useEffect, useRef } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../Redux/Actions/OrderActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";
import Toast from "../LoadingError/Toast";
// import { toast } from "react-toastify";
import { updatedOrderAction } from "../../Redux/Actions/OrderActions";
import { ORDER_UPDATE_RESET } from "../../Redux/Constants/OrderConstants";
// const ToastObjects = {
//   pauseOnFocusLoss: false,
//   draggable: false,
//   pauseOnHover: false,
//   autoClose: 2000,
// };
const OrderDetailmain = (props) => {
  const { orderId, order } = props;
  const dispatch = useDispatch();
  const updateOrderInfo = useRef();
  // const orderDetails = useSelector((state) => state.orderDetails);
  const {
    loading: loadingUpdate,
    error: updateError,
    success: updateSuccess,
  } = useSelector((state) => state.orderUpdate);
  const updateOrderHandler = () => {
    dispatch(updatedOrderAction(orderId, updateOrderInfo.current));
  };
  useEffect(() => {
    if (updateSuccess) {
      alert("The order have been updated");
      dispatch({ type: ORDER_UPDATE_RESET });
    }
  }, [updateSuccess]);
  return (
    <section className="content-main">
      <Toast />
      <div className="content-header">
        <Link to="/orders" className="btn btn-dark text-white">
          Back To Orders
        </Link>
      </div>

      {loadingUpdate ? (
        <Loading />
      ) : updateError ? (
        <Message variant="alert-danger">{updateError}</Message>
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(order && order.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Order ID: {order && order._id}
                </small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <select
                  className="form-select d-inline-block"
                  style={{ maxWidth: "200px" }}
                >
                  <option>Change status</option>
                  <option>Awaiting payment</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
                <Link className="btn btn-success ms-2" to="#">
                  <i className="fas fa-print"></i>
                </Link>
              </div>
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            {order && <OrderDetailInfo order={order} />}

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  {order && <OrderDetailProducts
                    order={order}
                    loading={Loading}
                    ref={updateOrderInfo}
                  />}

                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  <button
                    className="btn btn-primary col-12 text-white"
                    onClick={updateOrderHandler}
                  >
                    Update the order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetailmain;
