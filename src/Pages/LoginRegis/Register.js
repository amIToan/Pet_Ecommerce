import "./Login.scss";
import Map from "../../components/maps/Map";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../redux/ApiRedux/apiRequest";
import { useDispatch } from "react-redux";
import { memo } from "react";
const Register = () => {
  const [Register, setRegister] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleRegister = (e) => {
    e.preventDefault();
    registerUser(Register, dispatch, navigate)
  }
  return (
    <>
      <Navbar />
      <Map />
      <div className="container-fluid">
        <div className="container d-flex flex-column justify-content-center align-items-center py-5">
          <form className="app_Login col-md-8 col-lg-4 col-11" onSubmit={handleRegister}>
            <input type="text" placeholder="Username" name="name" onChange={(e) => setRegister({ ...Register, [e.target.name]: e.target.value })} />
            <input type="email" placeholder="Email" name="email" onChange={(e) => setRegister({ ...Register, [e.target.name]: e.target.value })} />
            <input type="password" placeholder="Password" name="password" onChange={(e) => setRegister({ ...Register, [e.target.name]: e.target.value })} />
            <button type="submit">Register</button>
            <p>
              <Link to={"/login"}>
                I Have Account <strong>Login</strong>
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(Register);
