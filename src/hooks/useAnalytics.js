import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "@/api/analytics";

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: analyticsApi.getOverview,
  });
}

export function useRevenueAnalytics(params) {
  return useQuery({
    queryKey: ["analytics", "revenue", params],
    queryFn: () => analyticsApi.getRevenue(params),
  });
}

export function useUserGrowth(params) {
  return useQuery({
    queryKey: ["analytics", "user-growth", params],
    queryFn: () => analyticsApi.getUserGrowth(params),
  });
}

export function useUsageStats(params) {
  return useQuery({
    queryKey: ["analytics", "usage", params],
    queryFn: () => analyticsApi.getUsageStats(params),
  });
}

export function useTopUsers() {
  return useQuery({
    queryKey: ["analytics", "top-users"],
    queryFn: analyticsApi.getTopUsers,
  });
}
