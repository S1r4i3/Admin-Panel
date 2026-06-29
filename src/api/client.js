import axios from "axios";
import { TOKEN_KEY, REFRESH_KEY } from "@/contexts/AuthContext";

// Use a relative base so requests go through Vite's proxy in dev
// (proxy forwards /api/* → http://localhost:8000/api/*)
export const apiClient = axios.create({
  baseURL: "/",
  headers: { "Content-Type": "application/json" },
});

// ── Request: attach Bearer token ──────────────────────────────────────────────
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response: unwrap data + handle 401 with token refresh ────────────────────
let isRefreshing = false;
let pendingQueue = []; // { resolve, reject }[]

function processQueue(error, token = null) {
  pendingQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token)
  );
  pendingQueue = [];
}

function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem("smartlogix_user");
  // Hard-redirect so React Router picks up the unauthenticated state
  if (typeof window !== "undefined") window.location.href = "/login";
}

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      const refresh = localStorage.getItem(REFRESH_KEY);

      // No refresh token → log out immediately
      if (!refresh) {
        clearAuth();
        return Promise.reject(new Error("Session expired. Please log in again."));
      }

      if (isRefreshing) {
        // Queue this request until refresh completes
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return apiClient(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post("/api/token/refresh/", { refresh });
        const newAccess = res.data?.access ?? res.data;
        localStorage.setItem(TOKEN_KEY, newAccess);
        apiClient.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
        processQueue(null, newAccess);
        original.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(original);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuth();
        return Promise.reject(new Error("Session expired. Please log in again."));
      } finally {
        isRefreshing = false;
      }
    }

    const data = error.response?.data;
    const message =
      data?.detail ??
      data?.message ??
      (typeof data === "string" ? data : null) ??
      error.message ??
      "Request failed";
    return Promise.reject(new Error(message));
  },
);
