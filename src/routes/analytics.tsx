import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/app-shell";
import { AnalyticsSection } from "@/components/dashboard/dashboard-widgets";

export const Route = createFileRoute("/analytics")({ component: AnalyticsPage, head: () => ({ meta: [{ title: "Analytics — SmartLogix AI" }, { name: "description", content: "Revenue, user, subscription, and AI usage analytics for SmartLogix AI." }] }) });

function AnalyticsPage() {
  return <AppShell title="Analytics" subtitle="Track revenue, user growth, subscriptions, and AI usage."><AnalyticsSection /></AppShell>;
}
