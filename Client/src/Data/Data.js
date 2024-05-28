// React Icons For Nav And React.......................
import { FiUser } from "react-icons/fi";
import { VscSearch } from "react-icons/vsc";
import { BsBag } from "react-icons/bs";

// Header Books  Data.......................
// import HBook1 from "../assets/HeaderBooks/headerBook1.png";
// import HBook2 from "../assets/HeaderBooks/headerBook2.png";
// import HBook3 from "../assets/HeaderBooks/headerBook3.png";

// Brands Data.......................
import Brand1 from "../assets/Brands/brand1.png";
import Brand2 from "../assets/Brands/brand2.png";
import Brand3 from "../assets/Brands/brand3.png";
import Brand4 from "../assets/Brands/brand4.png";
import Brand5 from "../assets/Brands/brand5.png";

// Featured Books Data.......................
import FeaturedBooks1 from "../assets/FeaturedBooksImages/FeaturedBook1.png";
import FeaturedBooks2 from "../assets/FeaturedBooksImages/FeaturedBook2.png";
import FeaturedBooks3 from "../assets/FeaturedBooksImages/FeaturedBook3.png";
import FeaturedBooks4 from "../assets/FeaturedBooksImages/FeaturedBook4.png";
import FeaturedBooks5 from "../assets/FeaturedBooksImages/FeaturedBook5.png";

// Popular Books Data.......................
import popularbook1 from "../assets/PopularBooksImage/book1.png";
import popularbook2 from "../assets/PopularBooksImage/book2.png";
import popularbook3 from "../assets/PopularBooksImage/book3.png";
import popularbook4 from "../assets/PopularBooksImage/book4.png";
import popularbook5 from "../assets/PopularBooksImage/book5.png";
import popularbook6 from "../assets/PopularBooksImage/book6.png";
import popularbook7 from "../assets/PopularBooksImage/book7.png";
import popularbook8 from "../assets/PopularBooksImage/book8.png";

// import react Icon.......................
import { ImFacebook, ImBehance } from "react-icons/im";
import { FiInstagram } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";
import { GrLinkedinOption } from "react-icons/gr";

// Selling Data.......................
import sellingBookimage from "../assets/SellingBookImage/sellingBook.png";

// Nav [a] Links  Data.......................
export const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Shope",
    path: "/shope",
  },

  {
    name: "Cart",
    path: "/Cart",
  },
  {
    name: "Orders",
    path: "/orders",
  },
  {
    name: "Login",
    path: "/Login",
  },
  {
    name: "Logout",
    path: "/Login",
  },
//   {
//     name: "About",
//     path: "/about",
//   },
];

// navRight links Data..............................
export const navRight = {
  managements: [
    {
      id: 1,
      icon: FiUser,
      link: "/profile",
    },
    {
      id: 2,
      icon: BsBag,
      link: "/cart",
    },
    {
      id: 3,
      icon: VscSearch,
      link: "/search",
    },
  ],
};
export const brandsData = [
  {
    id: 7,
    img: Brand1,
  },
  {
    id: 8,
    img: Brand2,
  },
  {
    id: 9,
    img: Brand3,
  },
  {
    id: 10,
    img: Brand4,
  },
  {
    id: 11,
    img: Brand5,
  },
];

export const booksData = [
  {
    id: 10,
    sold: 14,
    quantity: 120,
    price: 250,
    title: "OSGi in Depth",

    img: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/alves.jpg",

    description:
      "Enterprise OSGi shows a Java developer how to develop to the OSGi Service Platform Enterprise specification, an emerging Java-based technology for developing modular enterprise applications. Enterprise OSGi addresses several shortcomings of existing enterprise platforms, such as allowing the creation of better maintainable and extensible applications, and provide a simpler, easier-to-use, light-weight solution to enterprise software development.",

    author: "Alexandre de Castro Alves",
    category: "Technology",
  },
  {
    id: 11,
    sold: 1,
    quantity: 120,
    price: 250,
    title: "Flexible Rails",

    img: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/armstrong.jpg",
    description:
      '"Flexible Rails created a standard to which I hold other technical books. You definitely get your money\'s worth."',

    author: "Peter Armstrong",
    category: "Business",
  },
  {
    id: 13,
    sold: 12,
    quantity: 120,
    price: 250,
    title: "Hello! Flex 4",
    img: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/armstrong3.jpg",
    description:
      "Hello! Flex 4 progresses through 26 self-contained examples selected so you can progressively master Flex. They vary from small one-page apps, to a 3D rotating haiku, to a Connect Four-like game. And in the last chapter you'll learn to build a full Flex application called SocialStalkr   a mashup that lets you follow your friends by showing their tweets on a Yahoo map.",
    author: "Peter Armstrong",
    category: "Fictional",
  },
  {
    id: 26,
    sold: 18,
    quantity: 120,
    price: 250,
    title: "iBATIS in Action",
    img: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/begin.jpg",
    description:
      "   Gets new users going and gives experienced users in-depth coverage of advanced features.       Jeff Cunningham, The Weather Channel Interactive",
    author: "Clinton Begin",
    category: "Adventure",
  },
  {
    id: 27,
    sold: 12,
    quantity: 120,
    price: 250,
    title: "Designing Hard Software",
    img: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/birman.jpg",
    description:
      '"This book is well written ... The author does not fear to be controversial. In doing so, he writes a coherent book." --Dr. Frank J. van der Linden, Phillips Research Laboratories',
    author: "Douglas W. Bennett",
    category: "Business",
  },
  {
    id: 28,
    sold: 5,
    quantity: 120,
    price: 250,
    title: "Hibernate Search in Action",

    img: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/bernard.jpg",
    description:
      '"A great resource for true database independent full text search." --Aaron Walker, base2Services',
    author: "Emmanuel Bernard",
    category: "Business",
  },
  {
    id: 29,
    sold: 12,
    quantity: 120,
    price: 250,
    title: "jQuery in Action",

    img: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/bibeault.jpg",
    description:
      '"The best-thought-out and researched piece of literature on the jQuery library." --From the forward by John Resig, Creator of jQuery',
    author: "Bear Bibeault",
    category: "Romantic",
  },
  {
    id: 30,
    sold: 12,
    quantity: 120,
    price: 250,
    title: "jQuery in Action, Second Edition",

    img: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/bibeault2.jpg",
    description:
      "jQuery in Action, Second Edition is a fast-paced introduction to jQuery that will take your JavaScript programming to the next level. An in-depth rewrite of the bestselling first edition, this edition provides deep and practical coverage of the latest jQuery and jQuery UI releases. The book's unique \"lab pages\" anchor the explanation of each new concept in a practical example. You'll learn how to traverse HTML documents, handle events, perform animations, and add Ajax to your web pages. This comprehensive guide also teaches you how jQuery interacts with other tools and frameworks and how to build jQuery plugins. ",

    author: "Bear Bibeault",
    category: "Fictional",
  },
];

export const sellingBooksData = [
  {
    id: 17,
    category: "TECHNOLOGY",
    img: sellingBookimage,
    infoTitleTop: "By Timbur Hood",
    infoTitle: "Birds gonna be happy",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac",
    price: 45.0,
    shopbtnLink: "*",
  },
];

export const galleryData = [
  {
    id: 18,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: 38.0,
    category: "Business",
    img: popularbook1,
  },
  {
    id: 19,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: 38.0,
    category: "Technology",
    img: popularbook2,
  },
  {
    id: 20,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: 38.0,
    category: "Adventure",
    img: popularbook3,
  },
  {
    id: 21,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: 38.0,
    category: "Romantic",
    img: popularbook4,
  },
  {
    id: 22,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: 355.0,
    category: "Fictional",
    img: popularbook5,
  },
  {
    id: 23,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: 38.0,
    category: "Business",
    img: popularbook6,
  },
  {
    id: 24,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: 38.0,
    category: "Technology",
    img: popularbook7,
  },
  {
    id: 25,
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: 38.0,
    category: "Romantic",
    img: popularbook8,
  },
];

// Quote Data .......................

export const quoteData = [
  {
    id: 26,
    quote:
      "“The more that you read, the more things you will know. The more that you learn, the more places you’ll go.”",
    speaker: "Dr. Seuss",
  },
];

// Footers Data .......................
export const FootersLinksData = {
  Aboutus: [{ linkname: "vision ", link: "*" }],
  Discover: [
    { linkname: "Home ", link: "/" },
    { linkname: "Books ", link: "/shope" },
    { linkname: "Advanced Search ", link: "/search" },
  ],
  Myaccount: [
    { linkname: "Sign In", link: "/signup" },
    { linkname: "View Cart", link: "/cart" },
  ],

  Help: [{ linkname: "View Cart", link: "/cart" }],

  socials: [
    { icon: ImFacebook, link: "https://www.facebook.com" },
    { icon: FiInstagram, link: "https://www.twitter.com" },
    { icon: GrLinkedinOption, link: "https://www.instagram.com" },
    { icon: RiTwitterXLine, link: "https://www.twitter.com" },
    { icon: ImBehance, link: "https://www.twitter.com" },
  ],
};

// export const headerBooks = [
//   {
//     id: 4,
//     img: HBook1,
//     title: "Life of the wild",
//     info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat <br> amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna <br> velit eleifend. Amet, quis urna, a eu.",
//     btnLink: "*",
//   },
//   {
//     id: 5,
//     img: HBook2,
//     title: "Simple way of piece life",
//     info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat <br> amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna <br> velit eleifend. Amet, quis urna, a eu.",
//     btnLink: "*",
//   },
//   {
//     id: 6,
//     img: HBook3,
//     title: "Great travel at desert",
//     info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat <br> amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna <br> velit eleifend. Amet, quis urna, a eu.",
//     btnLink: "*",
//   },
// ];

export const featuredBooksData = [
  {
    id: 12,
    category: "TECHNOLOGY",
    img: FeaturedBooks1,
    imgLlink: "*",
    nameLink: "*",
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: 38.0,
  },
  {
    id: 13,
    category: "TECHNOLOGY",
    img: FeaturedBooks2,
    imgLlink: "*",
    nameLink: "*",
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: 38.0,
  },
  {
    id: 14,
    category: "TECHNOLOGY",
    img: FeaturedBooks3,
    imgLlink: "*",
    nameLink: "*",
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: 38.0,
  },
  {
    id: 15,
    category: "TECHNOLOGY",
    img: FeaturedBooks4,
    imgLlink: "*",
    nameLink: "*",
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: 38.0,
  },
  {
    id: 16,
    category: "TECHNOLOGY",
    img: FeaturedBooks5,
    imgLlink: "*",
    nameLink: "*",
    name: "Great travel at desert",
    writer: "Sanchit Howdy",
    price: 38.0,
  },
];
