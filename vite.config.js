import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://BACKEND_IP:8000", // ← replace BACKEND_IP with the backend laptop's IP
        changeOrigin: true,
      },
    },
  },
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwind(),
  ],
});
