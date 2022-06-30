import "./OrderPage.scss";
import Map from "../../components/maps/Map";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import Loading from "../../components/Error.Loading/Loading";
import Message from "../../components/Error.Loading/Error";
import { useDispatch, useSelector } from "react-redux";
import { actionCreateOrder } from "../../redux/ApiRedux/apiRequest";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImageURL, Currency } from "../../RequestMethos";
import { resetOrder } from "../../redux/sliceReducer/OrderSlice";
import { clearCart } from "../../redux/sliceReducer/CartSlice";
const OrderPage = () => {
  let {
    Login: { currentUser },
    Cart,
    Order,
  } = useSelector((state) => state);
  const [itemsPrice, setItemsPrice] = useState(0);
  const { success, error, isFetching, OrderUser, message } = Order;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addDecimals = (num) => {
    return Math.round(num * 100) / 100;
  };

  useLayoutEffect(() => {
    if (Cart?.Cart?.length > 0) {
      const itemsPrice = addDecimals(
        Cart.Cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
      setItemsPrice(itemsPrice);
    }
  }, [Cart]);
  const handleUserOrder = () => {
    actionCreateOrder(
      {
        orderItems: Cart.Cart,
        shippingAddress: Cart.shippingAddress,
        paymentMethod: Cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: itemsPrice,
      },
      dispatch
    );
  };
  useEffect(() => {
    if (success) {
      toast("Your order is created!!!");
      navigate(`/orders/${OrderUser?._id}`);
      dispatch(resetOrder());
      dispatch(clearCart());
    }
  }, [dispatch, Order, success, error, navigate]);

  return (
    <>
      <Navbar />
      <Map />
      <ToastContainer />
      {isFetching && <Loading />}
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
                <p className="mb-1">{currentUser?.name}</p>
                <p className="mb-1">{currentUser?.email}</p>
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
                <p className="mb-1">{`Address : ${Cart?.shippingAddress?.address}, ${Cart?.shippingAddress?.city},${Cart?.shippingAddress?.country}`}</p>
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
                  Shipping: {Cart?.shippingAddress?.postalCode}
                </p>
                <p className="mb-1">Pay method: {Cart?.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
        {error && <Message variant={"alert-danger"}>{message}</Message>}
        <div className="row justify-content-between align-items-start py-3">
          <div className="col-12 col-md-8">
            {Cart?.Cart?.length > 0 &&
              Cart.Cart.map((item, index) => (
                <div
                  className=" row py-3"
                  style={{ borderBottom: "2px solid #f3f3f3" }}
                  key={index}
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
                  <td>{Currency(itemsPrice)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td>
                    <strong>Discount</strong>
                  </td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>{Currency(itemsPrice)}</td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              className="d-block btn w-100 bg-info text-white fw-bolder"
              onClick={handleUserOrder}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;
