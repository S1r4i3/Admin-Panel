import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/app-shell";
import { WebsiteSection } from "@/components/dashboard/dashboard-widgets";
export const Route = createFileRoute("/website")({ component: WebsitePage, head: () => ({ meta: [{ title: "Website — SmartLogix AI" }, { name: "description", content: "Website operations and publishing workspace in SmartLogix AI." }] }) });
function WebsitePage() {
    return <AppShell title="Website" subtitle=""><WebsiteSection /></AppShell>;
}
