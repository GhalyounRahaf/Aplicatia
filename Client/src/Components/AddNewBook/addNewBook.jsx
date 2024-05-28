import "./addNewBook.css";

// React Imports..................
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";

// Apps Imports..................
import { store } from "../../app/store.js";
import { loginUser } from "../../app/features/auth/authSlice.js";

// Components Imports..................
import SpinnerLoader from "../Spinner/spinne.jsx";
import { addBookApi } from "../../apis/apis.js";

const AddNewBook = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const loginState = useSelector((state) => state.auth.isLoggedIn);

  // const isValidate = () => {
  //   // Add validation logic for new fields if necessary
  //   return true; // For simplicity, returning true here, you can add validation as per your requirements
  // };

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    price: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleImageChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     image: e.target.files[0],
  //   });
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("category", parseInt(formData.category));
    data.append("description", formData.description);
    data.append("photo", formData.photo);
    data.append("price", parseFloat(formData.price));

    try {
      const response = await addBookApi(data);
      const successMessage = response.data ? response.data.detail : response.message;
      toast.success(successMessage);    
      setLoading(false);

      setFormData({
        title: "",
        author: "",
        category: "",
        description: "",
        price: "",
        photo: null,
      });
      setImagePreview(null)
    } catch (error) {
        const errorMessage = error.response && error.response.data ? error.response.data.detail : error.message;
        toast.warn(errorMessage);
        setLoading(false);
    }
  };

  return (
    <>
      <div className="addNewBook-wrapper">
        <div className="mb-3 signup-title d-flex justify-content-center">
          <h4>Add New Book</h4>
        </div>
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-book"></span>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Book Title"
              value={formData.title}
              required={true}
              onChange={handleChange}
            />
          </div>

          <div className="form-field d-flex align-items-center">
            <span className="fas fa-book"></span>
            <textarea
              name="description"
              id="description"
              placeholder="Book Description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <Row className="justify-content-center ">
            <Col md={8}>
              <div className="form-field d-flex align-items-center">
                <span className="far fa-book"></span>
                <input
                  type="text"
                  name="author"
                  id="author"
                  placeholder="Book Author"
                  value={formData.author}
                  required={true}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="form-field d-flex align-items-center">
                <span className="far fa-book"></span>
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Price"
                  value={formData.price}
                  required={true}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center ">
            <Col md={16}>
              <div className="form-field d-flex align-items-center">
                <span className="fas fa-book"></span>
                <input
                  type="file"
                  name="photo"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="photo"
                />
                <label htmlFor="photo" className="custom-file-upload">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="image-preview"
                    />
                  ) : (
                    <h5 className="image-text">Upload Image</h5>
                  )}
                </label>
              </div>
            </Col>
          </Row>

          <div className="form-field d-flex align-items-center">
            <span className="far fa-book"></span>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              // className="form-field"
            >
              <option value="">Select Category</option>
              <option value="1">Business</option>
              <option value="2">Technology</option>
              <option value="3">Adventure</option>
              <option value="4">Romantic</option>
              <option value="5">Fictional</option>
            </select>
          </div>

          <div className="d-flex justify-content-center">
            <button className="mt-3 signup-btn" type="submit">
              Add Book
            </button>
          </div>
        </form>
      </div>
      {loading && <SpinnerLoader />}
    </>
  );
};

export default AddNewBook;
