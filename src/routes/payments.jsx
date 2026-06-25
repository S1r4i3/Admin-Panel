import { AppShell } from "@/components/dashboard/app-shell";
import { PaymentsSection } from "@/components/dashboard/dashboard-widgets";

export default function PaymentsPage() {
  return (
    <AppShell title="Payment Management" subtitle="Monitor payments, transactions, refunds, and gateway performance.">
      <PaymentsSection />
    </AppShell>
  );
}
