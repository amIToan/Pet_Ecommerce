import { PayPalButtons } from "@paypal/react-paypal-js";
import { orderPayment } from "../../redux/ApiRedux/apiRequest";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import publicRequest from "../../RequestMethos";
const PaypalButton = ({ totalPrice, orderId, dispatch, OrderDetail }) => {
  let usdPrice;
  if (totalPrice / 24000 > 1) {
    usdPrice = Math.round((totalPrice / 24000).toFixed(2));
  } else {
    usdPrice = 10;
  }
  const [clientId, setClientId] = useState(false);
  useEffect(() => {
    async function fetchPayPal() {
      const { data: clientId } = await publicRequest.get(`/config/paypal`);
      setClientId(clientId);
    }
    fetchPayPal();
  }, [orderId]);
  const handleApprove = (order) => {
    const paymentInfo = {
      id: order?.id || "_" + Math.random().toString(36).substring(2, 9),
      status: order?.status || "COMPLETED",
      update_time: order?.update_time,
      email_address: order?.payer?.email_address,
    };
    paymentInfo &&
      orderPayment(orderId, paymentInfo, dispatch, OrderDetail?.paymentMethod);
  };
  return clientId ? (
    <PayPalScriptProvider
      options={{
        "client-id": clientId,
      }}
    >
      <PayPalButtons
        style={{ width: "100%" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: usdPrice,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const Order = await actions.order.capture();
          handleApprove(Order);
        }}
        onError={(error) => {
          alert(error);
        }}
      />
    </PayPalScriptProvider>
  ) : (
    <></>
  );
};

export default PaypalButton;
// onCancel= {()=> {
//     window.location.reload()
// }}
