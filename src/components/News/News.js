import "./News.scss";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const News = () => {
  return (
    <div className="app_News_container mb-5">
      <div className="container">
        <div className="app_News_title">
          <h2>Tin tức</h2>
        </div>
        <div className="row">
          <div className="col-12 col-md-3">
            <h3 className="app_News_subHeadline">
              MÁCH BẠN CÁCH CHỌN ĐỒ BƠI HỢP MỐT
            </h3>
            <img
              src="https://bizweb.dktcdn.net/thumb/large/100/147/060/articles/untitled-25.jpg?v=1478148164403"
              alt="Mo ta san pham"
              className="d-block img-fluid"
            />
            <div className="app_News_shortDesc">
              Việc lựa chọn đồ bơi dựa vào dáng người không chỉ giúp bạn tôn lên
              những nét đẹp sẵn có, mà còn che giấu những khiếm khuyết của cơ
              thể, để bạn tự tin khoe dáng ngày hè. ...
            </div>
            <div className="app_News_Date">
              <CalendarMonthIcon />
              03/11/2016
            </div>
            <div className="app_News_forMore">
              <a href="fsdfsdffdf.com" alt="Khong cos">
                Xem thêm
              </a>
            </div>
          </div>
          <div className="col-12 col-md-3"></div>
          <div className="col-12 col-md-3"></div>
          <div className="col-12 col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

export default News;
