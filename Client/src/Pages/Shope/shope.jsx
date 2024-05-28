// import PopularBooks.css............
import "./shope.css";

// Impor Books Data...............
import { booksData } from "../../Data/Data";

// Import useSate.........................
import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice.js";
import { toast } from "react-toastify";
import { getBooksApi, addToCartApi } from "../../apis/apis.js";

export default function Shope() {
    const loginState = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getBooksApi().then(res=> {
        const data = res.data.data.books;
        if (!loginState) {
          navigate("/login");
        } else {
          setBooks(data);
        }
        }).catch(e => {
        console.log(e);
    });

  }, []);
  // Active Button Funcationality..........................
  const [activeButton, setActiveButton] = useState("all");

  const dispatch = useDispatch();

  const handleFilterChange = (category) => {
    setActiveButton(category);
  };

  // Fillter Gallery Funcationality..........................
  const filterItems =
    activeButton === "all"
      ? books
      : books.filter((item) => item.category.name === activeButton);
  
 
      // Add To Cart Funcationality.........................
  const handelAdd = async(book, quantity) => {
    // dispatch(addToCart({ product: book, num: quantity }));
    try {
        const res = await addToCartApi({book: book, quantity: quantity})
        toast.success("Book has been added to cart!");

    } catch(e) {
        toast.error("Failed To add to the cart")
    }
  };
  return (
    <section className="PopularBooks">
      {/* ..........Fillter Tabs Button............. */}
      <div className="filter-buttons">
        <button
          className={activeButton === "all" ? "active" : ""}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={activeButton === "Business" ? "active" : ""}
          onClick={() => handleFilterChange("Business")}
        >
          Business
        </button>
        <button
          className={activeButton === "Technology" ? "active" : ""}
          onClick={() => handleFilterChange("Technology")}
        >
          Technology
        </button>
        <button
          className={activeButton === "Adventure" ? "active" : ""}
          onClick={() => handleFilterChange("Adventure")}
        >
          Adventure
        </button>
        <button
          className={activeButton === "Romantic" ? "active" : ""}
          onClick={() => handleFilterChange("Romantic")}
        >
          Romantic
        </button>
        <button
          className={activeButton === "Fictional" ? "active" : ""}
          onClick={() => handleFilterChange("Fictional")}
        >
          Fictional
        </button>
      </div>

      {/* ..........Fillter Books Content............. */}
      <div className="gallery">
        {filterItems.map((item, index) => {
          return (
            <div className="gallery-item" key={index}>
              {/* <div className="popularbook-image"> */}
              <img src={'http://127.0.0.1:8000' + item.photo} alt={item.title} />
              {/* </div> */}
              <div className="popularbook-info">
                {item.title.length <= 30 ? (
                  <h4>{item.title}</h4>
                ) : (
                  <h5>{item.title}</h5>
                )}
                <div>
                  <small>{item.author}</small>
                </div>
                <h5>
                  <span>{item.price}</span>
                </h5>
                <button
                  type="button"
                  className="add-to-cart"
                  data-product-tile="add-to-cart"
                  onClick={() => handelAdd(item.id, 1)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
