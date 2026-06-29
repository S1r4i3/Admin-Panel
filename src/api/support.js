import { api } from "@/lib/api";

export const supportApi = {
  getTickets:    (params)     => api.get("/api/support/tickets/", params),
  getTicket:     (id)         => api.get(`/api/support/tickets/${id}/`),
  createTicket:  (data)       => api.post("/api/support/tickets/", data),
  updateTicket:  (id, data)   => api.patch(`/api/support/tickets/${id}/`, data),
  closeTicket:   (id)         => api.post(`/api/support/tickets/${id}/close/`, {}),
  deleteTicket:  (id)         => api.delete(`/api/support/tickets/${id}/`),
  replyToTicket: (id, data)   => api.post(`/api/support/tickets/${id}/reply/`, data),
  getStats:      ()           => api.get("/api/support/stats/"),
};
