import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderDetailmain from "../components/orders/OrderDetailmain";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { publicRequest } from "../Helps";
import { useSelector } from "react-redux";
const OrderDetailScreen = ({ match }) => {
  const [state, setState] = useState(null)
  const dispatch = useDispatch();
  const orderId = match.params.id;
  const userLogin = useSelector((state) => state.userLogin);
  useEffect(() => {
    async function fatchData(orderId) {
      const { userInfo } = userLogin;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await publicRequest(`/api/orders/${orderId
        }`, config)

      setState(data)
    }
    fatchData(orderId)
  }, [orderId])

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailmain orderId={orderId} order={state && state} />
      </main>
    </>
  );
};

export default OrderDetailScreen;
