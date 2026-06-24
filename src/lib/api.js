/**
 * Re-exports the axios apiClient as a simple interface.
 * All src/api/*.js files import from here — one place to swap the client.
 */
import { apiClient } from "@/api/client";

export const api = {
  get: (endpoint, params) => apiClient.get(endpoint, { params }),
  post: (endpoint, data) => apiClient.post(endpoint, data),
  put: (endpoint, data) => apiClient.put(endpoint, data),
  patch: (endpoint, data) => apiClient.patch(endpoint, data),
  delete: (endpoint) => apiClient.delete(endpoint),
};
