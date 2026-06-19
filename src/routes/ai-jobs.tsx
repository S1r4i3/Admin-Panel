import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/app-shell";
import { AIJobsSection } from "@/components/dashboard/dashboard-widgets";

export const Route = createFileRoute("/ai-jobs")({ component: AIJobsPage, head: () => ({ meta: [{ title: "AI Jobs — SmartLogix AI" }, { name: "description", content: "Monitor and manage AI job executions across SmartLogix AI." }] }) });

function AIJobsPage() {
  return <AppShell title="AI Jobs" subtitle="Monitor and manage AI job executions across the platform."><AIJobsSection /></AppShell>;
}
