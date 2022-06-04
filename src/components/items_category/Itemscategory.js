import "./Itemscategory.scss";
// import { newProduct } from "../../dataSlider"
import ItemscategoryCo from "./ItemscategoryCo";
import ItemscategoryCo2 from "./ItemcategoryCo2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
function Itemscategory({ id }) {
  const productLists = useSelector((state) => state.Product.ProductList);
  const [grid, setGrid] = useState(true);
  const [newArray, setNewArray] = useState(null);
  console.log(productLists);
  useEffect(() => {
    if (id && productLists?.length > 0) {
      const cateProArr = [];
      for (let index = 0; index < productLists.length; index++) {
        const element = productLists[index].categories;
        if (element?.length > 0) {
          element.forEach((itemNew) => {
            if (itemNew.parentId === id || itemNew._id === id) {
              cateProArr.push(productLists[index]);
            }
          });
        }
      }
      setNewArray(cateProArr);
    }
    return () => {
      setNewArray(null);
    };
  }, [id, grid, productLists]);
  const handleArrangeChange = (e) => {
    const valueOfChange = e.target.value;
    switch (valueOfChange) {
      case "alpha-asc":
        const ascProduct =
          newArray?.length > 0 ? [...newArray] : [...productLists];
        ascProduct?.sort((a, b) =>
          a.name.localeCompare(b.name, "en", { sensitivity: "base" })
        );
        setNewArray(ascProduct);
        break;
      case "alpha-desc":
        const descProduct =
          newArray?.length > 0 ? [...newArray] : [...productLists];
        descProduct?.sort((a, b) =>
          b.name.localeCompare(a.name, "en", { sensitivity: "base" })
        );
        setNewArray(descProduct);
        break;
      case "price-asc":
        let ascPrice = newArray?.length > 0 ? [...newArray] : [...productLists];
        ascPrice?.sort((a, b) => a.price - b.price);
        setNewArray(ascPrice);
        break;
      case "price-desc":
        let descPrice =
          newArray?.length > 0 ? [...newArray] : [...productLists];
        descPrice?.sort((a, b) => b.price - a.price);
        setNewArray(descPrice);
        break;
      case "created-asc":
        let createPros =
          newArray?.length > 0 ? [...newArray] : [...productLists];
        createPros?.sort((a, b) => {
          const date1 = new Date(a.createdAt);
          const date2 = new Date(b.createdAt);
          return date1.getTime() - date2.getTime();
        });
        setNewArray(createPros);
        break;
      default:
        let defaultPros =
          newArray?.length > 0 ? [...newArray] : [...productLists];
        setNewArray(defaultPros);
        break;
    }
  };
  const handleGrid = (e) => {
    if (e.target.classList.contains("button-grid")) {
      setGrid(true);
      document.querySelector(".button-list").classList.remove("button-active");
      e.target.classList.add("button-active");
    } else {
      setGrid(false);
      document.querySelector(".button-grid").classList.remove("button-active");
      e.target.classList.add("button-active");
    }
  };
  return (
    <div className="app_Itemscategory_Container">
      <ToastContainer />
      <h3>Tất cả sản phẩm</h3>
      <div className="app_Itemscategory_Options">
        <div className="app_Itemscategory_Options_Gird">
          <button
            type="button"
            className="button button-grid button-active mr-3"
            onClick={handleGrid}
          ></button>
          <button
            type="button"
            className="button button-list"
            onClick={handleGrid}
          ></button>
        </div>
        <div className="d-flex align-items-center justify-content-between app_Itemscategory_Options_Sorts">
          <span style={{ minWidth: "70px" }}>Sắp xếp :</span>
          <select
            name="category_Sort"
            id="category_Sort"
            className="form-control"
            onChange={handleArrangeChange}
          >
            <option defaultValue value={"default"}>
              Hàng mới nhất
            </option>
            <option value={"alpha-asc"}>A → Z</option>
            <option value={"alpha-desc"}>Z → A</option>
            <option value={"price-asc"}>Giá tăng dần</option>
            <option value={"price-desc"}>Giá giảm dần</option>
            <option value={"created-asc"}>Hàng cũ nhất</option>
          </select>
        </div>
      </div>
      <div className="row my-3">
        {grid ? (
          <ItemscategoryCo
            data={newArray?.length > 0 || id ? newArray : productLists}
          />
        ) : (
          <ItemscategoryCo2
            data={newArray?.length > 0 || id ? newArray : productLists}
          />
        )}
      </div>
    </div>
  );
}

export default Itemscategory;
