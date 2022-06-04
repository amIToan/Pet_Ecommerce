import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Pages/Home/Home";
import Category from "./Pages/Category/Category";
import DetailPage from "./Pages/Details/DetailPage";
import Login from "./Pages/LoginRegis/Login";
import Register from "./Pages/LoginRegis/Register";
import CartPage from "./Pages/CartPage";
import UserProfile from "./components/ProfileUser/userProfile";
import Shipping from "./Pages/Shipping/Shipping";
import PrivateRouter from "./PrivateRouter";
import PaymentPage from "./Pages/PaymentPage";
import OrderPage from "./Pages/OrderPage/OrderPage";
import UserOrderDetails from "./Pages/OrderPage/UserOrderDetails";
import Search from "./Pages/Search/Search";
import NotFound from "./Pages/NotFound/NotFound";
import { getCompanyInfo } from "./redux/ApiRedux/apiRequest";
import { getBannerList } from "./redux/ApiRedux/apiRequest";
import Loading from "./components/Error.Loading/Loading";
import Message from "./components/Error.Loading/Error";
import { useDispatch, useSelector } from "react-redux";
import { ProductAPI } from "./redux/ApiRedux/apiRequest";
import { useInfiniteQuery } from "react-query";
const fetchRepositories = async (page = 1) => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=topic:reactjs&per_page=30&page=${page}`
  );
  return response.json();
};
function App() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery(
    "repositories",
    ({ pageParam = 1 }) => fetchRepositories(pageParam),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      cacheTime: 60 * 5 * 1000,
      staleTime: 300000,
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.total_count / 30;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
    }
  );
  console.log(isFetchingNextPage, isFetchingPreviousPage);
  const dispatch = useDispatch();
  useEffect(() => {
    getCompanyInfo(dispatch);
    getBannerList(dispatch);
    ProductAPI(dispatch);
  }, [dispatch]);
  const { loading, companyInfo, error } = useSelector((state) => state.Company);
  document.title =
    (companyInfo && companyInfo[0]?.pageTitle.pageTitle) || document.title;
  useEffect(() => {
    let fetching = false;
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;
      console.log(scrollHeight - scrollTop, clientHeight);
      if (!fetching && scrollHeight - scrollTop <= clientHeight) {
        console.log("true");
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  // console.log(data);
  return (
    <BrowserRouter>
      {loading && <Loading />}
      {error && <Message>{error}</Message>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/page/:pageNumber" element={<Search />} />
        <Route path="/search/:keyword/page/:pageNumber" element={<Search />} />
        <Route path="/products" element={<Category />}>
          <Route path=":id" element={<Category />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/details/:productId" element={<DetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRouter />}>
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeorder" element={<OrderPage />} />
          <Route path="/orders/:orderId" element={<UserOrderDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
