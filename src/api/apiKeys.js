import { api } from "@/lib/api";

export const apiKeysApi = {
  getApiKeys:   (params) => api.get("/api/api-keys/", params),
  getApiKey:    (id)     => api.get(`/api/api-keys/${id}/`),
  createApiKey: (data)   => api.post("/api/api-keys/", data),
  revokeApiKey: (id)     => api.post(`/api/api-keys/${id}/revoke/`, {}),
  deleteApiKey: (id)     => api.delete(`/api/api-keys/${id}/`),
  getUsage:     (id)     => api.get(`/api/api-keys/${id}/usage/`),
};
