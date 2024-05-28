// import FeaturesBooks css..................
import "./FeaturesBooks.css";

// import Tytle Props ..................
import TitileTypeOne from "../../UI/TitileTypeOne/TitileTypeOne";

// Import Swiper React components......................
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

// Link From React Router........................
import { Link } from "react-router-dom";

// Import React Icon..........................
import { BsArrowReturnRight } from "react-icons/bs";

// Swiper Breakpoints..................
const breakpoints = {
  // when window width is <= 1024px
  1024: {
    slidesPerView: 4,
    spaceBetweenSlides: 30,
  },
  // when window width is <= 768px
  768: {
    slidesPerView: 3,
    spaceBetweenSlides: 20,
  },
  // when window width is <= 480px
  480: {
    slidesPerView: 2,
    spaceBetweenSlides: 10,
  },
  // when window width is <= 0
  0: {
    slidesPerView: 1,
    spaceBetweenSlides: 0,
  },
};

export default function FeaturesBooks({title,books}) {
    JSON.stringify(books, null, 2)
    return (
    <section className="Featured">
      <div className="container featurers-book-cotnainer">
        {/* ............Title Props......... */}
        <TitileTypeOne
          TitleTop={"Some quality items"}
          Title={title}
        />

        {/*........... FeaturedBooks Slider............ */}
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          loop={true}
          modules={[Pagination]}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          breakpoints={breakpoints}
        >
          {books.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div className="featurebook-box">
                  <Link to={`/book/${item.id}`} className="featurebook">
                    <img
                      loading="lazy"
                      src={'http://127.0.0.1:8000' +item.photo}
                      alt=""
                      //  onClick={() => handelClick(id)}
                    />
                  </Link>
                  <div className="featurebook-info">
                    <Link to={`/book/${item.id}`}>
                      <h4> {item.title}</h4>
                    </Link>
                    <div>
                      <small>{item.author}</small>
                    </div>
                    <h5>
                      <span>{item.price} $</span>
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

          <div className="feature-border container"></div>
          {/*.............swiper pagination........ */}
          <div className="swiper-pagination"></div>
          {/* View all products Button */}
          <a href="/shope" className="btn feature-btn">
            View all products <BsArrowReturnRight />
          </a>
        </Swiper>
      </div>
    </section>
  );
}
