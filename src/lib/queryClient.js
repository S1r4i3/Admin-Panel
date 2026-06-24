import { QueryClient } from "@tanstack/react-query";

/**
 * Singleton QueryClient — shared between main.jsx (QueryClientProvider)
 * and router.jsx (TanStack Router context).
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   // 5 minutes
      gcTime: 1000 * 60 * 10,      // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx client errors
        if (error?.message?.match(/4\d{2}/)) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        console.error("Mutation error:", error.message);
      },
    },
  },
});
