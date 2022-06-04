import "./ItemcategoryCo.scss";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SavedSearchOutlinedIcon from "@mui/icons-material/SavedSearchOutlined";
import { ImageURL } from "../../RequestMethos";
import { addToCart } from "../../redux/sliceReducer/CartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastConfig, Currency } from "../../RequestMethos";
import { Link } from "react-router-dom";
import { useState } from "react";
function ItemscategoryCo({ data }) {
  const [limit, setLimit] = useState(9);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    console.log(item);
    dispatch(addToCart(item));
    toast("The product added successfully!", toastConfig);
  };
  const handleLoadMore = () => {
    if (limit > data.length) return;
    setLimit((prev) => prev + 9);
  };
  return (
    <>
      {data?.length > 0 ? (
        data.slice(0, limit).map((item) => (
          <div className="col-12 col-md-4 mb-5" key={item._id.toString()}>
            <div className="app_hotProduct_imgContainer">
              <img
                src={`${ImageURL}/${item?.image[0]}`}
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
                  Add <ShoppingBagOutlinedIcon />
                </div>
                <div className="app_Itemcategory_Details">
                  <Link
                    to={`/details/${item._id}`}
                    className="text-black text-decoration-none"
                  >
                    <SavedSearchOutlinedIcon /> Chi tiết
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
        <div className="col-12 alert alert-info text-center mt-3">
          No products right now!!!
        </div>
      )}
      <div className="col-12">
        <button
          type="button"
          className="d-block mx-auto btn btn-info w-25 text-white fw-bolder mt-5"
          style={{ background: "#6c78b4" }}
          onClick={handleLoadMore}
        >
          Load More ...
        </button>
      </div>
    </>
  );
}

export default ItemscategoryCo;
