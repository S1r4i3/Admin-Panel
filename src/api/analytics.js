import { api } from "@/lib/api";

export const analyticsApi = {
  getOverview:   ()       => api.get("/api/analytics/"),
  getRevenue:    (params) => api.get("/api/analytics/revenue/", params),
  getUserGrowth: (params) => api.get("/api/analytics/user-growth/", params),
  getUsageStats: (params) => api.get("/api/analytics/usage/", params),
  getTopUsers:   ()       => api.get("/api/analytics/top-users/"),
  exportReport:  (params) => api.get("/api/analytics/export/", params),
};
