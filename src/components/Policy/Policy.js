import "./Policy.scss";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Policy = () => {
  return (
    <div className="d-none d-md-block container-fluid app_Policy_container">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="app_Policy_featuredBox">
              <div>
                <LocalShippingIcon />
              </div>
              <div>Fast delivery</div>
              <span>Free of charge within Ha Noi city</span>
            </div>
          </div>
          <div className="col-4">
            <div className="app_Policy_featuredBox">
              <div>
                <SupportAgentIcon />
              </div>
              <div>Customer support</div>
              <span>We support online via website and our hotline 24/7</span>
            </div>
          </div>
          <div className="col-4">
            <div className="app_Policy_featuredBox">
              <div>
                <FavoriteIcon />
              </div>
              <div>Product quality</div>
              <span>100% cotton, high quality dyeing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
