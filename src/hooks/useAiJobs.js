import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { aiJobsApi } from "@/api/aiJobs";

export function useAiJobs(params) {
  return useQuery({
    queryKey: ["ai-jobs", params],
    queryFn: () => aiJobsApi.getJobs(params),
  });
}

export function useAiJob(id) {
  return useQuery({
    queryKey: ["ai-jobs", id],
    queryFn: () => aiJobsApi.getJob(id),
    enabled: Boolean(id),
  });
}

export function useAiJobStats() {
  return useQuery({
    queryKey: ["ai-jobs", "stats"],
    queryFn: aiJobsApi.getStats,
  });
}

export function useRetryAiJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: aiJobsApi.retryJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ai-jobs"] }),
  });
}

export function useCancelAiJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: aiJobsApi.cancelJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ai-jobs"] }),
  });
}
