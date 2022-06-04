import "./StoreSystem.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { StoreSystem } from "../../dataSlider";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
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
const StoreSystems = () => {
  return (
    <div className="container mb-5">
      <div className="app_StoreSystem_container">
        <Slider {...settings}>
          {StoreSystem.map((item, index) => (
            <a
              href="fdsfsdf.com"
              alt="fsdfdsf"
              key={index}
              className="d-flex justify-content-center p-3"
            >
              <img src={item.img} alt="testing" className="d-block img-fluid" />
            </a>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default StoreSystems;
