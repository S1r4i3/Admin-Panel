import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/app-shell";
import { SettingsSection } from "@/components/dashboard/dashboard-widgets";
export const Route = createFileRoute("/settings")({ component: SettingsPage, head: () => ({ meta: [{ title: "Settings — SmartLogix AI" }, { name: "description", content: "Configure system, payment, API, Firebase, and email settings in SmartLogix AI." }] }) });
function SettingsPage() {
    return <AppShell title="Settings" subtitle="Manage your platform settings and configurations."><SettingsSection /></AppShell>;
}
