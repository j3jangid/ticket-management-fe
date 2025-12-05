import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3534',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token automatically if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
