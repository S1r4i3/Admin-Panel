import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/app-shell";
import { PaymentsSection } from "@/components/dashboard/dashboard-widgets";
export const Route = createFileRoute("/payments")({ component: PaymentsPage, head: () => ({ meta: [{ title: "Payments — SmartLogix AI" }, { name: "description", content: "Monitor payments, transactions, refunds, and gateways in SmartLogix AI." }] }) });
function PaymentsPage() {
    return <AppShell title="Payment Management" subtitle="Monitor payments, transactions, refunds, and gateway performance."><PaymentsSection /></AppShell>;
}
