import { api } from "@/lib/api";

export const paymentsApi = {
  getTransactions:  (params) => api.get("/api/payments/transactions/", params),
  getTransaction:   (id)     => api.get(`/api/payments/transactions/${id}/`),
  refundPayment:    (id)     => api.post(`/api/payments/${id}/refund/`, {}),
  getStats:         ()       => api.get("/api/payments/stats/"),
  export:           ()       => api.get("/api/payments/export/"),
};
