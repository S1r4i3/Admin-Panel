import { AppShell } from "@/components/dashboard/app-shell";
import { AIJobsSection } from "@/components/dashboard/dashboard-widgets";

export default function AiJobsPage() {
  return (
    <AppShell title="AI Jobs" subtitle="Monitor and manage AI job executions across the platform.">
      <AIJobsSection />
    </AppShell>
  );
}
