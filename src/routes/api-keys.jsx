import { AppShell } from "@/components/dashboard/app-shell";
import { ApiKeysSection } from "@/components/dashboard/dashboard-widgets";

export default function ApiKeysPage() {
  return (
    <AppShell title="API Keys" subtitle="Generate, revoke, and manage API keys.">
      <ApiKeysSection />
    </AppShell>
  );
}
