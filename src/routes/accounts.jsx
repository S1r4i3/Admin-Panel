import { AppShell } from "@/components/dashboard/app-shell";
import { UserManagementSection } from "@/components/dashboard/dashboard-widgets";

export default function AccountsPage() {
  return (
    <AppShell title="Accounts" subtitle="Organization">
      <UserManagementSection />
    </AppShell>
  );
}
