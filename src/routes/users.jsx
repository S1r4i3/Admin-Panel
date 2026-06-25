import { AppShell } from "@/components/dashboard/app-shell";
import { UserManagementSection } from "@/components/dashboard/dashboard-widgets";

export default function UsersPage() {
  return (
    <AppShell title="User Management" subtitle="Manage users, roles, and permissions.">
      <UserManagementSection />
    </AppShell>
  );
}
