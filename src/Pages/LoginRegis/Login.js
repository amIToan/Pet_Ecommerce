import Map from "../../components/maps/Map";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/ApiRedux/apiRequest";
import Loading from "../../components/Error.Loading/Loading"
import Message from "../../components/Error.Loading/Error";
import { memo } from "react";
const Login = () => {
  const [state, setState] = useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const infoUser = useSelector(state => state.Login)
  const handleSubmit = (e) => {
    e.preventDefault();
    LoginUser(state, dispatch, navigate);
  }
  return (
    <>
      <Navbar />
      <Map />
      <div className="container-fluid">
        <div className="container d-flex flex-column justify-content-center align-items-center py-5">
          {infoUser?.isFetching && <Loading />}
          {infoUser?.error && <Message variant={"alert-danger"}>{infoUser.message}</Message>}
          <form className="app_Login col-md-8 col-lg-4 col-11" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" className="form-control" name="email" onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })} />
            <input type="password" placeholder="Password" className="form-control" name="password" onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })} />
            <button type="submit" >Login</button>
            <p>
              <Link to={"/register"}>Create Account</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(Login);
