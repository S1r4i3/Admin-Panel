import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/app-shell";
import { UserManagementSection } from "@/components/dashboard/dashboard-widgets";

export const Route = createFileRoute("/accounts")({
  component: AccountsPage,
});

function AccountsPage() {
  return (
    <AppShell
      title="Accounts"
      subtitle="Organization"
    >
      <UserManagementSection />
    </AppShell>
  );
}