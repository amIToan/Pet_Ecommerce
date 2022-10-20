import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { DropzoneArea } from "material-ui-dropzone";
import EditorToolbar, { modules, formats } from "../QuillEditor/EditorToolbar";
import "./TextEditor.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
const AddProductMain = () => {
  const [newProduct, setNewProduct] = useState({
    description: "",
  });
  const ondescription = (value) => {
    console.log(value);
    setNewProduct({ ...newProduct, description: value });
  };
  const [cate, setCate] = useState({});
  const dispatch = useDispatch();
  const {
    listOfCategory,
    loading: loadingList,
    error: errorList,
  } = useSelector((state) => state.CategoryList);
  const categoryList = [];
  function getIdOfCate(arrayData) {
    if (arrayData?.length > 0) {
      arrayData.forEach((element) => {
        categoryList.push({
          id: element._id,
          categoryName: element.categoryName,
        });
        if (element.children?.length > 0) {
          getIdOfCate(element.children);
        }
      });
      return categoryList;
    }
  }
  getIdOfCate(listOfCategory);
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      alert("Product Added successfully!!!");
      dispatch({ type: PRODUCT_CREATE_RESET });
      setNewProduct({});
      setCate({});
      window.location.reload();
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const getFormData = (object) =>
      Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
      }, new FormData());
    const formData = getFormData(newProduct);
    for (const first in cate) {
      console.log(first);
      if (cate[first].length > 0) {
        cate[first].forEach((item) => formData.append(first, item));
      }
    }
    dispatch(createProduct(formData));
  };
  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {(error || errorList) && (
                    <Message variant="alert-danger">{error}</Message>
                  )}
                  {(loading || loadingList) && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      name="name"
                      required
                      value={newProduct.name ? newProduct.name : ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <EditorToolbar toolbarId={"t1"} />
                    <ReactQuill
                      theme="snow"
                      value={
                        newProduct.description ? newProduct.description : ""
                      }
                      onChange={ondescription}
                      placeholder={"Write something awesome..."}
                      modules={modules("t1")}
                      formats={formats}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="categories" className="form-label">
                      Categories ( giữ Ctrl để chọn nhiều.)
                    </label>
                    <select
                      className="form-control"
                      name="categories"
                      id="categories"
                      onChange={(e) => {
                        const result = [];
                        let opt;
                        const selectedValue =
                          document.getElementById("categories").options;
                        for (
                          var i = 0, iLen = selectedValue.length;
                          i < iLen;
                          i++
                        ) {
                          opt = selectedValue[i];

                          if (opt.selected) {
                            result.push(opt.value || opt.text);
                          }
                        }
                        setCate({ ...cate, [e.target.name]: result });
                      }}
                      required
                      multiple
                    >
                      <option key="default"> Vui lòng chọn Categories</option>
                      {categoryList?.length > 0 &&
                        categoryList.map((item, index) => (
                          <option value={item.id} key={index}>
                            {item.categoryName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      name="price"
                      required
                      value={newProduct.price ? newProduct.price : ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="size" className="form-label">
                      Size (Vui lòng nhập dữ liệu số.VD : 36,37,39)
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      name="size"
                      onChange={(e) => {
                        const sizeNumber = e.target.value.split(",");
                        const newSizes = sizeNumber.map((item) =>
                          parseInt(item)
                        );
                        setCate({
                          ...cate,
                          [e.target.name]: newSizes,
                        });
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="color" className="form-label">
                      Color (Vui lòng nhập dữ liệu chữ.VD : red,yellow,green)
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      name="color"
                      onChange={(e) =>
                        setCate({
                          ...cate,
                          [e.target.name]: e.target.value.split(","),
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="discount" className="form-label">
                      Discount
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      name="discount"
                      value={newProduct.discount ? newProduct.discount : ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="countInStock" className="form-label">
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      name="countInStock"
                      required
                      value={
                        newProduct.countInStock ? newProduct.countInStock : ""
                      }
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="Type" className="form-label">
                      Type
                    </label>
                    <select
                      name="Type"
                      className="form-control"
                      value={newProduct.Type ? newProduct.Type : ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          [e.target.name]: e.target.value,
                        })
                      }
                    >
                      <option value={1}>Sản phẩm bình thường</option>
                      <option value={2}>Sản phẩm hot</option>
                      <option value={3}>Khuyến mại</option>
                    </select>
                  </div>
                  {/* images */}
                  <div className="mb-4">
                    <label htmlFor="Type" className="form-label">
                      Up load images
                    </label>
                    {!newProduct.image && (
                      <DropzoneArea
                        clearOnUnmount={true}
                        acceptedFiles={["image/*"]}
                        dropzoneText={"Drag and drop an image here or click"}
                        onChange={(files) => {
                          if (Object.keys(files).length > 0) {
                            setCate({
                              ...cate,
                              productImgs: files,
                            });
                          }
                        }}
                        filesLimit={10}
                        previewGridClasses={{
                          item: "Mui-3",
                        }}
                        name="uploadToanImages"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
export default AddProductMain;
