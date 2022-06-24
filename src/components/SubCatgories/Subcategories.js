import "./Subcategories.scss";
// import { imageCategoriese } from "../../dataSlider";
import styled from "styled-components";
import { useLayoutEffect, useState } from "react";
import publicRequest, { ImageURL } from "../../RequestMethos";
import { Link } from "react-router-dom";
const Hometitle = styled.h2`
  font-size: 36px;
  color: rgb(38, 56, 130);
  text-align: center;
  padding: 30px;
`;
const Subcategories = () => {
  const [subCatArr, setArr] = useState(null);
  const changeWhenHover = (e) => {
    e.currentTarget.className += " app_subcategory_hover";
  };
  const changeWhenLeave = (e) => {
    e.currentTarget.classList.remove("app_subcategory_hover");
  };
  useLayoutEffect(() => {
    async function FetchingSubCats() {
      const suCates = await publicRequest.get("/categories/get");
      if (Array.isArray(suCates?.data)) {
        const newCates = suCates.data.filter(
          (item) => item.categoryName.trim().toUpperCase() == "PRODUCTS"
        );
        setArr(newCates[0].children.flat(Infinity).slice(0, 10));
      }
    }
    //return item.children?.length > 0 ? item.children.flat(Infinity) :
    FetchingSubCats();
  }, []);
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-12">
            <Hometitle className="app_subcategory_title">
              Sản phẩm của Giai Shop
            </Hometitle>
          </div>
          {subCatArr?.length > 0 &&
            subCatArr.map((item) => (
              <div className="col-4 col-md-2" key={item._id}>
                <Link to={`/products/${item._id}`}>
                  <img
                    src={`${ImageURL}/${item.categoryImage}`}
                    alt={item.categoryName}
                    className="d-block img-fluid rounded-circle"
                    onMouseEnter={changeWhenHover}
                    onMouseLeave={changeWhenLeave}
                    style={{ aspectRatio: 4 / 4 }}
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Subcategories;
