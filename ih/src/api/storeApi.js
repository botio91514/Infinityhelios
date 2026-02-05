import axios from "axios";
import API_BASE_URL from "./config";

const BASE_URL = `${API_BASE_URL}/api/store`;

export const storeApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  },
  withCredentials: true,
});
// Add a request interceptor to attach JWT token if available
storeApi.interceptors.request.use((config) => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    try {
      const { token } = JSON.parse(savedUser);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (e) {
      localStorage.removeItem("user"); // Auto-clean corrupt data
    }
  }
  return config;
});

// GLOBAL ERROR HANDLER & AUTO-RETRY
storeApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 403 (Forbidden) or 401 (Unauthorized)
    if (error.response && (error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
      console.warn(`[StoreApi] Session expired (${error.response.status}). Auto-healing...`);

      originalRequest._retry = true;

      // 1. Clear ALL Session Data (Nuclear option for stability)
      localStorage.removeItem("user");
      localStorage.removeItem("wc_nonce");
      localStorage.removeItem("wc_cart_token");
      localStorage.removeItem("checkout_safe_data");

      // 2. Remove headers from the retry request so it goes as "Guest"
      delete originalRequest.headers["Authorization"];
      delete originalRequest.headers["Nonce"];
      delete originalRequest.headers["Cart-Token"];
      delete originalRequest.headers["X-WC-Store-API-Nonce"];

      // 3. Retry the request
      try {
        return await storeApi(originalRequest);
      } catch (retryError) {
        console.error("[StoreApi] Retry failed:", retryError);
        return Promise.reject(retryError);
      }
    }

    return Promise.reject(error);
  }
);
