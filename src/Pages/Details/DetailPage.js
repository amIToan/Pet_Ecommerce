import "./DetailPage.scss";
import Map from "../../components/maps/Map";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import RelatedProduct from "../../components/relatedProducts/relatedProduct";
import Rating from "../../components/Rating/Rating";
import { Link, useParams } from "react-router-dom";
import { memo } from "react";
import { useState, useEffect } from "react";
import publicRequest, { Currency, toastConfig } from "../../RequestMethos";
import SliderDetail from "./sliderDetails";
import Review from "./Review";
import Loading from "../../components/Error.Loading/Loading";
import Message from "../../components/Error.Loading/Error";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import moment from "moment";
import { addToCart } from "../../redux/sliceReducer/CartSlice";
import { resetPayment } from "../../redux/sliceReducer/PaymentSlice";
import { resetReview } from "../../redux/sliceReducer/ReviewSlice";
import { Helmet } from "react-helmet"
function DetailPage() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { Login, Review: Reviewer } = useSelector((state) => state);
  const { loading, success, error } = Reviewer;
  useEffect(() => {
    async function asyncCall() {
      const result = await publicRequest.get(`/products/${productId}`);
      setProduct(result.data);
    }
    asyncCall();
    if (success) {
      toast("Your review added!!!", toastConfig);
      dispatch(resetPayment());
      dispatch(resetReview());
    }
    error && window.location.reload();
    return () => {
      setProduct(null);
    };
  }, [productId, success, error, dispatch]);
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast("The product added successfully!", toastConfig);
  };
  return (
    <>
      <Helmet>
        <title>{product?.name ? product.name : "PetShop"}</title>
        <meta name="keywords" content={product?.metaKeys ? product.metaKeys : "Quần áo, trang phục , BJJ, Brazilian JiuJitsu, Judo, võ phục, Nogi, Rashguard,..."} />
        <meta name="description" content={product?.metaDes ? product.metaDes : "Công ty chuyên về võ phục, Gi, NoGi, đặc biệt chuyên về Judo, Brazilian JiuJitsu, BJJ,..."} />
      </Helmet>
      <Navbar />
      <Map />
      {loading && <Loading />}
      <ToastContainer />
      <div className="app_productDetail_container my-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <SliderDetail images={product?.image} />
            </div>
            <div className="col-12 col-md-6">
              <div className="app_productDetail_Content">
                <h3>{product?.name}</h3>
                <p
                  className="position-relative"
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                />
                <div className="app_productDetail_count w-75">
                  <div className="app_productDetail_flexBox d-flex justify-content-between align-items-center">
                    <h6>Price</h6>
                    <span>{Currency(product?.price)}</span>
                  </div>
                  <div className="app_productDetail_flexBox d-flex justify-content-between align-items-center">
                    <h6>Status</h6>
                    <span>
                      {product?.countInStock > 0 ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <div className="app_productDetail_flexBox d-flex justify-content-between align-items-center">
                    <h6>Review</h6>
                    <div className="app_productDetail_Rating">
                      <Rating value={product?.rating} />
                    </div>
                  </div>
                  <div className="app_productDetail_flexBox d-flex justify-content-between align-items-center">
                    <h6>Quantity</h6>
                    <div className="app_productDetails_Counting">
                      <button onClick={() => setQuantity((prev) => prev + 1)}>
                        <AddIcon />
                      </button>
                      <input
                        className="from-control "
                        type="number"
                        min={1}
                        max={product?.countInStock}
                        value={quantity}
                        disabled={product?.countInStock <= 0 ? true : false}
                        style={{ paddingLeft: "40px" }}
                      />
                      <button
                        onClick={() => {
                          if (quantity === 1) return;
                          setQuantity((prev) => prev - 1);
                        }}
                      >
                        <RemoveIcon />
                      </button>
                    </div>
                  </div>
                  <div className="app_productDetail_flexBox d-flex justify-content-between align-items-center">
                    <button
                      className="app_productDetail_AddToCart d-block w-100"
                      onClick={() => {
                        handleAddToCart({ ...product, quantity: quantity });
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6"></div>
            <div className="col-12 col-md-6"></div>
          </div>
          {/* rating */}
          <div className="row my-5">
            <div className="col-12 col-md-6">
              <h6>REVIEWS</h6>
              {product?.reviews?.length === 0 ? (
                <Message variant={"alert-info mt-3"}>No Reviews</Message>
              ) : (
                <>
                  {product?.reviews?.map((item) => (
                    <div
                      className="bg-light shadow-sm rounded mb-5 mb-md-3 p-3"
                      key={item._id}
                    >
                      <span>
                        <strong>{item.name}</strong>
                      </span>
                      <Rating value={item.rating} />
                      <span style={{ color: "#7a7a7a" }}>
                        <i>{moment(item.createdAt).calendar()}</i>
                      </span>
                      <div className="alert alert-info mt-3">
                        {item.comment}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="col-12 col-md-6">
              {Login?.currentUser?.token ? (
                <>
                  {error && <Message variant={"alert-danger"}>{error}</Message>}
                  <Review productId={productId} />
                </>
              ) : (
                <Link to={"/login"}>
                  <button className="col-12 bg-info border-0 p-3 rounded text-black fw-bold text-decoration-none mt-5">
                    Vui lòng đăng nhập để bình luận!!!
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <RelatedProduct originProduct={product} />
      <Footer />
    </>
  );
}

export default memo(DetailPage);
