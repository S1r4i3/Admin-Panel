import { api } from "@/lib/api";

export const subscriptionsApi = {
  getSubscriptions:   (params) => api.get("/api/subscriptions/", params),
  getSubscription:    (id)     => api.get(`/api/subscriptions/${id}/`),
  createSubscription: (data)   => api.post("/api/subscriptions/", data),
  updateSubscription: (id, data) => api.patch(`/api/subscriptions/${id}/`, data),
  cancelSubscription: (id)     => api.post(`/api/subscriptions/${id}/cancel/`, {}),
  getPlans:           ()       => api.get("/api/subscriptions/plans/"),
  getStats:           ()       => api.get("/api/subscriptions/stats/"),
};
