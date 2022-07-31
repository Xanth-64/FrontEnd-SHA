import axios from 'axios';
import {getCookie} from 'cookies-next'
const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:5000',
})

axiosInstance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.common['Accept'] = 'application/json';
// axiosInstance.defaults.headers.common['Accept-Encoding'] = 'gzip, deflate';

// Get Authorization Header from Cookies on every Request
axiosInstance.interceptors.request.use((config) => {
    const token = getCookie('idToken');
    if (token) {
        if (config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
})

export default axiosInstance;