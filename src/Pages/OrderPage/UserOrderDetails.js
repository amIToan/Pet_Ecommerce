import "./OrderPage.scss";
import Map from "../../components/maps/Map";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import Loading from "../../components/Error.Loading/Loading";
import Message from "../../components/Error.Loading/Error";
import { useDispatch, useSelector } from "react-redux";
import { ImageURL } from "../../RequestMethos";
import { specifiedOrderAction } from "../../redux/ApiRedux/apiRequest";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { resetPayment } from "../../redux/sliceReducer/PaymentSlice";
import moment from "moment";
import { resetOrder } from "../../redux/sliceReducer/OrderSlice";
import { resetOrderDetail } from "../../redux/sliceReducer/DetailsOrder";
import DebitButton from "./DebitButton";
import PaypalButton from "./PaypalButton";
import { toast, ToastContainer } from "react-toastify";
import { Currency } from "../../RequestMethos";
const UserOrderDetails = () => {
  const addDecimals = (num) => {
    return Math.round(num * 100) / 100;
  };
  const [itemsPrice, setItemsPrice] = useState(0);
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const reduxState = useSelector((state) => state);
  const { OrderDetail, isFetching, error, message, update } =
    reduxState.SpecifiedOrder;
  useEffect(() => {
    async function specifiedOrder() {
      specifiedOrderAction(orderId, dispatch);
    }
    specifiedOrder();
    if (OrderDetail?.orderItems?.length > 0) {
      const itemsPrice = addDecimals(
        OrderDetail.orderItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );
      setItemsPrice(itemsPrice);
    }
    return () => {
      dispatch(resetOrderDetail());
    };
  }, [orderId, update, dispatch]);
  const {
    isLoading: paymentLoading,
    success: paymentSuccess,
    error: paymentError,
    isPending: paymentPending,
    message: paymentMess,
  } = reduxState.Payment;

  useEffect(() => {
    update && dispatch(resetOrder());
    if (paymentSuccess || paymentPending) {
      toast(
        "Chúc mừng bạn đã thanh toán thành công.Vui lòng chờ vận chuyển !!!"
      );
    }
    return () => {
      dispatch(resetPayment());
    };
  }, [update, paymentSuccess, paymentPending, dispatch]);
  return (
    <>
      <Navbar />
      <Map />
      {(isFetching || paymentLoading) && <Loading />}
      <ToastContainer />
      <div className="container my-5">
        <div className="app_OrderPage_Info row align-items-center justify-content-between bg-info py-5">
          <div className="col-12 col-md-4">
            <div className="row align-items-center justify-content-around">
              <div className="col-4 alert-success app_OrderPage_Icon">
                <i className="fas fa-user"></i>
              </div>
              <div className="col-8">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p className="mb-1">{OrderDetail?.user?.name}</p>
                <p className="mb-1">{OrderDetail?.user?.email}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="row align-items-center justify-content-around">
              <div className="col-4 alert-success app_OrderPage_Icon">
                <i className="fas fa-user"></i>
              </div>
              <div className="col-8">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p className="mb-1">{`Address : ${OrderDetail?.shippingAddress?.address}, ${OrderDetail?.shippingAddress?.city},${OrderDetail?.shippingAddress?.country}`}</p>
                {OrderDetail?.isDelivered ? (
                  <div className="bg-info p-2 col-12">
                    <p className="text-white text-center text-sm-start">
                      Paid on {moment(OrderDetail?.deliveredAt).calendar()}
                    </p>
                  </div>
                ) : (
                  <div className="bg-danger p-1 col-12">
                    <p className="text-white text-center text-sm-start m-1">
                      Not Delivered
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="row align-items-center justify-content-around">
              <div className="col-4 alert-success app_OrderPage_Icon">
                <i className="fas fa-truck-moving"></i>
              </div>
              <div className="col-8">
                <h5>
                  <strong>Order Info</strong>
                </h5>
                <p className="mb-1">
                  Shipping: {OrderDetail?.shippingAddress?.postalCode}
                </p>
                <p className="mb-1">Pay method: {OrderDetail?.paymentMethod}</p>
                {OrderDetail?.paymentMethod === "PayPal" &&
                OrderDetail?.isPaid === true ? (
                  <div className="bg-success p-2 col-12">
                    <p className="text-white text-center text-sm-start mb-1">
                      Paid on {moment(OrderDetail?.paidAt).calendar()}
                    </p>
                  </div>
                ) : OrderDetail?.isPaid === false &&
                  OrderDetail.paymentResult?.status === "Pending" ? (
                  <>
                    <div className="bg-success p-2 col-12">
                      <p className="text-white text-center text-sm-start mb-1">
                        Pending
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="bg-danger p-2 col-12">
                    <p className="text-white text-center text-sm-start m-1">
                      Not Paid
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {(paymentError || error) && (
          <Message variant={"alert-danger"}>{message || paymentMess}</Message>
        )}
        <div className="row justify-content-between align-items-start py-3">
          <div className="col-12 col-md-8">
            {OrderDetail?.orderItems?.length > 0 &&
              OrderDetail.orderItems.map((item) => (
                <div
                  style={{ borderBottom: "2px solid #f3f3f3" }}
                  className=" row py-3"
                  key={item._id || item.product}
                >
                  <div className="col-md-3 col-6">
                    <img
                      src={`${ImageURL}/${item.image[0]}`}
                      alt={item.name}
                      className="d-block img-fluid ratio ratio-1x1"
                    />
                  </div>
                  <div className="col-md-5 col-6 d-flex align-items-center justify-content-center">
                    <Link
                      to={`/details/${item.product}`}
                      className="text-center text-decoration-none "
                    >
                      <h6>{item.name}</h6>
                    </Link>
                  </div>
                  <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                    <h6>QUANTITY</h6>
                    <h6>{item.quantity}</h6>
                  </div>
                  <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-center  d-flex flex-column justify-content-center ">
                    <h6>SUBTOTAL</h6>
                    <h6>{`${Currency(item.quantity * item.price)}`}</h6>
                  </div>
                </div>
              ))}
            <div className="d-flex align-items-center justify-content-start mt-3 mt-md-4">
              <button
                type="button"
                className="btn btn-info text-white w-25 me-3"
              >
                Nhập mã giảm giá
              </button>
              <input type="text" className="form-control w-50" />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <table className="table" style={{ backgroundColor: "#f3f3f3" }}>
              <tbody>
                <tr>
                  <td>
                    <strong>Product Cost</strong>
                  </td>
                  <td>${Currency(itemsPrice)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>{OrderDetail?.shippingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>{OrderDetail?.taxPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Discount</strong>
                  </td>
                  <td>$0.00</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>{Currency(OrderDetail?.totalPrice)}</td>
                </tr>
              </tbody>
            </table>
            {OrderDetail?.paymentMethod === "Domestic" &&
              OrderDetail.paymentResult?.status !== "Pending" && (
                <>
                  <DebitButton
                    orderId={orderId}
                    dispatch={dispatch}
                    OrderDetail={OrderDetail}
                  />
                </>
              )}
            {OrderDetail?.paymentMethod === "PayPal" &&
              OrderDetail?.isPaid === false &&
              paymentSuccess !== true && (
                <>
                  <div className="col-12">
                    <PaypalButton
                      totalPrice={OrderDetail?.totalPrice}
                      orderId={orderId}
                      dispatch={dispatch}
                      OrderDetail={OrderDetail}
                    />
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserOrderDetails;
