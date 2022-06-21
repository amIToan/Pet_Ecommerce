import Header from "../components/Header";
import Sidebar from "./../components/sidebar";
import BannerComponent from "../components/BannerComponent";
import { useSelector } from "react-redux";
import { publicRequest } from "../Helps";
import { useEffect, memo, useState } from "react";
const BannerScreen = () => {
  const [banners, setBanners] = useState(null);
  const {
    userLogin: { userInfo },
  } = useSelector((state) => state);
  useEffect(() => {
    async function fetchingBanner() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await publicRequest.get(`/api/banner/`, config);
      setBanners(data);
    }
    fetchingBanner();
    return () => setBanners(null);
  }, []);
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <BannerComponent banners={banners && banners} />
      </main>
    </>
  );
};

export default memo(BannerScreen);
