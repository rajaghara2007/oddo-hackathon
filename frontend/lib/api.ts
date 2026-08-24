import axios from 'axios';

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://tripora-backend-v2.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
