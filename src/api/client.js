import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("smartlogix_access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message ?? error.message ?? "Request failed";
    if (error.response?.status === 401) {
      localStorage.removeItem("smartlogix_access_token");
      localStorage.removeItem("smartlogix_refresh_token");
    }
    return Promise.reject(new Error(message));
  },
);
