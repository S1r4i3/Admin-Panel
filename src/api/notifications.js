import { api } from "@/lib/api";

export const notificationsApi = {
  getNotifications:   (params) => api.get("/api/notifications/", params),
  getNotification:    (id)     => api.get(`/api/notifications/${id}/`),
  createNotification: (data)   => api.post("/api/notifications/", data),
  markAsRead:         (id)     => api.post(`/api/notifications/${id}/read/`, {}),
  markAllAsRead:      ()       => api.post("/api/notifications/read-all/", {}),
  deleteNotification: (id)     => api.delete(`/api/notifications/${id}/`),
  sendBroadcast:      (data)   => api.post("/api/notifications/broadcast/", data),
};
