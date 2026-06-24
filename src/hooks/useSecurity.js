import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { securityApi } from "@/api/security";

export function useSecurityLogs(params) {
  return useQuery({
    queryKey: ["security", "logs", params],
    queryFn: () => securityApi.getLogs(params),
  });
}

export function useLoginAttempts(params) {
  return useQuery({
    queryKey: ["security", "login-attempts", params],
    queryFn: () => securityApi.getLoginAttempts(params),
  });
}

export function useBlockedIps() {
  return useQuery({
    queryKey: ["security", "blocked-ips"],
    queryFn: securityApi.getBlockedIps,
  });
}

export function useBlockIp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: securityApi.blockIp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["security"] }),
  });
}

export function useUnblockIp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: securityApi.unblockIp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["security"] }),
  });
}
