import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ImageURL } from "../../RequestMethos";
const Container = styled.div`
  width: 100%;
  display: -webkit-box;   /* OLD - iOS 6-, Safari 3.1-6, BB7 */
  display: -ms-flexbox;  /* TWEENER - IE 10 */
  display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
  display: flex;
  position: relative;
  overflow: hidden;
`;
const Arrow = styled.div`
  width: 2vw;
  height: 2vw;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%)
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 1;
`;
// wrapper htmlFor images div
const Wrapper = styled.div`
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
// const Silde chính là images và content trong container chạy
const Slide = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  height: auto;
  width: 100%;
`;

const Slider = () => {
  const { Banner } = useSelector((state) => state.Banner);
  const newBanner =
    Banner?.length > 0 && Banner.filter((item) => item.bannerPosition === 1);
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(
        slideIndex > 0
          ? slideIndex - 1
          : newBanner[0]?.bannerUrlLink?.length - 1
      );
    } else {
      setSlideIndex(
        slideIndex < newBanner[0]?.bannerUrlLink?.length - 1
          ? slideIndex + 1
          : 0
      );
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {newBanner &&
          newBanner[0]?.bannerUrlLink?.map((item, index) => (
            <Slide bg={item.bg || "f5fafd"} key={index}>
              <ImgContainer>
                <Image src={`${ImageURL}/${item}`} />
              </ImgContainer>
            </Slide>
          ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
