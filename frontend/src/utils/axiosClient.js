import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://sportsphere-backend-ksch.onrender.com";

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error) // just reject the original error
);

export default axiosClient;