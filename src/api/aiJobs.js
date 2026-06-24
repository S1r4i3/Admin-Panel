import { api } from "@/lib/api";

export const aiJobsApi = {
  getJobs:   (params) => api.get("/api/ai-jobs/", params),
  getJob:    (id)     => api.get(`/api/ai-jobs/${id}/`),
  createJob: (data)   => api.post("/api/ai-jobs/", data),
  retryJob:  (id)     => api.post(`/api/ai-jobs/${id}/retry/`, {}),
  cancelJob: (id)     => api.post(`/api/ai-jobs/${id}/cancel/`, {}),
  deleteJob: (id)     => api.delete(`/api/ai-jobs/${id}/`),
  getStats:  ()       => api.get("/api/ai-jobs/stats/"),
};
