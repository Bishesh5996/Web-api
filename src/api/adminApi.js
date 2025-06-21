import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/admin',
  headers: { 'Content-Type': 'application/json' }
});
API.interceptors.request.use(req => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const fetchProducts = () => API.get('/products');
export const createProduct = data => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = id => API.delete(`/products/${id}`);
export const fetchCategories = () => API.get('/categories');
export const createCategory = data => API.post('/categories', data);
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);
export const deleteCategory = id => API.delete(`/categories/${id}`);
