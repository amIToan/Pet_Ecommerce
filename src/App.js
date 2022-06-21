import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import BannerScreen from "./screens/BannerScreen";
import Company from "./screens/Company";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./Redux/Actions/ProductActions";
import { listOrders } from "./Redux/Actions/OrderActions";
import { RESET_COMPANY } from "./Redux/Constants/CompanyConsants";
import { getCompanyInfo } from "./Redux/Actions/CompanyAction";
import { getListOfCate } from "./Redux/Actions/CategoryAction";
import { listUser } from "./Redux/Actions/userActions";
import ModifiedBanner from "./screens/ModifiedBanner";
import NewsScreen from "./screens/NewsScreen";
import NewsEditAndAddScreen from "./screens/NewsEditAndAddScreen";
function App() {
  document.title = "Admin Page";
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
      dispatch(listOrders());
      dispatch(getCompanyInfo());
      dispatch(getListOfCate());
      dispatch(listUser());
    }
    return () => {
      dispatch({ type: RESET_COMPANY });
    };
  }, [userInfo, dispatch]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/company" component={Company} />
          <PrivateRouter path="/products" component={ProductScreen} />
          <PrivateRouter path="/category" component={CategoriesScreen} exact />
          <PrivateRouter
            path="/category/:cateId"
            component={CategoriesScreen}
            exact
          />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter path="/banner" component={BannerScreen} exact />
          <PrivateRouter path="/news" component={NewsScreen} exact />
          <PrivateRouter
            path="/addnews"
            component={NewsEditAndAddScreen}
            exact
          />
          <PrivateRouter path="/news/:id/" component={NewsEditAndAddScreen} />
          <PrivateRouter path="/banner/:bannerId" component={ModifiedBanner} />
          <PrivateRouter
            path="/product/:id/edit"
            component={ProductEditScreen}
          />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
