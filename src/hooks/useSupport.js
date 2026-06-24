import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supportApi } from "@/api/support";

export function useSupportTickets(params) {
  return useQuery({
    queryKey: ["support", params],
    queryFn: () => supportApi.getTickets(params),
  });
}

export function useSupportTicket(id) {
  return useQuery({
    queryKey: ["support", id],
    queryFn: () => supportApi.getTicket(id),
    enabled: Boolean(id),
  });
}

export function useSupportStats() {
  return useQuery({
    queryKey: ["support", "stats"],
    queryFn: supportApi.getStats,
  });
}

export function useUpdateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => supportApi.updateTicket(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["support"] }),
  });
}

export function useCloseTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: supportApi.closeTicket,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["support"] }),
  });
}

export function useReplyToTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => supportApi.replyToTicket(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["support"] }),
  });
}
