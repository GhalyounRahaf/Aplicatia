import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";

//Css
import "./book-details.css";
import { jwtDecode } from "jwt-decode";
import { addToCartApi, deleteBookApi } from "../../apis/apis.js";
import { Navigate } from "react-router-dom";
import SpinnerLoader from "../Spinner/spinne.jsx";

const BookDetails = ({ book }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const data = useSelector((state) => state.auth.loggedInUserData);

  useEffect(() => {
    console.log(data);
    window.scrollTo(0, 0);
    if (loginState && data) {
       
      setIsAdmin(data.isAdmin);
    }
  }, []);

  const handleQuantityChange = (e) => {
    e.target.value = e.target.value <= 0 ? 1 : e.target.value;
    setQuantity(e.target.value);
  };

  // Add To Cart Funcationality.........................

  const handelAdd = async(book, quantity) => {
    // dispatch(addToCart({ product: book, num: quantity }));
    try {
        
        const res = await addToCartApi({book: book, quantity: quantity})
        console.log({book: book, quantity: quantity});
        toast.success("Book has been added to cart!");

    } catch(e) {
        toast.error("Failed To add to the cart")
    }
  };

  const handelDeleted = async (id) => {
    setLoading(true);
    try {
      const response = await deleteBookApi(id);
      toast.success(response.detail);
      setLoading(false);
      Navigate("/shope");
    } catch (error) {
      toast.error(error.detail);
      setLoading(false);
    }
  };
  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img src={'http://127.0.0.1:8000'+ book.photo} alt="" />
          </Col>
          <Col md={6}>
            <div>
              <h2>{book?.title}</h2>
              <div className="info">
                <span className="price">${book?.price}</span>
                <span>category: {book?.category.name}</span>
              </div>
              <p>{book.description || ""}</p>
              <input
                className="qty-input"
                type="number"
                placeholder="Qty"
                value={quantity}
                onChange={handleQuantityChange}
              />
              {loginState && (
                <button
                  aria-label="Add"
                  type="submit"
                  className="add"
                  onClick={() => handelAdd(book.id, quantity)}
                >
                  Add To Cart
                </button>
              )}
              {isAdmin && (
                <button
                  aria-label="Delet"
                  type="submit"
                  className="delete-book"
                  onClick={() => handelDeleted(book?.id)}
                >
                  Delet Book
                </button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      {loading && <SpinnerLoader />}
    </section>
  );
};

export default BookDetails;
