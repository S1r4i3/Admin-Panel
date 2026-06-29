import { api } from "@/lib/api";

export const securityApi = {
  getLogs:            (params)  => api.get("/api/security/logs/", params),
  getLog:             (id)      => api.get(`/api/security/logs/${id}/`),
  getLoginAttempts:   (params)  => api.get("/api/security/login-attempts/", params),
  blockIp:            (data)    => api.post("/api/security/block-ip/", data),
  unblockIp:          (ip)      => api.delete(`/api/security/block-ip/${ip}/`),
  getBlockedIps:      ()        => api.get("/api/security/blocked-ips/"),
  getTwoFactorStatus: (userId)  => api.get(`/api/security/2fa/${userId}/`),
  disableTwoFactor:   (userId)  => api.post(`/api/security/2fa/${userId}/disable/`, {}),
};
