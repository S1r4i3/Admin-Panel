import { AppShell } from "@/components/dashboard/app-shell";
import { AnalyticsSection } from "@/components/dashboard/dashboard-widgets";

export default function AnalyticsPage() {
  return (
    <AppShell title="Analytics" subtitle="Track revenue, user growth, subscriptions, and AI usage.">
      <AnalyticsSection />
    </AppShell>
  );
}
