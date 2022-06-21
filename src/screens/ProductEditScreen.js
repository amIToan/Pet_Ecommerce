import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditProductMain from "./../components/products/EditproductMain";
import { useEffect, useState, useRef } from "react";
import { publicRequest } from "../Helps";
const ProductEditScreen = ({ match }) => {
  const productId = match.params.id;
  const [product, setProduct] = useState(null);
  const changeCom = useRef();
  useEffect(() => {
    async function fatchingApi(productId) {
      const { data } = await publicRequest.get(`/api/products/${productId}`);
      data && setProduct(data);
    }
    fatchingApi(productId);
    return () => {
      setProduct(null);
    };
  }, [productId, changeCom.current]);
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain
          productId={productId}
          product={product && product}
          ref={changeCom}
        />
      </main>
    </>
  );
};
export default ProductEditScreen;
