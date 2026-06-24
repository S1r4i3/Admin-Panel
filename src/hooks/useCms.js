import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cmsApi } from "@/api/cms";

export function usePages(params) {
  return useQuery({
    queryKey: ["cms", "pages", params],
    queryFn: () => cmsApi.getPages(params),
  });
}

export function usePage(id) {
  return useQuery({
    queryKey: ["cms", "pages", id],
    queryFn: () => cmsApi.getPage(id),
    enabled: Boolean(id),
  });
}

export function useCreatePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cmsApi.createPage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cms", "pages"] }),
  });
}

export function useUpdatePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => cmsApi.updatePage(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cms", "pages"] }),
  });
}

export function usePosts(params) {
  return useQuery({
    queryKey: ["cms", "posts", params],
    queryFn: () => cmsApi.getPosts(params),
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cmsApi.createPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cms", "posts"] }),
  });
}
