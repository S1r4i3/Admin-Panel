import { AppShell } from "@/components/dashboard/app-shell";
import { SecuritySection } from "@/components/dashboard/dashboard-widgets";

export default function SecurityPage() {
  return (
    <AppShell title="Security" subtitle="Manage security controls, 2FA, sessions, and audit logs.">
      <SecuritySection />
    </AppShell>
  );
}
