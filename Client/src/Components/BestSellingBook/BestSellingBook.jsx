// import BestSellingBook css.............
import "./BestSellingBook.css";

// import Title Props.............
import TitileTypeTwo from "../../UI/TitileTypeTwo/TitileTypeTwo";

// Import Tree Shape..............
import TreeShape from "../../assets/treeShape.png";

// Import Selling Books Data............
import { sellingBooksData, booksData } from "../../Data/Data";

// IMport Link from React Router..........
import { Link } from "react-router-dom";

// IMport React Icon............
import { BsArrowRight } from "react-icons/bs";

export default function BestSellingBook() {
  const maxSoldBook = booksData.reduce((maxProduct, currentProduct) => {
    if (currentProduct.sold > maxProduct.sold) {
      return currentProduct;
    } else {
      return maxProduct;
    }
  }, booksData[0]);

  const book = maxSoldBook;

  return (
    <section className="BestSellingBook">
      {/* ..............Selling Book Tree Shape.......... */}
      <div className="treeShape">
        <img src={TreeShape} alt="" />
      </div>

      {/* ...........Selling Book Content............. */}
      {
        <div className="container bestselling-container">
          {/* ...........left............. */}
          <div className="selling-book-left">
            <img src={book.img} alt="" />
          </div>

          {/* ...........right............. */}
          <div className="selling-book-right">
            <TitileTypeTwo
              Title={"Best selling book"}
              ClassName="sellingBookTitle"
            />
            <div>
              <small>{book.author}</small>
            </div>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <h5>
              <span>{book.price} $</span>
            </h5>
            <Link to={`/book/${book.id}`} className="btn">
              <small>Shop it now</small>
              <BsArrowRight />
            </Link>
          </div>
        </div>
      }
    </section>
  );
}
