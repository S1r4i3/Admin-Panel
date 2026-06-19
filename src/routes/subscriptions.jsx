import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/app-shell";
import { SubscriptionSection } from "@/components/dashboard/dashboard-widgets";
export const Route = createFileRoute("/subscriptions")({ component: SubscriptionsPage, head: () => ({ meta: [{ title: "Subscriptions — SmartLogix AI" }, { name: "description", content: "Manage plans, subscribers, and subscription analytics in SmartLogix AI." }] }) });
function SubscriptionsPage() {
    return <AppShell title="Subscription Management" subtitle="Manage plans, subscribers, and revenue insights."><SubscriptionSection /></AppShell>;
}
