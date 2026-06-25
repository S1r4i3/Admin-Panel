import { AppShell } from "@/components/dashboard/app-shell";
import { CreditsSection } from "@/components/dashboard/dashboard-widgets";

export default function CreditsPage() {
  return (
    <AppShell title="Credits Management" subtitle="Track your credit balance and usage.">
      <CreditsSection />
    </AppShell>
  );
}
