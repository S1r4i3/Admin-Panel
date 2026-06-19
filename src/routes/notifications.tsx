import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/app-shell";
import { NotificationSection } from "@/components/dashboard/dashboard-widgets";

export const Route = createFileRoute("/notifications")({ component: NotificationsPage, head: () => ({ meta: [{ title: "Notifications — SmartLogix AI" }, { name: "description", content: "Review alerts, push notifications, email notifications, and activity in SmartLogix AI." }] }) });

function NotificationsPage() {
  return <AppShell title="Notification Center" subtitle="Stay updated with real-time alerts and important updates."><NotificationSection /></AppShell>;
}
