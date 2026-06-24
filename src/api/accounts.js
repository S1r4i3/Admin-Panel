import { api } from "@/lib/api";

export const accountsApi = {
  // Users
  getUsers:       (params) => api.get("/api/auth/users/", params),
  getUser:        (id)     => api.get(`/api/auth/users/${id}/`),
  createUser:     (data)   => api.post("/api/auth/users/", data),
  updateUser:     (id, data) => api.patch(`/api/auth/users/${id}/`, data),
  deleteUser:     (id)     => api.delete(`/api/auth/users/${id}/`),

  // Profile
  getProfile:     ()       => api.get("/api/auth/profile/"),
  updateProfile:  (data)   => api.patch("/api/auth/profile/", data),
  changePassword: (data)   => api.post("/api/auth/change-password/", data),
};
