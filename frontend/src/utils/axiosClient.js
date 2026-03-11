import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "http://localhost:4000" || "https://sportsphere-backend-ksch.onrender.com",
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error) // just reject the original error
);

export default axiosClient;