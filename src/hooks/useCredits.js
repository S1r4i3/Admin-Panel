import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { creditsApi } from "@/api/credits";

export function useCredits(params) {
  return useQuery({
    queryKey: ["credits", params],
    queryFn: () => creditsApi.getCredits(params),
  });
}

export function useUserCredits(userId) {
  return useQuery({
    queryKey: ["credits", "user", userId],
    queryFn: () => creditsApi.getUserCredits(userId),
    enabled: Boolean(userId),
  });
}

export function useCreditTransactions(params) {
  return useQuery({
    queryKey: ["credits", "transactions", params],
    queryFn: () => creditsApi.getTransactions(params),
  });
}

export function useCreditStats() {
  return useQuery({
    queryKey: ["credits", "stats"],
    queryFn: creditsApi.getStats,
  });
}

export function useAddCredits() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: creditsApi.addCredits,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["credits"] }),
  });
}
