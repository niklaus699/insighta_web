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
  // Check localStorage for the token (same way the CLI uses its json file)
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  
  if (token) {
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