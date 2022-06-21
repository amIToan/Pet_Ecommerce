import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { DropzoneArea } from "material-ui-dropzone";
import EditorToolbar, { modules, formats } from "../QuillEditor/EditorToolbar";
import "../products/TextEditor.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddAndEditNews = () => {
  const [news, setNews] = useState({
    description: "",
  });
  const ondescription = (value) => {
    setNews({ ...news, description: value });
  };
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
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
                  {/* {(error || errorList) && (
                    <Message variant="alert-danger">{error}</Message>
                  )} */}
                  {/* {(loading || loadingList) && <Loading />} */}
                  <div className="mb-4">
                    <label htmlFor="newsTitle" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      name="newsTitle"
                      required
                      value={news.newsTitle ? news.newsTitle : ""}
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
                      required
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
                      onChange={ondescription}
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
                    {!news.image && (
                      <DropzoneArea
                        clearOnUnmount={true}
                        acceptedFiles={["image/*"]}
                        dropzoneText={"Drag and drop an image here or click"}
                        onChange={(files) => {
                          console.log(files);
                        }}
                        filesLimit={10}
                        previewGridClasses={{
                          item: "Mui-3",
                        }}
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
