import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import * as fallback from "@/lib/dashboard-data";

const unwrap = (response) => response?.data ?? response;
const list = async (path, params) => unwrap(await apiClient.get(path, { params }));

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => unwrap(await apiClient.get("/dashboard")),
    retry: 1,
    staleTime: 30_000,
  });
}

export function useUsers(params = {}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => list("/users", params),
    placeholderData: fallback.users,
  });
}

export function useAIJobs(params = {}) {
  return useQuery({
    queryKey: ["ai-jobs", params],
    queryFn: () => list("/ai-jobs", params),
    placeholderData: fallback.aiJobs,
  });
}

export function usePlans(params = {}) {
  return useQuery({
    queryKey: ["plans", params],
    queryFn: () => list("/plans", params),
    placeholderData: fallback.planCards,
  });
}

export function useSubscriptions(params = {}) {
  return useQuery({
    queryKey: ["subscriptions", params],
    queryFn: () => list("/subscriptions", params),
    placeholderData: fallback.subscriptions,
  });
}

export function useTransactions(params = {}) {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => list("/payments/transactions", params),
    placeholderData: fallback.transactions,
  });
}

export function useNotifications(params = {}) {
  return useQuery({
    queryKey: ["notifications", params],
    queryFn: () => list("/notifications", params),
    placeholderData: fallback.notifications,
  });
}

export function useCMSContent(params = {}) {
  return useQuery({
    queryKey: ["cms-content", params],
    queryFn: async () => {
      const [pages, blogs, faqs, banners] = await Promise.all([
        list("/cms/pages", params),
        list("/cms/blogs", params),
        list("/cms/faqs", params),
        list("/cms/banners", params),
      ]);
      return [
        ...pages.map((item) => ({ ...item, type: "Page", category: "General", updatedAt: item.updatedAt })),
        ...blogs.map((item) => ({ ...item, type: "Blog", category: item.category ?? "General", updatedAt: item.updatedAt })),
        ...faqs.map((item) => ({ title: item.question, slug: item.id, type: "FAQ", category: item.category ?? "General", status: item.status, updatedAt: item.updatedAt })),
        ...banners.map((item) => ({ ...item, type: "Banner", category: item.placement ?? "General", updatedAt: item.updatedAt })),
      ];
    },
    placeholderData: fallback.contentRows,
  });
}

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: () => list("/analytics"),
  });
}

export function useCreateResource(path, queryKey) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => apiClient.post(path, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  });
}
