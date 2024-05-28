import { Axios, AxiosForm } from "../helpers/axiosInstance.js";

// const yourAuthToken = "jjjj"
const yourAuthToken = localStorage.getItem('token');
// User APIs
export const userLoginApi = (data) => {
    console.log(data);
  const res =  Axios.post("/users/login", JSON.stringify(data));
  return res;
};
export const updateUserDataApi = async (data ,id) => {
    console.log(data);
  const res = await Axios.put(`/users/${id}`, JSON.stringify(data) , {
    headers: {
      Authorization: `Token ${yourAuthToken}`,
    },
  });
  return res;
};
export const userSignupApi = (data) => {
  console.log(data);
  const res = Axios.post("/users/signup", data);
  return res;
};

export const getUserApi = async (id) => {
  const res = await Axios.get(`/users/${id}`, {
    headers: {
      Authorization: `Token ${yourAuthToken}`,
    },
  });
  const {user} = res['data'];

  return user;
};

// Book APIs
export const getBookApi = (id) => {
  const res = Axios.get(`/books/${id}`, {
    headers: {
      Authorization: `Token ${yourAuthToken}`,
    },
  });
  return res;
};

export const getBooksApi = () => {
  const res = Axios.get(`/books`, {
    headers: {
      Authorization: `Token ${yourAuthToken}`,
    },
  });
  return res;
};
export const getRecommendationBooksApi = (id) => {
    const res = Axios.get(`/books/recommendation/${id}`, {
      headers: {
        Authorization: `Token ${yourAuthToken}`,
      },
    });
    return res;
  };
export const addBookApi = (data) => {
  const res = AxiosForm.post(`/books/`, data, {
    headers: {
      Authorization: `Token ${yourAuthToken}`,
    },
  });
  return res;
};

export const editBookApi = (id, data) => {
    const res = AxiosForm.put(`/books/${id}`, data, {
      headers: {
        Authorization: `Token ${yourAuthToken}`,
      },
    });
    return res;
}
export const deleteBookApi = (id) => {
  const res = Axios.delete(`/books/${id}`, {
    headers: {
      Authorization: `Token ${yourAuthToken}`,
    },
  });
  return res;
};

// Cart APIs
export const getCartApi = () => {
  const res = Axios.get(`/cart/`, {
    headers: {
      Authorization: `Token ${yourAuthToken}`,
    },
  });
  return res;
};

export const addToCartApi = (data) => {
  const res = Axios.post(`/cart/`, data, {
    headers: {
      Authorization: `Token ${yourAuthToken}`,
    },
  });
  return res;
};

export const deleteFromCartApi = (data) => {
  const res = Axios.delete(`/cart`, {
    headers: {
      Authorization: `Token ${yourAuthToken}`,
    },
    data: data,
  });
  return res;
};

// Order APIs
export const addOrderApi = (data) => {
  const res = Axios.post(`/orders/`, data, {
    headers: {
      Authorization: `Token ${yourAuthToken}`,
    },
  });
  return res;
};

export const getAllOrdersApi = (data) => {
  const res = Axios.post(`/orders/get/`, data, {
    headers: {
      Authorization: `Token ${yourAuthToken}`,
    },
  });
  return res;
};
