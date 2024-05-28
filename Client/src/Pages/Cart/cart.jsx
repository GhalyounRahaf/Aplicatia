// import css file
import "./cart.css";

// import react packages
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import {
  addToCart,
  clearListOfBooks,
  decreaseQty,
  deleteBook,
} from "../../app/features/cart/cartSlice";

// import react library to print order pdf
import HandlePrint from "../../helpers/orderPDF.js";
import SpinnerLoader from "../../Components/Spinner/spinne.jsx";
import { getCartApi, deleteFromCartApi, addOrderApi } from "../../apis/apis.js";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const[cart, setCart] = useState([]);

  // create order PDF when user click odered now
  const componentRef = useRef();
  const handlePrint = HandlePrint(componentRef);

  // get cart list from store
  const { cartList } = useSelector((state) => state.cart);

  // middlware to localStorage
  const totalPrice = cart.reduce(
    (price, item) => price + (item.quantity < 0 ? 1 : item.quantity) * item.book.price,
    0
  );
  async function removeFromCart(item) {
    try {
        console.log(item.book.id);
        const data = {'book_id': item.book.id}
        await deleteFromCartApi(data);
        toast.success("removed from cart");
        setCart(state => state.filter(it => it.book.id != item.book.id))
    } catch(error) {
        const errorMessage = error.response && error.response.data ? error.response.data.detail : error.message;
        toast.warn(errorMessage);
        setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    const fun = async () => {
        let res = await getCartApi()
        let data = res.data.data.cart_items
        setCart(data);
    }
    fun();
  }, []);

  const onSubmit = async (item) => {
    try {
        const data = {}
        await addOrderApi(data);
        toast.success("order Places Successfully");
        navigate("/shope");
    } catch(error) {
        const errorMessage = error.response && error.response.data ? error.response.data.detail : error.message;
        toast.warn(errorMessage);
        setLoading(false);
    }
  };
  return (
    <>
      <section className="cart-items" ref={componentRef}>
        <Container>
          <Row className="justify-content-center ">
            <Col md={8}>
              {cart.length === 0 && (
                <h1 className="no-items product">No Items are add in Cart</h1>
              )}
              {cart.map((item) => {
                // if (item.qty < 0) item.qty = 1;
                const productQty = item.price * 1 * item.qty * 1;
                return (
                  <div className="cart-list " key={item.id}>
                    <Row
                      className="mb-4 bg-body-tertiary "
                      style={{
                        position: "relative",
                      }}
                    >
                      <Col className="image-holder " sm={4} md={3}>
                        <img src={'http://127.0.0.1:8000'+ item.book.photo} alt="" />
                      </Col>
                      <Col sm={8} md={9} className="p-4">
                        <Row className="p-2 cart-content justify-content-center align-items-center">
                          <Col xs={12} sm={8} className="cart-details">
                            <h4>{item.book.title}</h4>

                            <h6 className="mt-4 text-secondary">
                              ${item.book.price}.00 * {item.quantity}
                              <span className="p-4 text-dark">
                                ${item.quantity}.00
                              </span>
                            </h6>
                          </Col>
                          <Col xs={12} sm={4} className="cartControl ">
                            <button
                              className="m-1 border rounded incCart border-secondary"
                              onClick={() =>
                                dispatch(addToCart({ product: item, num: 1 }))
                              }
                            >
                              <IoMdAdd
                                style={{ fontSize: "1.7rem", height: "20px" }}
                              />
                            </button>
                            <button
                              className="m-1 border rounded desCart border-secondary"
                              onClick={() => dispatch(decreaseQty(item))}
                            >
                              <FaMinus
                                style={{ fontSize: "1.7rem", height: "20px" }}
                              />
                            </button>
                          </Col>
                        </Row>
                      </Col>

                      {/* <Col sm={1} md={1} className="p-3"> */}
                      <button
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "20px",
                          width: "10px",
                          height: "10px",
                        }}
                        className="delete"
                        onClick={() => removeFromCart(item)}
                      >
                        <CgClose />
                      </button>
                      {/* </Col> */}
                    </Row>
                  </div>
                );
              })}
            </Col>
            <Col md={4}>
              <div className="p-4 cart-total bg-body-tertiary">
                <h4  >Cart Summary</h4>
                <hr />
                <div className=" d_flex mt-2" >
                  <h5>Total Price :</h5>

                  <h5 className="mt-2">$ {totalPrice}.00</h5>
                </div>
              </div>
              <div className="d-flex justify-content-center ">
                <button
                  className="mt-2 submit-btn"
                  type="submit"
                  // onClick={handlePrint}
                  onClick={onSubmit}
                >
                  Order Now
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {loading && <SpinnerLoader />}
    </>
  );
};

export default Cart;
