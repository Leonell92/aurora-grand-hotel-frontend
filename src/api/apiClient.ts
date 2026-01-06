import axios from 'axios';

// Get the API URL from environment variables
// If not found, use the default development URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

// Create our custom axios instance
// Think of this as a "customized fetch" with settings we want
const apiClient = axios.create({
  baseURL: API_BASE_URL,           // All requests will start with this URL
  timeout: 10000,                   // Wait max 10 seconds for response
  withCredentials: true,            // IMPORTANT: Send cookies for authentication
  headers: {
    'Content-Type': 'application/json',  // We're sending JSON data
  },
});

// Export it so other files can use it
export default apiClient;