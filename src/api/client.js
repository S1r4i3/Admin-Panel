import axios from "axios";

// Use a relative base so requests go through Vite's proxy in dev
// (proxy forwards /api/* → http://localhost:8000/api/*)
export const apiClient = axios.create({
  baseURL: "/",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("smartlogix_access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
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
