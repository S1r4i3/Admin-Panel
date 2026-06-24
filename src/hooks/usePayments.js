import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentsApi } from "@/api/payments";

export function usePayments(params) {
  return useQuery({
    queryKey: ["payments", params],
    queryFn: () => paymentsApi.getPayments(params),
  });
}

export function usePayment(id) {
  return useQuery({
    queryKey: ["payments", id],
    queryFn: () => paymentsApi.getPayment(id),
    enabled: Boolean(id),
  });
}

export function usePaymentStats() {
  return useQuery({
    queryKey: ["payments", "stats"],
    queryFn: paymentsApi.getPaymentStats,
  });
}

export function useRefundPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: paymentsApi.refundPayment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["payments"] }),
  });
}
