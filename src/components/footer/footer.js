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
              <div className="app_footer_top_logo py-3">
                <Link to={"/"}>
                  <img
                    src={`${ImageURL}/${
                      companyInfo && companyInfo[0]?.logoHeader
                    }`}
                    alt="Logo"
                    className="img-fluid d-block "
                    width={200}
                  />
                </Link>
              </div>
              {companyInfo && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: companyInfo[0]?.Introduction,
                  }}
                />
              )}
              <p>GPKD: 3500376775 - Ngày cấp: 24/1/2000</p>
              <p>Nơi cấp: sở kế hoạch và đầu tư tỉnh Bà Rịa - Vũng Tàu</p>
            </div>
            <div className="col-md-2 col-sm-4">
              <div className="app_footer_top_firstLine">FanPage</div>
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fgiaivn%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                style={{
                  border: "none",
                  overflow: "hidden",
                  aspectRatio: 1 / 1,
                  maxWidth: "100%",
                }}
                scrolling={"no"}
                frameBorder={"0"}
                allowFullScreen={true}
                allow={
                  "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                }
                title="Facebook"
              ></iframe>
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
              <div className="app_footer_top_firstLine">VỀ GIAI SHOP</div>
              <ul className="app_footer_top_links">
                <li>
                  <a href="/gioi-thieu?aelang=vi">Giới thiệu Giai Shop</a>
                </li>
                <li>
                  <a href="/he-thong-cua-hang-pet-shop?aelang=vi">
                    Các cửa hàng Giai Shop
                  </a>
                </li>
                <li>
                  <a href="/tuyen-dung?aelang=vi">Tuyển dụng</a>
                </li>
                <li>
                  <a href="#">Blog cá nhân</a>
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
                <img src={`/payment-1.webp`} alt="Pet Shop" />
                <img src="/payment-2.webp" alt="Pet Shop" />
                <img src="/payment-3.webp" alt="Pet Shop" />
                <img src="/payment-4.webp" alt="Pet Shop" />
              </div>
            </div>
            <div className="col-xs-12 col-sm-6">
              <div className="app_footer_middle_socials ">
                <a
                  href={`${companyInfo && companyInfo[0].Facebook}`}
                  className="d-inline-block icon"
                >
                  <FacebookIcon />
                </a>
                <a
                  href={`${companyInfo && companyInfo[0].Instagram}`}
                  className="d-inline-block icon"
                >
                  <TwitterIcon />
                </a>
                <a
                  href={`${companyInfo && companyInfo[0].Youtube}`}
                  className="d-inline-block icon"
                >
                  {" "}
                  <GoogleIcon />
                </a>
                <a
                  href={`${companyInfo && companyInfo[0].Facebook}`}
                  className="d-inline-block icon"
                >
                  <PinterestIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="app_footer_bottom">
        <div className="container">
          <span>© 2016-2022 CÔNG TY CỔ PHẦN THƯƠNG MẠI GIAI.VN</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
