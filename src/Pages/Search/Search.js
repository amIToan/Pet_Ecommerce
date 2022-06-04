import "./Search.scss";
import Map from "../../components/maps/Map";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import publicRequest, { ImageURL, toastConfig } from "../../RequestMethos";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { SavedSearchOutlined, ShoppingBagOutlined } from "@mui/icons-material";
import { addToCart } from "../../redux/sliceReducer/CartSlice";
import { Currency } from "../../RequestMethos";
import { Link } from "react-router-dom";
import "../../components/items_category/ItemcategoryCo.scss";
const Search = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber } = useParams();
  const [searchData, setSearchData] = useState(null);
  useEffect(() => {
    async function fetchingData(keyword = "", pageNumber) {
      const res = await publicRequest.get(
        `/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      setSearchData(res.data);
    }
    fetchingData(keyword, pageNumber);
    return () => {
      setSearchData(null);
    };
  }, [keyword, pageNumber]);
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast("The product added successfully!", toastConfig);
  };
  return (
    <>
      <Navbar />
      <Map />
      <ToastContainer />
      <div className="container my-4">
        <div className="row">
          {searchData?.products?.length > 0 ? (
            searchData.products.map((item) => (
              <div className="col-12 col-md-3 p-3 mb-3">
                <div className="app_hotProduct_imgContainer">
                  <img
                    src={`${ImageURL}/${item.image[0]}`}
                    alt={item.name}
                    className="d-block"
                    style={{ aspectRatio: 4 / 4, width: "100%" }}
                  />
                  <div className="app_Itemcategory_options bg-light">
                    <div
                      className="app_Itemcategory_Add"
                      onClick={() => {
                        handleAddToCart({ ...item, quantity: 1 });
                      }}
                    >
                      Add <ShoppingBagOutlined />
                    </div>
                    <div className="app_Itemcategory_Details">
                      <Link
                        to={`/details/${item._id}`}
                        className="text-black text-decoration-none"
                      >
                        <SavedSearchOutlined /> Chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/details/${item._id}`}
                  className="text-black text-decoration-none"
                >
                  <h6 className="text-center my-3">{item.name}</h6>
                  <div className="text-center text-danger fw-bolder">
                    {Currency(item.price)}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-12 alert alert-danger fw-bolder fs-3">
              Không có thông tin về dữ liệu!!!
            </div>
          )}
          <div className="col-12">
            <Pagination
              keyword={keyword ? keyword : ""}
              pages={searchData?.pages}
              page={searchData?.page}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Search;
