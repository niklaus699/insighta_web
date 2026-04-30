import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': '1'
  },
});

api.interceptors.request.use((config) => {
  // 1. Try to get token from LocalStorage (if you save it there after login)
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 2. CSRF Handling for non-GET requests (kept from your original)
  if (config.method !== 'get') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; csrf_access_token=`);
    if (parts.length === 2) {
        config.headers['X-CSRF-TOKEN'] = parts.pop()?.split(';').shift();
    }
  }
  return config;
});