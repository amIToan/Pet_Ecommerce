import Header from "../components/Header";
import Sidebar from "./../components/sidebar";
import BannerComponent from "../components/BannerComponent";
const BannerScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <BannerComponent />
      </main>
    </>
  );
};

export default BannerScreen;
