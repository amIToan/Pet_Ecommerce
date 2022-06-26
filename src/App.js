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
import Newspage from "./Pages/NewsPage/Newspage";
import NewsDetails from "./Pages/NewsPage/NewsDetails";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCompanyInfo(dispatch);
    getBannerList(dispatch);
    ProductAPI(dispatch);
  }, [dispatch]);
  const { loading, companyInfo, error } = useSelector((state) => state.Company);
  document.title =
    (companyInfo && companyInfo[0]?.pageTitle.pageTitle) || document.title;
  return (
    <>
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
          <Route path="/news" element={<Newspage />} >
            <Route path=":pageNumber" element={<Newspage />}></Route>
          </Route>
          <Route path="/news/details/:newsId" element={<NewsDetails />}></Route>
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
    </>
  );
}

export default App;
