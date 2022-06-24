import "./Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addToCart, removeCartItem } from "../../redux/sliceReducer/CartSlice";
import { ImageURL, Config, Currency } from "../../RequestMethos";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CartList = useSelector((state) => state.Cart.Cart);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleQuantityChange = (e, item) => {
    const max = +e.target.getAttribute("max");
    if (e.target.value <= max) {
      setQuantity(e.target.value);
      dispatch(
        addToCart({
          ...item,
          quantity: parseInt(e.target.value ? e.target.value : 1),
        })
      );
    } else {
      alert(`Number too big! Max is ${max}`);
      setQuantity(1);
    }
  };
  useEffect(() => {
    const totalPrice =
      CartList?.length > 0 &&
      CartList.reduce(
        (acc, curVal) => (acc += curVal.quantity * curVal.price),
        0
      );
    setTotalPrice(totalPrice);
  }, [quantity, CartList]);
  const checkOutHandler = () => {
    if (Config) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="container my-5">
      {CartList?.length > 0 ? (
        <>
          <div className=" alert alert-info text-center mt-3">
            Total Cart Products
            <h6 className="text-success mx-2 d-inline-block">
              ({CartList.length})
            </h6>
          </div>
          {/* render cart */}
          {CartList.map((item) => (
            <div
              className="row justify-content-center align-items-center app_CartItem_container"
              key={item.product}
            >
              <div
                className="app_CartItem_removeButton d-flex justify-content-center align-items-center"
                onClick={() => dispatch(removeCartItem(item))}
              >
                <i className="fas fa-times"></i>
              </div>
              <div className="col-12 col-md-3">
                <img
                  src={`${ImageURL}/${item.image[0]}`}
                  alt={item.name}
                  className="d-block w-100 img-fluid"
                  style={{ aspectRadio: 4 / 4 }}
                />
              </div>
              <div className="col-12 col-md-3 fw-bolder fs-5 text-center">
                {item.name}
              </div>
              <div className="col-12 col-md-3">
                <h6 className="text-left" style={{ color: "#8c8c8c" }}>
                  Quantity:
                </h6>
                <input
                  type="number"
                  className="form-control"
                  min={1}
                  max={item.countInStock}
                  step={1}
                  value={item.countInStock ? item.quantity : 0}
                  onChange={(e) => {
                    handleQuantityChange(e, item);
                  }}
                  style={{ maxWidth: "200px" }}
                  disabled={item.countInStock ? false : true}
                />
              </div>
              <div className="col-12 col-md-3">
                <h6 className="text-left" style={{ color: "#8c8c8c" }}>
                  Sub Total:
                </h6>
                <h5 className="text-left Price">
                  {item.countInStock ? Currency(item.price * item.quantity) : 0}
                </h5>
              </div>
            </div>
          ))}
          {/* End of cart items */}
          <div className="app_CartItem_Total">
            <span>Total:</span>
            <span>{totalPrice && Currency(totalPrice)}</span>
          </div>
          <hr />
          <div className="row align-items-center justify-content-between mt-3 mt-md-5">
            <Link
              to="/product"
              className="col-md-6 d-flex justify-content-start text-decoration-none"
            >
              <button className="d-block w-75 cart-button fw-bolder bg-dark">
                Continue To Shopping
              </button>
            </Link>
            {totalPrice > 0 && (
              <div className="col-md-6 d-flex justify-content-end ">
                <button
                  onClick={checkOutHandler}
                  className="d-block w-75 cart-button fw-bolder bg-info"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className=" alert alert-info text-center mt-3">
          Your cart is empty
          <Link
            className="btn btn-success mx-5 px-5 py-3"
            to="/"
            style={{
              fontSize: "12px",
            }}
          >
            SHOPPING NOW
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
