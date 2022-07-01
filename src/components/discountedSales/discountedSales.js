import "./discountedSales.scss";
import Slider from "react-slick";
import { ShoppingBagOutlined, WindowRounded } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { ImageURL } from "../../RequestMethos";
import { Link } from "react-router-dom";
const DiscountedSales = () => {
  const { ProductList } = useSelector((state) => state.Product);
  const newDisCountedArray =
    ProductList?.length > 0 && ProductList?.filter((item) => item.discount > 0);
  const settings = {
    dots: false,
    infinite:
      newDisCountedArray && newDisCountedArray?.length > 6 ? true : false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
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
  return (
    <div className=" mb-5 app_container_discountedProducts">
      <div className="container">
        <div className="app_discountedProducts_title">
          <h2>Sản phẩm đang khuyến mãi</h2>
        </div>
        <div className="app_discountedProducts_slider">
          <Slider {...settings}>
            {newDisCountedArray?.length > 0 &&
              newDisCountedArray?.map((item) => (
                <div className="p-3" key={item._id}>
                  <div className="app_discountedProduct_imgContainer">
                    <Link to={`/details/${item._id}`}>
                      <img
                        src={`${ImageURL}/${item.image[0]}`}
                        alt={item.name}
                        className="d-block"
                        style={{ aspectRatio: 4 / 4, width: "100%" }}
                      />
                    </Link>
                    <div className="app_discountedProduct_options bg-light">
                      <div className=" app_discountedProduct_Add">
                        <Link
                          to={`/details/${item._id}`}
                          className="text-black text-decoration-none"
                        >
                          {" "}
                          Add <ShoppingBagOutlined />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {newDisCountedArray?.length <= 0 && (
              <div className="p-3">
                <div className="app_discountedProduct_imgContainer">
                  <div className="alert alert-danger p-3">
                    Hiện tại không có sản phẩm nào!!!
                  </div>
                </div>
              </div>
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default DiscountedSales;
