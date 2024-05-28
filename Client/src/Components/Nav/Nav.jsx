// Nav.Css Import .........................
import "./Nav.css";

// Import Router Link.........................
import { Link, NavLink } from "react-router-dom";

// Import Logo..............
import Logo from "../../assets/logo.png";

// Import NavData.........................
import { navLinks, navRight } from "../../Data/Data";

// Imoports Menu Icons..........................
import { VscMenu } from "react-icons/vsc";
import { GrClose } from "react-icons/gr";

// Imoports use State..........................
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../app/store.js";
import { logoutUser } from "../../app/features/auth/authSlice.js";

// check if user logged

export default function Nav() {
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const logout = (name) => {
    console.log(name);
    if (name === "Logout") {
      store.dispatch(logoutUser());
    }
  };

  // Use State For NavLinks Show And Hide...................
  const [isNavLinksShowing, setIsNavLinkShowing] = useState(false);

  // .......Window Scroll Nav-links Effects..............
  if (innerWidth < 1024) {
    window.addEventListener("scroll", () => {
      document.querySelector(".nav-links").classList.add("navLinksHide");
      setIsNavLinkShowing(false);
    });
  }
  window.addEventListener("scroll", () => {
    document
      .querySelector("nav")
      .classList.toggle("navShadow", window.scrollY > 0);
  });

  return (
    <nav>
      <div className="container nav-container">
        {/* .............Logo............ */}
        <a href="/" className="logo">
          <img src={Logo} alt="Logo" />
        </a>

        {/* .............Nav-Links............ */}
        <ul
          className={`nav-links ${
            isNavLinksShowing ? "navLinksShow" : "navLinksHide"
          }`}
        >
          {navLinks.map(({ name, path }, index) => {
            return name === "Login" && loginState ? (
              <></>
            ) : name === "Logout" && !loginState ? (
              <></>
            ) : (
              <li key={index}>
                <NavLink
                  onClick={() => {
                    console.log(name);
                    if (name === "Logout") {
                      store.dispatch(logoutUser());
                      localStorage.removeItem("token");
                    }
                  }}
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* .............Nav-Right............ */}
        <div className="nav-right">
          {navRight.managements.map((item, index) => {
            return (
              <Link
                key={index}
                // target='_blank'
                className="management-icons"
                to={item.link}
              >
                <item.icon />
              </Link>
            );
          })}

          <button
            className="menu-button"
            onClick={() => setIsNavLinkShowing(!isNavLinksShowing)}
          >
            {!isNavLinksShowing ? <VscMenu /> : <GrClose />}
          </button>
        </div>
      </div>
    </nav>
  );
}
