import { AppShell } from "@/components/dashboard/app-shell";
import { NotificationSection } from "@/components/dashboard/dashboard-widgets";

export default function NotificationsPage() {
  return (
    <AppShell title="Notification Center" subtitle="Manage alerts, push notifications, and activity.">
      <NotificationSection />
    </AppShell>
  );
}
