import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const fetchItems = (filters) => {
  // filters: { title, categoryId }
  return axios.get(`${API_URL}/items`, { params: filters });
};

export const createItem = (data) => axios.post(`${API_URL}/items`, data);
export const updateItem = (code, data) => axios.put(`${API_URL}/items/${code}`, data);
export const deleteItem = (code) => axios.delete(`${API_URL}/items/${code}`);
export const fetchCategories = () => axios.get(`${API_URL}/categorias`);
export const fetchItemByCode = (code) => axios.get(`${API_URL}/items/${code}`);