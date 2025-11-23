import axios from "axios";
import { BASE_URL } from "./api_services";

// Set the base URL if needed
axios.defaults.baseURL = BASE_URL;

// Add the interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`; // Use 'Token' prefix for DRF
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
