import axios from "axios";

const addProduct = async (form) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("user");
  const res = await axios.post(`http://localhost:5000/products`, form);
  return res.data;
};

const getProducts = async (page, title) => {
    if (page && title) {
        const res = await axios.get(
          `http://localhost:5000/products?title=${title}&page=${page}`
        );
        return res.data;
    } else if (page) {
        const res = await axios.get(`http://localhost:5000/products?page=${page}`);
        return res.data;
    } else if (title) {
        const res = await axios.get(`http://localhost:5000/products?title=${title}`);
        return res.data;
    } else {
        const res = await axios.get("http://localhost:5000/products");
        return res.data;
    }
};


const getSingleProduct = async (id) => {
    const res = await axios.get(`http://localhost:5000/products/${id}`);
    return res.data;
};

const editProduct = async (id , form) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user");
    const res = await axios.put(`http://localhost:5000/products/${id}`, form);
    return res.data;
};
  


const deleteProduct = async (id, user_id) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user");
    const res = await axios.delete(`http://localhost:5000/products/${id}`, user_id);
    return res.data;
  };

export {
    addProduct,
    getProducts,
    getSingleProduct,
    editProduct,
    deleteProduct
};
