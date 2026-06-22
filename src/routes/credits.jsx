import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/app-shell";
import { CreditsSection } from "@/components/dashboard/dashboard-widgets";
export const Route = createFileRoute("/credits")({ component: CreditsPage, head: () => ({ meta: [{ title: "Credits — SmartLogix AI" }, { name: "description", content: "Track credit usage, remaining balance, and purchase history in SmartLogix AI." }] }) });
function CreditsPage() {
    return <AppShell title="Credits Management" subtitle="Track your credit balance and usage."><CreditsSection /></AppShell>;
}
