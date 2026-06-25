import { AppShell } from "@/components/dashboard/app-shell";
import { SupportSection } from "@/components/dashboard/dashboard-widgets";

export default function SupportPage() {
  return (
    <AppShell title="Support" subtitle="Track support operations, SLAs, and escalation queues.">
      <SupportSection />
    </AppShell>
  );
}
