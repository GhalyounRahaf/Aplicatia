// axiosInstance.js
import axios from "axios";

const token = localStorage.getItem("authToken");

export const Axios = axios.create({
  baseURL: "http://127.0.0.1:8000", // Replace with your API's base URL
  timeout: 5000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Token ${token}`,
    // You can add any custom headers here
  },
});

export const AxiosForm = axios.create({
  baseURL:  "http://127.0.0.1:8000/", // Replace with your API's base URL
  timeout: 5000, // Timeout in milliseconds
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Token ${token}`,
    // You can add any custom headers here
  },
});
