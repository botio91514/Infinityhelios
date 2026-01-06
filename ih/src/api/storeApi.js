import axios from "axios";
import API_BASE_URL from "./config";

const BASE_URL = `${API_BASE_URL}/api/store`;

export const storeApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
// Add a request interceptor to attach JWT token if available
storeApi.interceptors.request.use((config) => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const { token } = JSON.parse(savedUser);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});
