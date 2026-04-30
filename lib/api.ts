import axios from 'axios';

// Use NEXT_PUBLIC prefix for Next.js environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Required for HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': '1'
  },
});

// Helper to get cookie value by name
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

api.interceptors.request.use((config) => {
  // Only attach CSRF token for non-GET requests
  if (config.method !== 'get') {
    const csrfToken = getCookie('csrf_access_token');
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
    }
  }
  return config;
});