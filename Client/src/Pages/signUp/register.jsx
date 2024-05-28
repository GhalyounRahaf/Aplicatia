import "./register.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/logo.png";
import { userSignupApi } from "../../apis/apis.js"; // Assuming you have a signup API function
import { Col, Row } from "react-bootstrap";
import SpinnerLoader from "../../Components/Spinner/spinne.jsx";
import { jwtDecode } from "jwt-decode";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const data = useSelector((state) => state.auth.loggedInUserData);
  useEffect(() => {
    window.scrollTo(0, 0);

    if (loginState) {
      data.isAdmin ? navigate("/dashboard") : navigate("/");
    }
  }, []);

  const isValidate = () => {
    let isProceed = true;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    const phoneRegex = /^[0-9]{11}$/;

    if (!first_name || first_name.trim() === "") {
      isProceed = false;
      toast.warn("Please enter a valid first name");
    } else if (!last_name || last_name.trim() === "") {
      isProceed = false;
      toast.warn("Please enter a valid last name");
    } else if (!username.match(usernameRegex)) {
      isProceed = false;
      toast.warn(
        "Please enter a valid username (3-16 characters, letters, numbers, underscores, hyphens)"
      );
    }
    // else if (!email.match(emailRegex)) {
    //   isProceed = false;
    //   toast.warn("Please enter a valid email address");
    // }
    else if (password.length < 5) {
      isProceed = false;
      toast.warn("Password must be at least 8 characters long");
    } else if (password !== confirmPassword) {
      isProceed = false;
      toast.warn("Passwords do not match");
    } else if (!phone.match(phoneRegex)) {
      isProceed = false;
      toast.warn("Please enter a valid phone number (11 digits)");
    } else if (!address || address.trim() === "") {
      isProceed = false;
      toast.warn("Please enter a valid address");
    }

    if (!isProceed) {
      setLoading(false);
    }

    return isProceed;
  };

  const proceedSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isValidate()) {
      try {
        const data = {
          first_name,
          last_name,
          username,
          email,
          password,
          confirmPassword,
          phone,
          address,
        };

        // Assuming userSignupApi is a function for signing up the user
        const response = await userSignupApi(data);
        console.log(response);
        toast.success(response.detail);
        setLoading(false);
        navigate("/login");
      } catch (error) {
        toast.error(error.detail);
      }
    }
  };

  return (
    <>
      <div className="signup-wrapper">
        <div className="loginLogo">
          <img src={Logo} alt="" />
        </div>
        <div className="mt-4 signup-title d-flex justify-content-center">
          <h4>Sign UP</h4>
        </div>
        <form className="p-3 mt-3" onSubmit={proceedSignup}>
          <Row className="justify-content-center ">
            <Col md={6}>
              <div className="form-field d-flex align-items-center">
                <span className="far fa-user"></span>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  value={first_name}
                  required={true}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </Col>
            <Col md={6}>
              {" "}
              <div className="form-field d-flex align-items-center">
                <span className="far fa-user"></span>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                  value={last_name}
                  required={true}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-envelope"></span>
            <input
              type="username"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              required={true}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-envelope"></span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-phone"></span>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-address-card"></span>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="mt-3 signup-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
        <div className="text-center fs-6">
          <a href="/login">Already have an account? Login</a>
        </div>
      </div>
      {loading && <SpinnerLoader />}
    </>
  );
};

export default Signup;
