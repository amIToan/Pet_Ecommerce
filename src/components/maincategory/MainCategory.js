import "./MainCategory.scss";
import Itemscategory from "../items_category/Itemscategory";
import LeftbarCategory from "../Leftbar_category/LeftbarCategory";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function MainCategory() {
  const [sidebar, setSideBar] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 763) {
        setSideBar(true);
      } else {
        setSideBar(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div className="container-fluid my-3">
      <div className="container">
        <div className="row">
          {!sidebar && (
            <div className="col-3">
              <LeftbarCategory />
            </div>
          )}
          <div className="col -12 col-md-9">
            <Itemscategory id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainCategory;
