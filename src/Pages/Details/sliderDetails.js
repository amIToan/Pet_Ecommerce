import Slider from "react-slick";
import { ImageURL } from "../../RequestMethos";
import { useState } from "react";
export default function SliderDetail({ images }) {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  return (
    <div>
      {/* <h2>Slider Syncing (AsNavFor)</h2>
      <h4>First Slider</h4> */}
      <Slider
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
        arrows={false}
      >
        {images?.length > 0 &&
          images.map((item, index) => (
            <img
              src={`${ImageURL}/${item}`}
              alt={item}
              className="d-block img-fluid"
              key={index}
            />
          ))}
      </Slider>
      {/* <h4>Second Slider</h4> */}
      <Slider
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        infinite={images?.length > 5 ? true : false}
        slidesToShow={5}
        swipeToSlide={true}
        focusOnSelect={true}
        arrows={false}
        className="mt-3"
      >
        {images?.length > 0 &&
          images.map((item, index) => (
            <div
              className="d-flex justify-content-center align-items-center"
              key={index + "asNavFor"}
            >
              <img
                src={`${ImageURL}/${item}`}
                alt={item}
                width="100px"
                style={{ aspectRatio: 1 / 1 }}
                className="border"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}
