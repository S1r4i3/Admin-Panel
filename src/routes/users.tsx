import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/app-shell";
import { UserManagementSection } from "@/components/dashboard/dashboard-widgets";

export const Route = createFileRoute("/users")({
  head: () => ({ meta: [{ title: "Users — SmartLogix AI" }, { name: "description", content: "Manage users, roles, and permissions in SmartLogix AI." }] }),
  component: UsersPage,
});

function UsersPage() {
  return <AppShell title="User Management" subtitle="Manage users, roles and permissions across your platform."><UserManagementSection /></AppShell>;
}
