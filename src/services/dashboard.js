import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import * as fallback from "@/lib/dashboard-data";

// apiClient response interceptor already returns response.data,
// so we just return the result directly.
const get = (path, params) => apiClient.get(path, { params });

// ─── Dashboard Summary ────────────────────────────────────────────────────────
// No dedicated /api/dashboard/ endpoint — aggregate from individual APIs
export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const [users, analytics] = await Promise.allSettled([
        get("/api/auth/users/"),
        get("/api/analytics/"),
      ]);
      return {
        totalUsers: users.status === "fulfilled" ? users.value?.count ?? users.value?.length : null,
        analytics: analytics.status === "fulfilled" ? analytics.value : null,
      };
    },
    retry: 1,
    staleTime: 30_000,
  });
}

// ─── Users ────────────────────────────────────────────────────────────────────
export function useUsers(params = {}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => get("/api/auth/users/", params),
    placeholderData: fallback.users,
  });
}

// ─── AI Jobs ─────────────────────────────────────────────────────────────────
export function useAIJobs(params = {}) {
  return useQuery({
    queryKey: ["ai-jobs", params],
    queryFn: () => get("/api/ai-jobs/", params),
    placeholderData: fallback.aiJobs,
  });
}

// ─── Subscriptions / Plans ───────────────────────────────────────────────────
export function usePlans(params = {}) {
  return useQuery({
    queryKey: ["plans", params],
    queryFn: () => get("/api/subscriptions/plans/", params),
    placeholderData: fallback.planCards,
  });
}

export function useSubscriptions(params = {}) {
  return useQuery({
    queryKey: ["subscriptions", params],
    queryFn: () => get("/api/subscriptions/", params),
    placeholderData: fallback.subscriptions,
  });
}

// ─── Payments ────────────────────────────────────────────────────────────────
export function useTransactions(params = {}) {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => get("/api/payments/transactions/", params),
    placeholderData: fallback.transactions,
  });
}

// ─── Notifications ───────────────────────────────────────────────────────────
export function useNotifications(params = {}) {
  return useQuery({
    queryKey: ["notifications", params],
    queryFn: () => get("/api/notifications/", params),
    placeholderData: fallback.notifications,
  });
}

// ─── CMS ─────────────────────────────────────────────────────────────────────
export function useCMSContent(params = {}) {
  return useQuery({
    queryKey: ["cms-content", params],
    queryFn: async () => {
      const [pages, blogs, faqs, banners] = await Promise.allSettled([
        get("/api/cms/pages/", params),
        get("/api/cms/blogs/", params),
        get("/api/cms/faqs/", params),
        get("/api/cms/banners/", params),
      ]);
      const safe = (r) => (r.status === "fulfilled" ? (Array.isArray(r.value) ? r.value : r.value?.results ?? []) : []);
      return [
        ...safe(pages).map((item) => ({ ...item, type: "Page", category: item.category ?? "General" })),
        ...safe(blogs).map((item) => ({ ...item, type: "Blog", category: item.category ?? "General" })),
        ...safe(faqs).map((item) => ({ title: item.question, slug: item.id, type: "FAQ", category: item.category ?? "General", status: item.status, updatedAt: item.updated_at })),
        ...safe(banners).map((item) => ({ ...item, type: "Banner", category: item.placement ?? "General" })),
      ];
    },
    placeholderData: fallback.contentRows,
  });
}

// ─── Analytics ───────────────────────────────────────────────────────────────
export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: () => get("/api/analytics/"),
  });
}

// ─── API Keys ────────────────────────────────────────────────────────────────
export function useApiKeys(params = {}) {
  return useQuery({
    queryKey: ["api-keys", params],
    queryFn: () => get("/api/api-keys/", params),
    placeholderData: fallback.apiKeys,
  });
}

// ─── Credits ─────────────────────────────────────────────────────────────────
export function useCredits(params = {}) {
  return useQuery({
    queryKey: ["credits", params],
    queryFn: () => get("/api/credits/", params),
    placeholderData: fallback.creditPurchases,
  });
}

// ─── Support ─────────────────────────────────────────────────────────────────
export function useSupport(params = {}) {
  return useQuery({
    queryKey: ["support", params],
    queryFn: () => get("/api/support/", params),
  });
}

// ─── Generic create/update/delete ────────────────────────────────────────────
export function useCreateResource(path, queryKey) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => apiClient.post(path, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  });
}
