import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "@/api/notifications";

export function useNotifications(params) {
  return useQuery({
    queryKey: ["notifications", params],
    queryFn: () => notificationsApi.getNotifications(params),
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationsApi.markAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationsApi.markAllAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export function useSendBroadcast() {
  return useMutation({
    mutationFn: notificationsApi.sendBroadcast,
  });
}
