import "./login.css";

import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../app/store.js";
import { loginUser } from "../../app//features/auth/authSlice.js";
import Logo from "../../assets/logo.png";
import { userLoginApi } from "../../apis/apis.js";
import SpinnerLoader from "../../Components/Spinner/spinne.jsx";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);

  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const data = useSelector((state) => state.auth.loggedInUserData);
  useEffect(() => {
        console.log(data);
    window.scrollTo(0, 0);
    if (loginState) {
      data.isAdmin ? navigate("/dashboard") : navigate("/");
    }
  }, []);

  const isValidate = () => {
    let isProceed = true;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

    if (!username.match(usernameRegex)) {
      isProceed = false;
      toast.warn("Please enter in-valid email");
      setLoading(false);
    } else if (password.length < 5) {
      isProceed = false;
      toast.warn("Password must be minimum 5 characters");
      setLoading(false);
    }
    return isProceed;
  };

  const proceedLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isValidate()) {
      try {
        const response = await userLoginApi({ username, password });
        toast.success(response.detail);
        const { token, data, isAdmin } = response.data.data;
        console.log(token, data, isAdmin);
        // let dataa = JSON.parse(data);
        console.log(data);
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", isAdmin);
        store.dispatch(loginUser({ token, data}));
        setLoading(false);
        isAdmin ? navigate("/dashboard") : navigate("/");
      } catch (error) {
        const errorMessage = error.response && error.response.data ? error.response.data.detail : error.message;

        toast.warn(errorMessage);
        setLoading(false);
        // toast.error("Login failed due to: " + errorMessage);
      }
    }
  };
  return (
    <>
      <div className="wrapper">
        <div className="loginLogo">
          <img src={Logo} alt="" />
        </div>
        <div className="m-3 login-title d-flex justify-content-center">
          <h4>Login</h4>
        </div>
        <form className="p-3 mt-3" onSubmit={proceedLogin}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={username}
              required={true}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="pwd"
              placeholder="Password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="mt-3 login-btn" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="text-center fs-6">
          <a href="#">Forget password?</a> or <a href="/signup">Sign up</a>
        </div>
      </div>
      {loading && <SpinnerLoader />}
    </>
  );
};

export default Login;
