import { useState, useEffect } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { useSelector, useDispatch } from "react-redux";
import {
  createCategoryAction,
  updatedCate,
} from "../../Redux/Actions/CategoryAction";
import {
  CREATE_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
} from "../../Redux/Constants/CategoryConstants";
import { ImageURL } from "../../Helps";
import { publicRequest } from "../../Helps";
const CreateCategory = ({ cateId }) => {
  const dispatch = useDispatch();
  const { listOfCategory, loading, error } = useSelector(
    (state) => state.CategoryList
  );
  const {
    loading: createdLoading,
    createdCategory,
    error: createdError,
  } = useSelector((state) => state.createdCategory);
  const {
    loading: updatedLoading,
    updatedCategory,
    error: updatedError,
  } = useSelector((state) => state.updatedCategory);
  const [Category, setCategory] = useState({});
  const [image, setImage] = useState(null)
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
  const handleSubmitCate = (e) => {
    e.preventDefault();
    const getFormData = (object) =>
      Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
      }, new FormData());
    const formData = getFormData(Category);
    if (Object.keys(Category).length === 0) {
      console.log(formData, "create");
      dispatch(createCategoryAction(formData));
    } else {
      dispatch(updatedCate(cateId, formData));
    }
  };
  useEffect(() => {
    if (createdError || updatedError) {
      dispatch({ type: UPDATE_CATEGORY_RESET });
      dispatch({ type: CREATE_CATEGORY_RESET });
    }
    if (updatedCategory || createdCategory) {
      alert("You have updated successfully!!!");
      dispatch({ type: UPDATE_CATEGORY_RESET });
      dispatch({ type: CREATE_CATEGORY_RESET });
    }
    return () => {
      setCategory({});
      setImage(null)
    };
  }, [
    createdCategory,
    dispatch,
    updatedCategory,
  ]);
  useEffect(() => {
    async function fetchingApi(cateId) {
      const res = await publicRequest.get(`/api/categories/${cateId}`);
      res.data && setCategory(res.data);
      res.data?.categoryImage && setImage(res.data.categoryImage)
    }
    cateId && fetchingApi(cateId);
    return () => {
      setCategory({});
    };
  }, [cateId]);
  console.log(Category);
  return (
    <div className="col-md-12 col-lg-6">
      {(loading || createdLoading) && <Loading />}
      {(error || createdError) && <Message>{error || createdError}</Message>}
      <form onSubmit={handleSubmitCate}>
        <div className="mb-4">
          <label htmlFor="categoryName" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            name="categoryName"
            value={Category?.categoryName ? Category.categoryName : null}
            onChange={(e) =>
              setCategory({ ...Category, [e.target.name]: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="slug" className="form-label">
            Slug
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            name="slug"
            value={Category?.slug ? Category.slug : null}
            onChange={(e) =>
              setCategory({ ...Category, [e.target.name]: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <select
            name="parentId"
            className=" col-12 bg-light p-3  rounded"
            value={Category?.parentId ? Category.parentId : null}
            onChange={(e) =>
              setCategory({ ...Category, [e.target.name]: e.target.value })
            }
          >
            <option key="default" defaultValue={null}>
              Chọn chuyên mục mẹ
            </option>
            {categoryList?.length > 0 &&
              categoryList.map((item, index) => (
                <option
                  value={item.id}
                  key={index}
                  selected={Category.parentId === item.id ? true : false}
                >
                  {item.categoryName}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="form-label">Images</label>
          {image && (
            <DropzoneArea
              clearOnUnmount={true}
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              onChange={(files) => {
                console.log("vao cai trc")
                if (Object.keys(files).length > 0) {
                  setCategory({
                    ...Category,
                    categoryImage: files[0],
                  });
                } else {
                  setCategory({
                    ...Category,
                    categoryImage: null,
                  });
                }
              }}
              filesLimit={1}
              previewGridClasses={{
                item: "Mui-3",
              }}
              name="Toanfd"
              initialFiles={[`${ImageURL}${image}`]}
            />
          )}
          {!image && (
            <DropzoneArea
              clearOnUnmount={true}
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              onChange={(files) => {
                console.log("vao cai sau")
                if (Object.keys(files).length > 0) {
                  setCategory({
                    ...Category,
                    categoryImage: files[0],
                  });
                } else {
                  setCategory({
                    ...Category,
                    categoryImage: null,
                  });
                }
              }}
              filesLimit={1}
              previewGridClasses={{
                item: "Mui-3",
              }}
            />
          )}
        </div>
        <div className="d-grid">
          <button className="btn btn-primary py-3">
            {Object.keys(Category).length === 0
              ? "Create category"
              : "Update category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
