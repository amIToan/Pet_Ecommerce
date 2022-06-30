import "./StoreSystem.scss";
import Slider from "react-slick";
import { StoreSystem } from "../../dataSlider";
import { useState, useEffect, memo } from "react";
import publicRequest from "../../RequestMethos";
import { newsImageURL } from "../../RequestMethos";
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
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
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchingData() {
      const { data } = await publicRequest.get("/news/branch/unique");
      data && setData(data);
    }
    fetchingData();
    return () => {
      setData(null);
    };
  }, []);
  return (
    <div className="container mb-5">
      <div className="app_StoreSystem_container">
        {data?.image.length > 0 ? (
          <Slider {...settings}>
            {data?.image.map((item, index) => (
              <a
                href={`/news/details/${data._id}`}
                alt={data?.title}
                key={index}
                className="d-flex justify-content-center p-3"
              >
                <img
                  src={`${newsImageURL}/${item}`}
                  alt="testing"
                  className="d-block img-fluid"
                  style={{ aspectRatio: 4 / 4 }}
                />
              </a>
            ))}
          </Slider>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default memo(StoreSystems);
