import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/app-shell";
import { CMSSection } from "@/components/dashboard/dashboard-widgets";
export const Route = createFileRoute("/cms")({ component: CMSPage, head: () => ({ meta: [{ title: "CMS — SmartLogix AI" }, { name: "description", content: "Manage pages, blogs, FAQs, and banners in SmartLogix AI." }] }) });
function CMSPage() {
    return <AppShell title="CMS Management" subtitle="Manage and organize website content efficiently."><CMSSection /></AppShell>;
}
