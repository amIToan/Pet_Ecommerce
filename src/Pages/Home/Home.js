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
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
const Home = () => {
  const { companyInfo } = useSelector((state) => state.Company);
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
        <meta name="keywords" content={companyInfo?.metaKeys ? companyInfo.metaKeys : "Quần áo, trang phục , BJJ, Brazilian JiuJitsu, Judo, võ phục, Nogi, Rashguard,..."} />
        <meta name="description" content={companyInfo?.metaDes ? companyInfo.metaDes : "Công ty chuyên về võ phục, Gi, NoGi, đặc biệt chuyên về Judo, Brazilian JiuJitsu, BJJ,..."} />
      </Helmet>
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
