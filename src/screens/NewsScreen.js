import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import { useEffect, useState } from "react";
import { publicRequest } from "../Helps";
import MainLists from "../components/news/MainLists";
const NewsScreen = () => {
  return (
    <>
      <>
        <Sidebar />
        <main className="main-wrap">
          <Header />
          <MainLists />
        </main>
      </>
    </>
  );
};

export default NewsScreen;
