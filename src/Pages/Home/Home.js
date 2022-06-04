import DiscountedSales from "../../components/discountedSales/discountedSales";
import HotProduct from "../../components/hotProduct/HotProduct";
import Navbar from "../../components/Navbar/Navbar";
import Newproduct from "../../components/NewProducts/NewProduct";
import Slider from "../../components/Slider/Slider";
import Subcategories from "../../components/SubCatgories/Subcategories";
import SmallAds from "../../components/smallAds/smallAds";
import News from "../../components/News/News";
import StoreSystems from "../../components/storesystem/StoreSystems";
import Policy from "../../components/Policy/Policy";
import Footer from "../../components/footer/footer";
import { memo } from "react";
const Home = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <Subcategories />
      <HotProduct />
      <Newproduct />
      <DiscountedSales />
      <SmallAds />
      <News />
      <StoreSystems />
      <Policy />
      <Footer />
    </>
  );
};

export default memo(Home);
