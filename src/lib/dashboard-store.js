import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useDashboardStore = create()(persist((set) => ({
    theme: "dark",
    sidebarCollapsed: false,
    setTheme: (theme) => set({ theme }),
    toggleTheme: () => set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
    setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}), {
    name: "smartlogix-dashboard-ui",
}));
