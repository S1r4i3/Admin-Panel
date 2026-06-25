import { AppShell } from "@/components/dashboard/app-shell";
import { BottomOverview, KPIFooter, MetricCards, OverviewCharts } from "@/components/dashboard/dashboard-widgets";

export default function DashboardPage() {
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
