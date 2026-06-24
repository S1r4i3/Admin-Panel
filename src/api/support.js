import { api } from "@/lib/api";

export const supportApi = {
  getTickets: (params = "") => api.get(`/support/tickets/${params}`),
  getTicket: (id) => api.get(`/support/tickets/${id}/`),
  createTicket: (data) => api.post("/support/tickets/", data),
  updateTicket: (id, data) => api.patch(`/support/tickets/${id}/`, data),
  closeTicket: (id) => api.post(`/support/tickets/${id}/close/`, {}),
  deleteTicket: (id) => api.delete(`/support/tickets/${id}/`),
  replyToTicket: (id, data) => api.post(`/support/tickets/${id}/reply/`, data),
  getStats: () => api.get("/support/stats/"),
};
