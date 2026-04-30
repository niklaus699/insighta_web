import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
  headers: {
    'X-API-Version': '1',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  
  // FIX: Only add the header if the token is a real string.
  // If token is null, no header is sent.
  // This allows the browser to use Cookies instead!
  if (token && token !== 'null' && token !== 'undefined') {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Keep your CSRF logic for POST/PUT/DELETE
  if (config.method !== 'get') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; csrf_access_token=`);
    if (parts.length === 2) {
      config.headers['X-CSRF-TOKEN'] = parts.pop()?.split(';').shift();
    }
  }
  return config;
});