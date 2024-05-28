import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Import Pages
import Home from "../Pages/Home";
import Book from "../Pages/Book";
// import About from "../Pages/About/about";
import Shope from "../Pages/Shope/shope";
import Signup from "../Pages/signUp/register";
import Login from "../Pages/Login/login";
import NotFound from "../Pages/NotFound/NotFound";
import Cart from "../Pages/Cart/cart";

import AdminBooks from '../Pages/AdminBooks/AdminBooks';
import AddNewBook from "../Components/AddNewBook/addNewBook.jsx";

// import AllBooks from "../Components/AllBooks/allBooks.jsx";

import Dashboard from "../Dashboard/pages/Dashboard";
import EditBook from "../Components/EditBook/EditBook";

// Import Components
import Nav from "../Components/Nav/Nav";
import Footer from "../Components/Footer/Footer";

// Import bootstrap and toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserOrders from "../Pages/userOrders/userOrders.jsx";
import Profile from "../Pages/Profile/profile.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  // State to track whether the current page is the dashboard page
  const [isDashboardPage, setIsDashboardPage] = useState(false);
  const [isAdminPage, setIsAdminPage] = useState(false);

  // Get the current location using the useLocation hook
  const location = useLocation();

  const isAdmin = localStorage.getItem("isAdmin");
  console.log("ADMINNNNNNNNNNN"+isAdmin);

 
  const dashboardPathRegex = /^\/dashboard\/?(?!book(s?))(\/[a-zA-Z0-9-]+\/?)?$/; 
  const adminRegex = /^\/dashboard\/book\/\w+$/;

  // Check if the current location is the dashboard page whenever the location changes
  useEffect(() => {
    setIsDashboardPage(dashboardPathRegex.test(location.pathname));
    setIsAdminPage(adminRegex.test(location.pathname));

  }, [location]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={true}
        limit={2}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-container"
        toastStyle={{
          backgroundColor: "#9da3aa",
          bai: "red", // Background color of the container
          color: "#fff", // Text color
          borderRadius: "8px", // Border radius
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Box shadow
          padding: "16px", // Padding
          fontSize: "16px", // Font size
          fontWeight: "bold", // Font weight
        }}
      />
      {(!isDashboardPage && !isAdminPage)  && <Nav />}

      {/* Router component with routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/shope" element={<Shope />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/about" element={<About />} /> */}

        <Route path="/orders" element={<UserOrders />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/book/:id" element={<Dashboard />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
        <Route path="" element={<Dashboard />} />
        <Route path="book" element={<AddNewBook />} />
        <Route path="books" element={<AdminBooks />} />

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Conditionally render the footer based on whether the current page is the dashboard page */}
      {!isDashboardPage && <Footer />}
    </>
  );
}
