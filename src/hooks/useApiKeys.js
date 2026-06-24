import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiKeysApi } from "@/api/apiKeys";

export function useApiKeys(params) {
  return useQuery({
    queryKey: ["api-keys", params],
    queryFn: () => apiKeysApi.getApiKeys(params),
  });
}

export function useApiKey(id) {
  return useQuery({
    queryKey: ["api-keys", id],
    queryFn: () => apiKeysApi.getApiKey(id),
    enabled: Boolean(id),
  });
}

export function useCreateApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiKeysApi.createApiKey,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["api-keys"] }),
  });
}

export function useRevokeApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiKeysApi.revokeApiKey,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["api-keys"] }),
  });
}
