import { useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { DropzoneArea } from "material-ui-dropzone";
import { ImageURL } from "../../Helps";
import EditorToolbar, { modules, formats } from "../QuillEditor/EditorToolbar";
import "./TextEditor.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
const EditProductMain = ({ productId, product }, ref) => {
  const dispatch = useDispatch();
  // get categories
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
  // enddddddddd
  const [assginPro, setAssignPro] = useState({});
  function changeLinkImage(params) {
    if (params?.length > 0) {
      const newLinkImages = params.map((item) => `${ImageURL}${item}`);
      return newLinkImages;
    }
  }
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  const [cate, setCate] = useState({});
  ref.current = successUpdate;
  useEffect(() => {
    //
    if (successUpdate) {
      alert("You've updated successfully!!!");
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
    return () => {
      setAssignPro({});
    };
  }, [productId, successUpdate]);
  useEffect(() => {
    if (successUpdate || product?.name) {
      setAssignPro({
        name: product?.name,
        price: product?.price,
        description: product?.description,
        countInStock: product?.countInStock,
        Type: product?.Type,
        discount: product?.discount,
      });
      setCate({
        categories: product?.categories,
        size: product?.size,
        color: product?.color,
        productImgs: [],
        // product.image
      });
    }
  }, [product, successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();
    const getFormData = (object) =>
      Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
      }, new FormData());
    const formData = getFormData(assginPro);
    for (const first in cate) {
      if (cate[first].length > 0) {
        cate[first].forEach((item) => formData.append(first, item));
      }
    }
    dispatch(updateProduct(productId, formData));
  };
  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
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
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loadingList ? (
                    <Loading />
                  ) : errorList ? (
                    <Message variant="alert-danger">{errorList}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="name" className="form-label">
                          Product title
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          name="name"
                          value={assginPro.name ? assginPro.name : ""}
                          required
                          onChange={(e) =>
                            setAssignPro({
                              ...assginPro,
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
                        {assginPro?.description && (
                          <ReactQuill
                            theme="snow"
                            value={assginPro.description}
                            onChange={(value) => {
                              console.log(value);
                              setAssignPro({
                                ...assginPro,
                                description: value,
                              });
                            }}
                            placeholder={"Write something awesome..."}
                            modules={modules("t1")}
                            formats={formats}
                          />
                        )}
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
                          {categoryList?.length > 0 &&
                            categoryList.map((item, index) => {
                              if (cate.categories?.includes(item.id)) {
                                return (
                                  <option value={item.id} key={index} selected>
                                    {item.categoryName}
                                  </option>
                                );
                              } else {
                                return (
                                  <option value={item.id} key={index}>
                                    {item.categoryName}
                                  </option>
                                );
                              }
                            })}
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
                          value={assginPro.price ? assginPro.price : ""}
                          required
                          onChange={(e) =>
                            setAssignPro({
                              ...assginPro,
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
                          value={cate.size ? cate.size?.join() : ""}
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
                          Color (Vui lòng nhập dữ liệu chữ.VD :
                          red,yellow,green)
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          name="color"
                          value={cate.color ? cate.color?.join() : ""}
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
                          value={assginPro.discount ? assginPro.discount : ""}
                          onChange={(e) =>
                            setAssignPro({
                              ...assginPro,
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
                          value={
                            assginPro.countInStock ? assginPro.countInStock : ""
                          }
                          required
                          onChange={(e) =>
                            setAssignPro({
                              ...assginPro,
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
                          defaultValue={assginPro.Type}
                          onChange={(e) =>
                            setAssignPro({
                              ...assginPro,
                              [e.target.name]: e.target.value,
                            })
                          }
                        >
                          <option
                            value={1}
                            selected={assginPro.Type == "1" && true}
                          >
                            Sản phẩm bình thường
                          </option>
                          <option
                            value={2}
                            selected={assginPro.Type == "2" && true}
                          >
                            Sản phẩm hot
                          </option>
                          <option
                            value={3}
                            selected={assginPro.Type == "3" && true}
                          >
                            Khuyến mại
                          </option>
                        </select>
                      </div>
                      <div className="mb-4">
                        {product?.image?.length > 0 && (
                          <DropzoneArea
                            clearOnUnmount={true}
                            acceptedFiles={["image/*"]}
                            dropzoneText={
                              "Drag and drop an image here or click"
                            }
                            onChange={(files) => {
                              if (Object.keys(files).length > 0) {
                                setCate({
                                  ...cate,
                                  productImgs: files,
                                });
                              } else {
                                setCate({
                                  ...cate,
                                  productImgs: [],
                                });
                              }
                            }}
                            filesLimit={10}
                            previewGridClasses={{
                              item: "Mui-3",
                            }}
                            initialFiles={changeLinkImage(product?.image)}
                            name="uploadToanImages"
                          />
                        )}
                        {product?.image?.length <= 0 && (
                          <DropzoneArea
                            clearOnUnmount={true}
                            acceptedFiles={["image/*"]}
                            dropzoneText={
                              "Drag and drop an image here or click"
                            }
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default forwardRef(EditProductMain);
