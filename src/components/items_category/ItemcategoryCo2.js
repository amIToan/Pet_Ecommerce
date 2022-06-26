import "./ItemcategoryCo2.scss";
import { ImageURL } from "../../RequestMethos";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastConfig, Currency } from "../../RequestMethos";
import { addToCart } from "../../redux/sliceReducer/CartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
function ItemcategoryCo2({ data }) {
  const [limit, setLimit] = useState(5);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    console.log(item);
    dispatch(addToCart(item));
    toast("The product added successfully!", toastConfig);
  };
  const handleLoadMore = () => {
    if (limit > data.length) return;
    setLimit((prev) => prev + 5);
  };
  return (
    <>
      {data?.length > 0 ? (
        data.slice(0, limit).map((item) => (
          <div
            className="col-12 app_Itemscategory_Co2"
            key={item._id.toString()}
          >
            <div className="row">
              <div className="col-12 col-md-4">
                <img
                  src={`${ImageURL}/${item?.image[0]}`}
                  alt={item.name}
                  className="d-block"
                  style={{ aspectRadio: 1 / 1, width: "100%" }}
                />
              </div>
              <div className="col-12 col-md-8 p-3">
                <Link
                  to={`/details/${item._id}`}
                  className="text-black text-decoration-none"
                >
                  <h6 className="text-left my-3">{item.name}</h6>
                  <div className="text-left text-danger">
                    {Currency(item.price)}
                  </div>
                  <p className="app_Itemscategory_shortDesc">
                    {item.description}
                  </p>
                </Link>
                <button
                  className="d-inline-block button app_Itemscategory_addToCart"
                  onClick={() => {
                    handleAddToCart({ ...item, quantity: 1 });
                  }}
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
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
          style={{ background: "#262626" }}
          onClick={handleLoadMore}
        >
          Load More ...
        </button>
      </div>
    </>
  );
}

export default ItemcategoryCo2;
