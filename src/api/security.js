import { api } from "@/lib/api";

export const securityApi = {
  getLogs: (params = "") => api.get(`/security/logs/${params}`),
  getLog: (id) => api.get(`/security/logs/${id}/`),
  getLoginAttempts: (params = "") => api.get(`/security/login-attempts/${params}`),
  blockIp: (data) => api.post("/security/block-ip/", data),
  unblockIp: (ip) => api.delete(`/security/block-ip/${ip}/`),
  getBlockedIps: () => api.get("/security/blocked-ips/"),
  getTwoFactorStatus: (userId) => api.get(`/security/2fa/${userId}/`),
  disableTwoFactor: (userId) => api.post(`/security/2fa/${userId}/disable/`, {}),
};
