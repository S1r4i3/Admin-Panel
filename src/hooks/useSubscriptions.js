import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionsApi } from "@/api/subscriptions";

export function useSubscriptions(params) {
  return useQuery({
    queryKey: ["subscriptions", params],
    queryFn: () => subscriptionsApi.getSubscriptions(params),
  });
}

export function useSubscription(id) {
  return useQuery({
    queryKey: ["subscriptions", id],
    queryFn: () => subscriptionsApi.getSubscription(id),
    enabled: Boolean(id),
  });
}

export function usePlans() {
  return useQuery({
    queryKey: ["subscriptions", "plans"],
    queryFn: subscriptionsApi.getPlans,
  });
}

export function useSubscriptionStats() {
  return useQuery({
    queryKey: ["subscriptions", "stats"],
    queryFn: subscriptionsApi.getStats,
  });
}

export function useCancelSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: subscriptionsApi.cancelSubscription,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subscriptions"] }),
  });
}
