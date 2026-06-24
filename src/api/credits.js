import { api } from "@/lib/api";

export const creditsApi = {
  getCredits:       (params) => api.get("/api/credits/", params),
  getUserCredits:   (userId) => api.get(`/api/credits/user/${userId}/`),
  addCredits:       (data)   => api.post("/api/credits/add/", data),
  deductCredits:    (data)   => api.post("/api/credits/deduct/", data),
  getTransactions:  (params) => api.get("/api/credits/transactions/", params),
  getStats:         ()       => api.get("/api/credits/stats/"),
};
