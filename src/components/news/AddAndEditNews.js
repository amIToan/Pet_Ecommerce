import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { createNEWs, updateNews } from "../../Redux/Actions/NewsAction";
import { DropzoneArea } from "material-ui-dropzone";
import EditorToolbar, { modules, formats } from "../QuillEditor/EditorToolbar";
import "../products/TextEditor.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
  NEWS_CREATE_RESET,
  NEWS_UPDATE_RESET,
} from "../../Redux/Constants/NewsConstant";
import { publicRequest } from "../../Helps";
import { newsURL } from "../../Helps";
function changeLinkImage(params) {
  if (params?.length > 0) {
    const newLinkImages = params.map((item) => `${newsURL}${item}`);
    return newLinkImages;
  }
}
const AddAndEditNews = ({ newsId }) => {
  const dispatch = useDispatch();
  const {
    userLogin: { userInfo },
  } = useSelector((state) => state);
  const createNews = useSelector((state) => state.newsCreate);
  const updatedNews = useSelector((state) => state.newUpdate);
  const [news, setNews] = useState({});
  const [images, setImages] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const submitHandler = (e) => {
    e.preventDefault();
    const getFormData = (object) =>
      Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
      }, new FormData());
    const formData = getFormData(news);
    if (images.length > 0) {
      images.forEach((item) => formData.append("newsImgs", item));
    }
    if (newsId) {
      dispatch(updateNews(newsId, formData));
    } else {
      dispatch(createNEWs(formData));
    }
  };
  useEffect(() => {
    if (createNews.news) {
      alert("News Added successfully!!!");
      dispatch({ type: NEWS_CREATE_RESET });
      setNews({});
    }
    if (updatedNews.success) {
      alert("News Updating successfully!!!");
      dispatch({ type: NEWS_UPDATE_RESET });
      setNews({});
    }
  }, [createNews.news, dispatch, updatedNews.success]);
  useEffect(() => {
    if (newsId) {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      async function fetchingNewsById(newsId) {
        const { data } = await publicRequest.get(`/api/news/${newsId}`, config);
        if (data) {
          setNews({
            title: data.title,
            slug: data.slug,
            description: data.description,
          });
          setUrlImage(data.image);
        }
      }
      fetchingNewsById(newsId);
    }
  }, [newsId, updatedNews.success]);
  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/news" className="btn btn-danger text-white">
              Go to Lists
            </Link>
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
                  {createNews.error && (
                    <Message variant="alert-danger">{createNews.error}</Message>
                  )}
                  {createNews.loading && <Loading />}
                  {newsId && !news.title && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      name="title"
                      required
                      value={news.title ? news.title : ""}
                      onChange={(e) =>
                        setNews({
                          ...news,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="slug" className="form-label">
                      Slug
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      name="slug"
                      value={news.slug ? news.slug : ""}
                      onChange={(e) =>
                        setNews({
                          ...news,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <EditorToolbar toolbarId={"News"} />
                    <ReactQuill
                      theme="snow"
                      value={news.description ? news.description : ""}
                      onChange={(value) => {
                        if (news.title) {
                          setNews({ ...news, description: value });
                        }
                      }}
                      placeholder={"Write something awesome..."}
                      modules={modules("News")}
                      formats={formats}
                    />
                  </div>
                  {/* images */}
                  <div className="mb-4">
                    <label htmlFor="uploadNewsImages" className="form-label">
                      Up load images
                    </label>
                    {(!urlImage || urlImage.length <= 0) && (
                      <DropzoneArea
                        clearOnUnmount={true}
                        acceptedFiles={["image/*"]}
                        dropzoneText={"Drag and drop an image here or click"}
                        onChange={(files) => {
                          setImages(files);
                        }}
                        filesLimit={10}
                        previewGridClasses={{
                          item: "Mui-3",
                        }}
                        name="uploadNewsImages"
                      />
                    )}
                    {urlImage && urlImage.length > 0 && (
                      <DropzoneArea
                        clearOnUnmount={true}
                        acceptedFiles={["image/*"]}
                        dropzoneText={"Drag and drop an image here or click"}
                        onChange={(files) => {
                          setImages(files);
                        }}
                        filesLimit={10}
                        previewGridClasses={{
                          item: "Mui-3",
                        }}
                        initialFiles={changeLinkImage(urlImage)}
                        name="uploadNewsImages"
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

export default AddAndEditNews;
