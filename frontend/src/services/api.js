import axios from 'axios';

const USERS_API_URL = import.meta.env.VITE_API_USERS_URL || 'http://localhost:8000/api';
const PRODUCTS_API_URL = import.meta.env.VITE_API_PRODUCTS_URL || 'http://localhost:3000/products';

const createApiInstance = (baseURL) => {
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
};

export const usersApi = createApiInstance(USERS_API_URL);
export const productsApi = createApiInstance(PRODUCTS_API_URL);