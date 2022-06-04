import "./LeftbarCategory.scss";
// import { Category } from "../../dataSlider";
import { Link } from "react-router-dom";
import { memo } from "react";
import { useEffect, useState } from "react";
import PublicRequest from "../../RequestMethos";
function CategoryList({ Category }) {
  const onClickHandle = (e) => {
    const selectUl = e.currentTarget.parentElement;
    const nextSibling = selectUl.nextSibling;
    const selectedI = selectUl.querySelector("i.fa");
    if (!nextSibling.classList.contains("d-none")) {
      nextSibling.classList.add("d-none");
      selectedI.className = "fa fa-plus";
    } else {
      nextSibling.classList.remove("d-none");
      selectedI.className = "fa fa-minus";
    }
  };
  return (
    <ul>
      {Category &&
        Category.length > 0 &&
        Category.map((item) => (
          <li key={item._id}>
            <div className="app_Category_Links">
              <Link to={item._id}>{item.categoryName}</Link>
              <div className="app_Category_options" onClick={onClickHandle}>
                {item.children.length > 0 && <i className="fa fa-minus"></i>}
              </div>
            </div>

            {item.children && item.children.length > 0 && (
              <CategoryList Category={item.children} />
            )}
          </li>
        ))}
    </ul>
  );
}
function LeftbarCategory() {
  const [cate, setCate] = useState(null);
  // let cate;
  useEffect(() => {
    async function getCate() {
      const Category = await PublicRequest.get("/categories/get");
      setCate(Category.data);
      // cate = Category.data;
    }
    getCate();
  }, []);
  return (
    <div className="app_Category_leftbar_container">
      <div className="app_Category_leftbar_title">
        <h6>Danh mục sản phẩm</h6>
      </div>
      <div className="app_Category_leftbar_content">
        <CategoryList Category={cate} />
      </div>
    </div>
  );
}

export default memo(LeftbarCategory);
