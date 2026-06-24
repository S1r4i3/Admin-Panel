import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountsApi } from "@/api/accounts";

export function useUsers(params) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => accountsApi.getUsers(params),
  });
}

export function useUser(id) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => accountsApi.getUser(id),
    enabled: Boolean(id),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountsApi.createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => accountsApi.updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountsApi.deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}
