import Cart from "../components/cart/Cart";
import Map from "../components/maps/Map";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/footer/footer";
import { memo } from "react";
const CartPage = () => {
  return (
    <>
      <Navbar />
      <Map />
      <Cart />
      <Footer />
    </>
  );
};

export default memo(CartPage);
