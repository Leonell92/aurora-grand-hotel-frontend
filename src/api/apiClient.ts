import axios from 'axios';

// Hardcoded for production (temporary fix)
const API_BASE_URL = 'https://aurora-grand-hotel-backend.onrender.com/api';

// Create our custom axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;