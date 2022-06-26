import "./Navbar.scss";
import Header from "./Header";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { SearchOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import Search from "../search/search";
import { memo } from "react";
import { Link } from "react-router-dom";
import publicRequest, { ImageURL } from "../../RequestMethos";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [category, setCategory] = useState(null);
  const [sidebar, setSideBar] = useState(false);
  const [state, setState] = useState(null);
  const { companyInfo } = useSelector((state) => state.Company);
  const handleOpenSidebar = () => {
    if (state) {
      setState(null);
    } else {
      setState(true);
    }
  };
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 763) {
        setSideBar(false);
      } else {
        setSideBar(true);
      }
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await publicRequest.get("/categories/get");
      setCategory(response.data);
    }
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <nav className="shadow app_navbar_container">
        <div className="app_navbar_mobileIcon" onClick={handleOpenSidebar}>
          <MenuOpenIcon />
        </div>
        {/* DDay la comment mobile cho sidebar */}
        {sidebar && (
          <div>
            <div
              className={
                state
                  ? "app_nav_bar_overlay"
                  : "app_nav_bar_overlay app_navbar_display"
              }
            ></div>
            <div
              className={
                state
                  ? "app_nav_bar_sidebar app_nav_bar_sidebar_transition"
                  : "app_nav_bar_sidebar"
              }
            >
              <div className="sidebar-header text-left">
                <h3>PetShop </h3>
                <div
                  className="sibar_closed_button"
                  onClick={handleOpenSidebar}
                >
                  <CloseIcon />
                </div>
              </div>
              <ul className="list-unstyled components">
                <li className="active">
                  <Link to={"/"}>
                    <i className="fas fa-home"></i>
                    Home
                  </Link>
                </li>
                <CategoryList Category={category} />
              </ul>
              <div className="app_sidebar_searchInput">
                <input type="search" placeholder="Search something..." />
                <SearchOutlined htmlColor="black" />
              </div>
              <button
                className="d-block btn mx-auto mt-2"
                style={{ backgroundColor: "#fff" }}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        )}
        {/* DDay la comment mobile cho sidebar */}
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-12 col-md-6 app_navbar_logo">
              <Link to={"/"}>
                <img
                  src={`${ImageURL}/${companyInfo && companyInfo[0]?.logoHeader
                    }`}
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="col-12 col-md-6 app_header_display">
              <div className="d-none d-md-flex app_navbar_navagation justify-content-end">
                <Link to={"/"}>Trang chủ</Link>
                {category?.length > 0 &&
                  category.map((item, index) => (
                    <>
                      <Link to={`/${item.categoryName}`} key={index}>
                        {item.categoryName}
                      </Link>
                    </>

                  ))}
              </div>
            </div>
          </div>
        </div>
        <Search />
      </nav>
    </>
  );
};

export default memo(Navbar);

// mobile bars
function CategoryList({ Category }) {
  const onClickHandle = (e) => {
    e.preventDefault();
    const selectUl = e.currentTarget.parentElement;
    const nextSibling = selectUl.nextSibling;
    if (!selectUl.classList.contains("app_nav_Category_Links")) return;
    if (!nextSibling.classList.contains("d-none")) {
      nextSibling.classList.add("d-none");
    } else {
      nextSibling.classList.remove("d-none");
    }
  };
  return (
    <ul>
      {Category &&
        Category.length > 0 &&
        Category.map((item, index) => (
          <li key={index}>
            <div className="app_nav_Category_Links">
              <Link
                to={
                  item.categoryName === "Products"
                    ? `/products/${item._id}`
                    : `/${item.categoryName}`
                }
              >
                {item.categoryName}
              </Link>
              <div className="app_nav_Category_options" onClick={onClickHandle}>
                {item.children.length > 0 && (
                  <i className="fa fa-caret-down"></i>
                )}
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
