import "./HotProduct.scss";
import Slider from "react-slick";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SavedSearchOutlinedIcon from "@mui/icons-material/SavedSearchOutlined";
import publicRequest, { toastConfig } from "../../RequestMethos";
import { useEffect, useState } from "react";
import { ImageURL } from "../../RequestMethos";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/sliceReducer/CartSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
const HotProduct = () => {
  const dispatch = useDispatch();
  const [hotPros, setHotPros] = useState(null);
  useEffect(() => {
    async function fetchingProduct() {
      const productList = await publicRequest.get("/products/hot");
      const newArray =
        productList?.data?.length > 0 && productList.data.slice(0, 15);
      newArray.length > 0 && setHotPros(newArray);
    }
    fetchingProduct();
    return () => setHotPros([]);
  }, []);
  const settings = {
    dots: true,
    infinite: hotPros?.length > 4 ? true : false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast("The product added successfully!", toastConfig);
  };
  return (
    <div className=" my-3 app_cotainer_hotproduct">
      <ToastContainer />
      <div className="container">
        <div className="app_hotproduct_title">
          <h2>Sản phẩm nổi bật</h2>
        </div>
        <div className="app_hotproduct_slider">
          <Slider {...settings}>
            {hotPros?.length > 0 &&
              hotPros.map((item) => (
                <div className="p-3" key={item._id}>
                  <div className="app_hotProduct_imgContainer">
                    <img
                      src={`${ImageURL}/${item.image[0]}`}
                      alt={item.name}
                      className="d-block"
                      style={{ aspectRatio: 4 / 4, width: "100%" }}
                    />
                    <div className="app_hotProduct_options bg-light">
                      <div
                        className=" app_hotProduct_Add"
                        onClick={() => {
                          handleAddToCart({ ...item, quantity: 1 });
                        }}
                      >
                        Add <ShoppingBagOutlinedIcon />
                      </div>
                      <div className=" app_hotProduct_Details">
                        <Link
                          to={`/details/${item._id}`}
                          className="text-black text-decoration-none"
                        >
                          <SavedSearchOutlinedIcon /> Chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HotProduct;
