import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const productService = {
  getAllProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${API_URL}/products?${queryString}`);
    return response.data;
  },

  getProductById: async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/products`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/products/${id}`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deleteProduct: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getCategories: async () => {
    const response = await axios.get(`${API_URL}/products/categories`);
    return response.data;
  }
};

export default productService;
