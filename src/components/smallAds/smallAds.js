import "./smallAds.scss";
import { ImageURL } from "../../RequestMethos";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const SmallAds = () => {
  const { Banner } = useSelector((state) => state.Banner);
  const newBanner =
    Banner?.length > 0 && Banner.filter((item) => item.bannerPosition === 2);
  const settings = {
    dots: false,
    infinite:
      newBanner && newBanner[0]?.bannerUrlLink.length > 1 ? true : false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="container app_smallBanner mb-5">
      <Slider {...settings}>
        {newBanner &&
          newBanner[0]?.bannerUrlLink.length > 0 &&
          newBanner[0].bannerUrlLink.map((item, index) => (
            <img
              src={`${ImageURL}/${item}`}
              alt={newBanner?.bannerName}
              className="d-block img-fluid"
              key={index}
            />
          ))}
      </Slider>
    </div>
  );
};

export default SmallAds;
