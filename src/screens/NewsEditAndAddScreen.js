import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import { useEffect, useState, useRef } from "react";
import AddAndEditNews from "../components/news/AddAndEditNews";
const NewsEditAndAddScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddAndEditNews
        //   productId={productId}
        //   product={product && product}
        //   ref={changeCom}
        />
      </main>
    </>
  );
};

export default NewsEditAndAddScreen;
