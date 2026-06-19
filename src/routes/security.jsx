import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/app-shell";
import { SecuritySection } from "@/components/dashboard/dashboard-widgets";
export const Route = createFileRoute("/security")({ component: SecurityPage, head: () => ({ meta: [{ title: "Security — SmartLogix AI" }, { name: "description", content: "Manage security controls, 2FA, sessions, and audit logs in SmartLogix AI." }] }) });
function SecurityPage() {
    return <AppShell title="Security" subtitle="Manage authentication controls, sessions, IP policies, and audit logs."><SecuritySection /></AppShell>;
}
