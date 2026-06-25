import { AppShell } from "@/components/dashboard/app-shell";
import { SubscriptionSection } from "@/components/dashboard/dashboard-widgets";

export default function SubscriptionsPage() {
  return (
    <AppShell title="Subscription Management" subtitle="Manage plans, subscribers, and revenue insights.">
      <SubscriptionSection />
    </AppShell>
  );
}
