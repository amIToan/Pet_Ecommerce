import React from "react";
import Header from "../components/Header";
import Sidebar from "./../components/sidebar";
import Toast from "../components/LoadingError/Toast";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { useState, useLayoutEffect, useEffect } from "react";
import { ImageURL } from "../Helps"
import { DropzoneArea } from "material-ui-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanyInfo,
  createCompanyInfo,
  updateCompanyInfo,
} from "../Redux/Actions/CompanyAction";
import { RESET_COMPANY, RESET_COMPANY_ACTION } from "../Redux/Constants/CompanyConsants";
import { toast } from "react-toastify";
const Company = () => {
  const dispatch = useDispatch();
  //
  const { CompanyInfo, UpdatedCompanyInfo } = useSelector((state) => state);
  const {
    companyInfo: newCompany,
    loading: loadingGetInfo,
    error: errorGetInfo,
  } = CompanyInfo;
  const {
    loading: companyActionLoading,
    updatedCompanyInfo: companyActionInfo,
    error: companyActionError,
  } = UpdatedCompanyInfo;
  const [companyInfo, setCompanyInfo] = useState({});
  const [logoHeader, setLogoHeader] = useState(null);
  const handlePostUpdateCompany = (e) => {
    e.preventDefault();
    if (Object.keys(companyInfo).length === 0) {
      toast.error(
        "Something's wrong!!!"
      );
      return;
    } else {
      const getFormData = (object) =>
        Object.keys(object).reduce((formData, key) => {
          formData.append(key, object[key]);
          return formData;
        }, new FormData());
      const formData = getFormData(companyInfo);
      if (Object.keys(newCompany[0]).length === 0) {
        dispatch(createCompanyInfo(formData));
        toast.success("Your information is created successfully!")
      } else {
        dispatch(updateCompanyInfo(companyInfo?._id, formData));
      }
    }
  };
  useLayoutEffect(() => {
    setCompanyInfo(newCompany ? { ...newCompany[0] } : {});
    setLogoHeader(newCompany && newCompany[0].logoHeader);
    return () => {
      setCompanyInfo({});
      setLogoHeader(null);
    };
  }, [newCompany, dispatch]);
  useEffect(() => {
    if (companyActionInfo) {
      alert("You have updated successfully")
      dispatch(getCompanyInfo())
      dispatch({ type: RESET_COMPANY_ACTION });
    }
    return () => {

    };
  }, [dispatch, companyActionInfo]);

  return (
    <>
      <Sidebar />
      <Toast />
      <main className="main-wrap">
        <Header />
        <section className="content-main" style={{ maxWidth: "1200px" }}>
          <h2 className="content-title">Add and edit company information</h2>
          <form onSubmit={handlePostUpdateCompany}>
            <div className="row mb-4">
              <div className="col-xl-8 col-lg-8">
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    {(errorGetInfo || companyActionError) && (
                      <Message variant="alert-danger">{errorGetInfo}</Message>
                    )}
                    {(loadingGetInfo || companyActionLoading) && <Loading />}
                    <div className="mb-4">
                      <label htmlFor="companyName" className="form-label">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="companyName"
                        name="companyName"
                        required
                        value={companyInfo.companyName}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="product_price" className="form-label">
                        Phone
                      </label>
                      <input
                        type="number"
                        placeholder="Type here"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        required
                        value={companyInfo.phoneNumber}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Hotline" className="form-label">
                        Hotline
                      </label>
                      <input
                        type="number"
                        placeholder="Type here"
                        className="form-control"
                        id="Hotline"
                        name="Hotline"
                        required
                        value={companyInfo.Hotline}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="Address"
                        name="Address"
                        required
                        value={companyInfo.Address}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Bank" className="form-label">
                        Bank
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="Bank"
                        name="Bank"
                        required
                        value={companyInfo.Bank}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="bankOwner" className="form-label">
                        Bank Owner
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="bankOwner"
                        name="bankOwner"
                        required
                        value={companyInfo.bankOwner}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="bankAccount" className="form-label">
                        Bank Account
                      </label>
                      <input
                        type="number"
                        placeholder="Type here"
                        className="form-control"
                        id="bankAccount"
                        name="bankAccount"
                        required
                        value={companyInfo.bankAccount}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Type here"
                        className="form-control"
                        id="Email"
                        name="Email"
                        required
                        value={companyInfo.Email}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="pageTitle" className="form-label">
                        Page Title
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="pageTitle"
                        name="pageTitle"
                        required
                        value={companyInfo.pageTitle}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="metaDes" className="form-label">
                        Meta Description
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="metaDes"
                        name="metaDes"
                        required
                        value={companyInfo.metaDes}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="metaKeys" className="form-label">
                        Meta Keywords
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="metaKeys"
                        name="metaKeys"
                        required
                        value={companyInfo.metaKeys}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="ggAnal" className="form-label">
                        Google analytics
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="ggAnal"
                        name="ggAnal"
                        required
                        value={companyInfo.ggAnal}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Facebook" className="form-label">
                        Facebook
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="Facebook"
                        name="Facebook"
                        required
                        value={companyInfo.Facebook}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Youtube" className="form-label">
                        Youtube
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="Youtube"
                        name="Youtube"
                        required
                        value={companyInfo.Youtube}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Instagram" className="form-label">
                        Instagram
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="Instagram"
                        name="Instagram"
                        required
                        value={companyInfo.Instagram}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Zalo" className="form-label">
                        Zalo
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="Zalo"
                        name="Zalo"
                        required
                        value={companyInfo.Zalo}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="footerTitle" className="form-label">
                        Footer Title
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="footerTitle"
                        name="footerTitle"
                        required
                        value={companyInfo.footerTitle}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Introduction" className="form-label">
                        Introduction
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="Introduction"
                        name="Introduction"
                        required
                        value={companyInfo.Introduction}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="" className="form-label"></label>
                      Upload Logo
                      {logoHeader && (
                        <DropzoneArea
                          acceptedFiles={["image/*"]}
                          dropzoneText={"Drag and drop an image here or click"}
                          onChange={(files) => {
                            setCompanyInfo({
                              ...companyInfo,
                              logoHeader: files[0],
                            });
                            console.log(files);
                          }}
                          filesLimit={1}
                          previewGridClasses={{
                            item: "Mui-3",
                          }}
                          initialFiles={[`${ImageURL}${logoHeader}`]}
                        />
                      )}
                    </div>
                    <div>
                      <button className="d-block btn btn-primary mx-auto">
                        {Object.keys(newCompany ? newCompany[0] : {}).length ===
                          0
                          ? "Publish"
                          : "Update"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Company;
