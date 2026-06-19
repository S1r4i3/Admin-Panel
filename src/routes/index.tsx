import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/dashboard/app-shell";
import {
  BottomOverview,
  KPIFooter,
  MetricCards,
  OverviewCharts,
} from "@/components/dashboard/dashboard-widgets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — SmartLogix AI" },
      { name: "description", content: "SmartLogix AI enterprise dashboard overview with KPIs, charts, platform health, and activity." },
      { property: "og:title", content: "Dashboard — SmartLogix AI" },
      { property: "og:description", content: "Enterprise dashboard overview for SmartLogix AI." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle="Welcome back. Here's what's happening with your platform.">
      <div className="space-y-4">
        <MetricCards />
        <OverviewCharts />
        <BottomOverview />
        <KPIFooter />
      </div>
    </AppShell>
  );
}
