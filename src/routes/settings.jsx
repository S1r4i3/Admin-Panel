import { AppShell } from "@/components/dashboard/app-shell";
import { SettingsSection } from "@/components/dashboard/dashboard-widgets";

export default function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Manage your platform settings and configurations.">
      <SettingsSection />
    </AppShell>
  );
}
