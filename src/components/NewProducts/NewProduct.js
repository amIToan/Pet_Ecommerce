import "./NewProduct.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { SavedSearchOutlined, ShoppingBagOutlined } from "@mui/icons-material";
import { useLayoutEffect, useState } from "react";
import { ImageURL } from "../../RequestMethos";
import publicRequest, { toastConfig } from "../../RequestMethos";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/sliceReducer/CartSlice";
import { ToastContainer, toast } from "react-toastify";
const Newproduct = () => {
  const dispatch = useDispatch();
  const [newpro, setNewpro] = useState([]);
  const settings = {
    dots: true,
    infinite: newpro?.length > 4 ? true : false,
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
  useLayoutEffect(() => {
    async function fetchingProduct() {
      const productList = await publicRequest.get("/products/all");
      const newArray =
        productList?.data?.length > 0 && productList.data.slice(0, 15);
      newArray.length > 0 && setNewpro(newArray);
    }
    fetchingProduct();
    return () => setNewpro([]);
  }, []);
  return (
    <div className=" my-3 app_container_newProduct">
      <ToastContainer />
      <div className="container">
        <div className="app_newProducts_title">
          <h2>Sản phẩm mới nhất</h2>
        </div>
        <div className="app_newProduct_slider">
          <Slider {...settings}>
            {newpro?.length > 0 &&
              newpro.map((item) => (
                <div key={item._id} className="p-3">
                  <div className="app_newProduct_imgContainer">
                    <Link to={`/details/${item._id}`}>
                      <img
                        src={`${ImageURL}/${item.image[0]}`}
                        alt={item.name}
                        className="d-block"
                        style={{ aspectRatio: 4 / 4, width: "100%" }}
                      />
                    </Link>
                    <div className="app_newProduct_options bg-light">
                      <div
                        className=" app_newProduct_Add"
                        onClick={() => {
                          handleAddToCart({ ...item, quantity: 1 });
                        }}
                      >
                        Add <ShoppingBagOutlined />
                      </div>
                      <div className=" app_newProduct_Details">
                        <Link
                          to={`/details/${item._id}`}
                          className="text-black text-decoration-none"
                        >
                          <SavedSearchOutlined /> Chi tiết
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

export default Newproduct;
