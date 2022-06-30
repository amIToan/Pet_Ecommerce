import Map from "../components/maps/Map";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/footer/footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCartMethod } from "../redux/sliceReducer/CartSlice";
const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { shippingAddress, paymentMethod } = useSelector((state) => state.Cart);
  const [payment, setPayment] = useState(
    paymentMethod ? paymentMethod : "Domestic"
  );
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [dispatch, shippingAddress, paymentMethod, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!payment) return;
    dispatch(saveCartMethod(payment));
    navigate("/placeorder");
  };
  return (
    <>
      <Navbar />
      <Map />
      <div className="container-fluid">
        <div className="container d-flex flex-column justify-content-center align-items-center py-5">
          <form
            className="col-md-8 col-lg-4 col-11"
            style={{
              background: "#fff",
              borderRadius: "5px",
              position: "relative",
              padding: "35px 30px 30px",
              boxShadow: "0 1px 11px hsl(0deg 0% 66% / 27%)",
              textAlign: "left",
            }}
          >
            <h6 className="text-center">DELIVERY ADDRESS</h6>
            <div className="py-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Payment"
                  id="Payment1"
                  value="PayPal"
                  onClick={(e) => setPayment(e.target.value)}
                />
                <label className="form-check-label px-3" htmlFor="Payment1">
                  PayPal or Credit Card
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Payment"
                  id="Payment2"
                  value="Domestic"
                  defaultChecked
                  onClick={(e) => setPayment(e.target.value)}
                />
                <label className="form-check-label px-3" htmlFor="Payment2">
                  Domestic payment card
                </label>
              </div>
              <button
                type="submit"
                className="d-block btn bg-info w-100 fw-bolder text-white my-3 p-3"
                onClick={submitHandler}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
