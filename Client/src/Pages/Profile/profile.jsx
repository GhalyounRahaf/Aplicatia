import "./profile.css";

import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../app/store.js";
import { loginUser } from "../../app/features/auth/authSlice.js";
import Logo from "../../assets/logo.png";
// import { userprofileApi } from "../../apis/apis.js"; // Assuming you have a profile API function
import { Col, Row } from "react-bootstrap";
import SpinnerLoader from "../../Components/Spinner/spinne.jsx";
import { updateUserDataApi, getUserApi } from "../../apis/apis.js";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const loginState = useSelector((state) => state.auth.isLoggedIn);
//   const data = useSelector((state) => state.auth.loggedInUserData);
  useEffect(() => {
    getUserApi(8).then(res=> {
        const data = res;
        console.log(loginState);
        console.log(data);
        window.scrollTo(0, 0);
        if (!loginState) {
          navigate("/login");
        } else {
          setUserData(data);
          setAddress(data.address);
          setFirstname(data.first_name);
          setLastname(data.last_name);
          setPhone(data.phone);
          setUsername(data.username);
          setId(data.id);
          setEmail(data.email);
        }
        }).catch(e => {
        console.log(e);
    });

  }, []);

  const isValidate = () => {
    let isProceed = true;

    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    const phoneRegex = /^[0-9]{11}$/;

    if (!firstname || firstname.trim() === "") {
      isProceed = false;
      toast.warn("Please enter a valid first name");
    } else if (!lastname || lastname.trim() === "") {
      isProceed = false;
      toast.warn("Please enter a valid last name");
    } else if (!username.match(usernameRegex)) {
      isProceed = false;
      toast.warn(
        "Please enter a valid username (3-16 characters, letters, numbers, underscores, hyphens)"
      );
    } else if (!phone.match(phoneRegex)) {
      isProceed = false;
      toast.warn("Please enter a valid phone number (11 digits)");
    } else if (!address || address.trim() === "") {
      isProceed = false;
      toast.warn("Please enter a valid address");
    } else if (password.length > 0) {
      if (password.length < 8) {
        isProceed = false;
        toast.warn("Password must be at least 8 characters long");
      }
    } else if (confirmPassword.length > 0) {
      if (password !== confirmPassword) {
        isProceed = false;
        toast.warn("Passwords do not match");
      }
    }

    if (!isProceed) {
      setLoading(false);
    }

    return isProceed;
  };
  const proceedprofile = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isValidate()) {
      try {
        const data =
          password.length > 0
            ? {
                first_name: firstname,
                last_name: lastname,
                new_password: password,
                phone: phone,
                email: email,
                address: address
              }
            : {
                first_name: firstname,
                last_name: lastname,
                phone:phone,
                address:address,
                email:email
              };

        console.log(JSON.stringify(data));
        const response = await updateUserDataApi(data, id);
        const successMessage = response.data ? response.data.detail : response.message;
        toast.success(successMessage);        
        setLoading(false);
       // navigate("/profile");
      } catch (error) {
        const errorMessage = error.response && error.response.data ? error.response.data.detail : error.message;
        toast.warn(errorMessage);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="profile-wrapper">
        <div className="loginLogo">
          <img src={Logo} alt="" />
        </div>
        <div className="mt-4 profile-title d-flex justify-content-center">
          <h2>Profile</h2>
        </div>
        <form className="p-3 mt-3" onSubmit={proceedprofile}>
          <Row className="justify-content-center ">
            <Col md={6}>
              <div className="form-field d-flex align-items-center">
                <span className="far fa-user"></span>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  value={firstname}
                  required={true}
                  onChange={(e) => setFirstname(e.target.value)}
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
                  value={lastname}
                  required={true}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-envelope"></span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              required={true}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="new Password"
              value={password}
              // required={true}
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
              // required={true}
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
              required={true}
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
              required={true}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="mt-3 profile-btn" type="submit">
              edit data
            </button>
          </div>
        </form>
      </div>
      {loading && <SpinnerLoader />}
    </>
  );
};

export default Profile;
