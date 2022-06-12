import { Currency } from "../../Helps";
import { Link } from "react-router-dom";
import { ImageURL } from "../../Helps";
import { useState, forwardRef, useEffect } from "react";
import moment from "moment";
const OrderDetailProducts = (props, ref) => {
  const [modified, setModified] = useState({});
  const { order, loading } = props;
  let newNumber = 0;
  if (modified.taxPrice > 0) {
    newNumber += modified.taxPrice;
  }
  if (modified.shippingPrice > 0) {
    newNumber += modified.shippingPrice;
  }
  ref.current = { ...modified, totalPrice: newNumber + order.totalPrice };
  if (!loading) {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  console.log(modified);
  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Product</th>
          <th style={{ width: "20%" }}>Unit Price</th>
          <th style={{ width: "20%" }}>Quantity</th>
          <th style={{ width: "20%" }} className="text-end">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {order.orderItems.map((item, index) => (
          <tr key={index}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={`${ImageURL}${item.image[0]}`}
                    alt={item.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item.name}</div>
              </Link>
            </td>
            <td>{Currency(item.price)}</td>
            <td>{item.quantity} </td>
            <td className="text-end">{Currency(item.quantity * item.price)}</td>
          </tr>
        ))}

        <tr>
          <td colSpan="4">
            <article className="float-end">
              {!order.isDelivered && (
                <dl className="dlist">
                  <dt>isDelivered : </dt>
                  <dd>
                    <input
                      type="checkbox"
                      className=""
                      name="isDelivered"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setModified({ ...modified, [e.target.name]: true });
                        } else {
                          setModified({
                            ...modified,
                            [e.target.name]: false,
                          });
                        }
                      }}
                    />
                  </dd>
                </dl>
              )}
              {order.paymentResult?.status === "Pending" && (
                <dl className="dlist">
                  <dt>isCompleted : </dt>
                  <dd>
                    <input
                      type="checkbox"
                      name="status"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setModified({
                            ...modified,
                            [e.target.name]: true,
                          });
                        } else {
                          setModified({
                            ...modified,
                            [e.target.name]: false,
                          });
                        }
                      }}
                    />
                  </dd>
                </dl>
              )}
              <dl className="dlist">
                <dt>Tax :</dt>{" "}
                <dd>
                  <input
                    type="number"
                    className="form-control"
                    name="taxPrice"
                    value={
                      modified.taxPrice
                        ? modified.taxPrice
                        : order.taxPrice
                        ? order.taxPrice
                        : ""
                    }
                    onChange={(e) => {
                      setModified({
                        ...modified,
                        [e.target.name]: parseInt(e.target.value),
                      });
                    }}
                    disabled={order.taxPrice ? true : false}
                  />
                </dd>
              </dl>
              <dl className="dlist">
                <dt>Shipping cost:</dt>{" "}
                <dd>
                  <input
                    type="number"
                    className="form-control"
                    name="shippingPrice"
                    value={
                      modified.shippingPrice
                        ? modified.shippingPrice
                        : order.shippingPrice
                        ? order.shippingPrice
                        : ""
                    }
                    onChange={(e) => {
                      setModified({
                        ...modified,
                        [e.target.name]: parseInt(e.target.value),
                      });
                    }}
                    disabled={order.shippingPrice ? true : false}
                  />
                </dd>
              </dl>
              <dl className="dlist">
                <dt>Grand total:</dt>
                <dd>
                  <b className="h5">
                    {Currency(
                      newNumber
                        ? newNumber + order.totalPrice
                        : order.totalPrice
                    )}
                  </b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Payment Result:</dt>
                <dd>
                  {order.paymentResult?.status ? (
                    <>
                      <span className="badge rounded-pill alert alert-success text-success">
                        {order.paymentResult?.status}
                      </span>
                      &nbsp;
                      <span>
                        {moment(order.paymentResult?.update_time).format(
                          "MMM Do YY"
                        )}
                      </span>
                    </>
                  ) : (
                    <span className="badge rounded-pill alert alert-danger text-danger">
                      Not Completed
                    </span>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default forwardRef(OrderDetailProducts);
