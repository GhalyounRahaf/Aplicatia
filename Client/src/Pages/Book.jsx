import { Fragment, useEffect, useState } from "react";
// import Banner from "../components/Banner/Banner";
import BookDetails from "../Components/BookDetails/bookDetails.jsx";
import { booksData } from "../Data/Data.js";
import { useParams } from "react-router-dom";
import { getBookApi, getRecommendationBooksApi } from "../apis/apis.js";
import SpinnerLoader from "../Components/Spinner/spinne.jsx";
import NotFound from "./NotFound/NotFound.jsx";
import FeaturesBooks from "../Components/FeaturesBooks/FeaturesBooks.jsx";
import { toast } from "react-toastify";

const Book = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendationBooks, setRecommendationBooks] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const fetchData = async () => {
      try {
        const selectedBookResponse = await getBookApi(id);
        const b = selectedBookResponse.data.data.book
        setSelectedBook(b);
        console.log(b);
        const recommendBooksResponse = await getRecommendationBooksApi(b.category.id);
        console.log(recommendBooksResponse);
        setRecommendationBooks(recommendBooksResponse.data.data.books);
        // console.log(JSON.stringify(recommendBooksResponse.data.data.books,   null, 2));
        console.log(recommendationBooks);

        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error(err.detail);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //   if (error) {
  //     return <NotFound />;
  //   }
  return (
    <Fragment>
      {!selectedBook ? (
        <>
          <div style={{ height: "90vh" }}>{error}</div>
          {/* <SpinnerLoader /> */}
        </>
      ) : (
        //repace selected book wiht book get from api
        <>
          <BookDetails book={selectedBook} />
          {recommendationBooks && (
            <FeaturesBooks
              title={"Recommendation Books"}
              books={recommendationBooks}
            />
          )}
        </>
      )}
      {loading && <SpinnerLoader />}
    </Fragment>
  );
};

export default Book;
