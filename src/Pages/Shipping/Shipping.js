import Map from "../../components/maps/Map";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCartAddress } from "../../redux/sliceReducer/CartSlice";
const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const oldAddress = useSelector((state) => state.Cart.shippingAddress);
  const [state, setState] = useState(oldAddress ? oldAddress : {});
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveCartAddress(state));
    navigate("/payment");
  };
  return (
    <>
      <Navbar />
      <Map />
      <div className="container-fluid">
        <div className="container d-flex flex-column justify-content-center align-items-center py-5">
          <form className="app_Login col-md-8 col-lg-4 col-11">
            <h6>DELIVERY ADDRESS</h6>
            <input
              type="text"
              placeholder="Enter address"
              name="address"
              className="form-control"
              value={state.address}
              onChange={(e) =>
                setState({ ...state, [e.target.name]: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Enter city"
              name="city"
              className="form-control"
              value={state.city}
              onChange={(e) =>
                setState({ ...state, [e.target.name]: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Enter postal code"
              name="postalCode"
              value={state.postalCode}
              className="form-control"
              onChange={(e) =>
                setState({ ...state, [e.target.name]: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Enter country"
              name="country"
              value={state.country}
              className="form-control"
              onChange={(e) =>
                setState({ ...state, [e.target.name]: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="text-white"
              onClick={submitHandler}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shipping;
