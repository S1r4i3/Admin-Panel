import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/app-shell";
import { ApiKeysSection } from "@/components/dashboard/dashboard-widgets";
export const Route = createFileRoute("/api-keys")({ component: ApiKeysPage, head: () => ({ meta: [{ title: "API Keys — SmartLogix AI" }, { name: "description", content: "Generate, revoke, and manage API keys in SmartLogix AI." }] }) });
function ApiKeysPage() {
    return <AppShell title="API Keys" subtitle="Generate, revoke, and manage environment-scoped access."><ApiKeysSection /></AppShell>;
}
