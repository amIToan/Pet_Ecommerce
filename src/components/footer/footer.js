import "./footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImageURL } from "../../RequestMethos";
function Footer() {
  const { companyInfo } = useSelector((state) => state.Company);
  return (
    <div className="app_footer_container">
      <div className="app_footer_top">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-4">
              <div className="app_footer_top_logo">
                <Link to={"/"}>
                  <img
                    src={`${ImageURL}/${
                      companyInfo && companyInfo[0]?.logoHeader
                    }`}
                    alt="Logo"
                    className="img-fluid d-block bg-light"
                  />
                </Link>
              </div>
              <p>{companyInfo && companyInfo[0]?.Introduction}</p>
              <p>GPKD: 3500376775 - Ngày cấp: 24/1/2000</p>
              <p>Nơi cấp: sở kế hoạch và đầu tư tỉnh Bà Rịa - Vũng Tàu</p>
            </div>
            <div className="col-md-2 col-sm-4">
              <div className="app_footer_top_firstLine">TÀI KHOẢN CỦA BẠN</div>
              <ul className="app_footer_top_links">
                <li>
                  <a href="/account/login?aelang=vi">Xem trạng thái đơn hàng</a>
                </li>
                <li>
                  <a href="/account/register?aelang=vi">Lịch sử đơn hàng</a>
                </li>
                <li>
                  <a href="/search?aelang=vi">Tìm kiếm</a>
                </li>
                <li>
                  <a href="/chinh-sach-bao-mat?aelang=vi">Chính sách bảo mật</a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-4">
              <div className="app_footer_top_firstLine">HỖ TRỢ</div>
              <ul className="app_footer_top_links">
                <li>
                  <a href="/lien-he?aelang=vi">Liên hệ hỗ trợ</a>
                </li>
                <li>
                  <a href="/chinh-sach-doi-hang?aelang=vi">
                    Chính sách đổi hàng
                  </a>
                </li>
                <li>
                  <a href="/huong-dan-mua-hang?aelang=vi">Hướng dẫn mua hàng</a>
                </li>
                <li>
                  <a href="/quan-diem-kinh-doanh?aelang=vi">
                    Quan điểm kinh doanh
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-4">
              <div className="app_footer_top_firstLine">VỀ PET SHOP</div>
              <ul className="app_footer_top_links">
                <li>
                  <a href="/gioi-thieu?aelang=vi">Giới thiệu Pet Shop</a>
                </li>
                <li>
                  <a href="/he-thong-cua-hang-pet-shop?aelang=vi">
                    Các Cửa hàng Pet Shop
                  </a>
                </li>
                <li>
                  <a href="/tuyen-dung?aelang=vi">Tuyển dụng</a>
                </li>
                <li>
                  <a href="http://blog.petshop.vn?aelang=vi">Blog Bé Bo</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-4">
              <div className="app_footer_top_firstLine">LIÊN HỆ</div>
              <div className="app_footer_top_contacts">
                <address className="app_footer_top_contact_items">
                  <i className="add-icon"></i>
                  {companyInfo && companyInfo[0]?.Address}
                </address>
                <div className="app_footer_top_contact_items">
                  <i className="phone-icon"></i>
                  {companyInfo && companyInfo[0]?.Hotline}
                </div>
                <div className="app_footer_top_contact_items">
                  <i className="email-icon"></i>
                  <Link to={`mailto:${companyInfo && companyInfo[0]?.Email}`}>
                    {companyInfo && companyInfo[0]?.Email}
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="app_footer_middle">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <div className="app_footer_middle_paymentAccess">
                <img
                  src="//bizweb.dktcdn.net/100/147/060/themes/195230/assets/payment-1.png?1632380301806"
                  alt="Pet Shop"
                />
                <img
                  src="//bizweb.dktcdn.net/100/147/060/themes/195230/assets/payment-2.png?1632380301806"
                  alt="Pet Shop"
                />
                <img
                  src="//bizweb.dktcdn.net/100/147/060/themes/195230/assets/payment-3.png?1632380301806"
                  alt="Pet Shop"
                />
                <img
                  src="//bizweb.dktcdn.net/100/147/060/themes/195230/assets/payment-4.png?1632380301806"
                  alt="Pet Shop"
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-6">
              <div className="app_footer_middle_socials ">
                <Link
                  to={`${companyInfo && companyInfo[0].Facebook}`}
                  className="d-inline-block icon"
                >
                  <FacebookIcon />
                </Link>
                <Link
                  to={`${companyInfo && companyInfo[0].Instagram}`}
                  className="d-inline-block icon"
                >
                  <TwitterIcon />
                </Link>
                <Link
                  to={`${companyInfo && companyInfo[0].Youtube}`}
                  className="d-inline-block icon"
                >
                  {" "}
                  <GoogleIcon />
                </Link>
                <Link
                  to={`${companyInfo && companyInfo[0].Facebook}`}
                  className="d-inline-block icon"
                >
                  <PinterestIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="app_footer_bottom">
        <div className="container">
          <p>
            © 2016-2020 CÔNG TY TNHH MAY MẶC THĂNG LONG | Thiết Kế & Nội Dung
            bởi PETSHOP VIỆT NAM.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
