// Components Imports..................
import Header from "../Components/Header/Header";
import Brands from "../Components/Brands/Brands";
import FeaturesBooks from "../Components/FeaturesBooks/FeaturesBooks";
import BestSellingBook from "../Components/BestSellingBook/BestSellingBook";
import Quote from "../Components/Quote/Quote";

import { useEffect, useState } from "react";
import SpinnerLoader from "../Components/Spinner/spinne.jsx";
import {  getBooksApi } from "../apis/apis.js";
import { toast } from "react-toastify";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
 
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await getBooksApi();
        console.log(JSON.stringify(response.data.data.books, null, 2));
        setData(response.data.data.books)
        setLoading(false);
      } catch (err) {
        toast.error(err.detail);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Brands />
      <FeaturesBooks title={"Featured Books"} books={data}/>
      <BestSellingBook />
      <Quote />
      {loading && <SpinnerLoader />}
    </>
  );
}
