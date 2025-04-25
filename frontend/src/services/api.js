import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const fetchCategories = () =>
  axios.get(`${API_URL}/categories`);

export const fetchItems = (filters = {}) =>
  axios.get(`${API_URL}/api/v1/items/buscar`, { params: filters });

export const createItem = (data) =>
  axios.post(`${API_URL}/api/v1/items`, data);

export const updateItem = (code, data) =>
  axios.put(`${API_URL}/api/v1/items/${code}`, data);

export const deleteItem = (code) =>
  axios.delete(`${API_URL}/api/v1/items/${code}`);

export const fetchUsers = () =>
  axios.get(`${API_URL}/users`);

export const createUser = (data) =>
  axios.post(`${API_URL}/users`, data);
