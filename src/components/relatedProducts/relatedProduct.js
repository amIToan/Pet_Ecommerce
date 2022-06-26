import "../hotProduct/HotProduct.scss";
import "./relatedProducts.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SavedSearchOutlinedIcon from "@mui/icons-material/SavedSearchOutlined";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ImageURL } from "../../RequestMethos";

const RelatedProduct = ({ originProduct }) => {
  const [relatedPros, setRelatePros] = useState(null);
  const settings = {
    dots: true,
    speed: 500,
    infinite: relatedPros?.length > 4 ? true : false,
    slidesToShow: 4,
    slidesToScroll: 1,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
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
  const allProducts = useSelector((state) => state.Product?.ProductList);

  useEffect(() => {
    if (allProducts?.length > 0) {
      const newRePros = [];
      allProducts.forEach((element) => {
        for (let index = 0; index < element.categories.length; index++) {
          if (
            originProduct?.categories.includes(element.categories[index]._id)
          ) {
            newRePros.push(element);
            break;
          }
        }
      });
      setRelatePros(newRePros);
    }
    return () => {
      setRelatePros(null);
    };
  }, [originProduct, allProducts]);
  return (
    <div className=" my-3 app_cotainer_hotproduct">
      <div className="container">
        <div className="app_hotproduct_title">
          <h2>Sản phẩm liên quan</h2>
        </div>
        {/* <div className="app_hotproduct_slider"> */}
        {relatedPros?.length > 0 ? (
          <Slider {...settings}>
            {relatedPros?.map((item) => (
              <div className="p-3" key={item._id}>
                <div className="app_hotProduct_imgContainer">
                  <Link
                    to={`/details/${item._id}`}
                    className="text-black text-decoration-none"
                  >
                    <img
                      src={`${ImageURL}/${item.image[0]}`}
                      alt={item.name}
                      className="d-block"
                      style={{ aspectRatio: 4 / 4, width: "100%" }}
                    />
                  </Link>
                  <div className="app_hotProduct_options bg-light">
                    <div className=" app_hotProduct_Add">
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
        ) : (
          <div className="alert alert-info my-3 p-3">Chưa có sản phẩm!!!</div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};
export default RelatedProduct;
