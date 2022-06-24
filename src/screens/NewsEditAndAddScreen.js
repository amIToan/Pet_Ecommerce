import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import { useEffect, useState, useRef } from "react";
import AddAndEditNews from "../components/news/AddAndEditNews";
const NewsEditAndAddScreen = ({ match }) => {
  const newsId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddAndEditNews newsId={newsId} />
      </main>
    </>
  );
};

export default NewsEditAndAddScreen;
