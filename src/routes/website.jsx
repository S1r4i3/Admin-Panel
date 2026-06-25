import { AppShell } from "@/components/dashboard/app-shell";
import { WebsiteSection } from "@/components/dashboard/dashboard-widgets";

export default function WebsitePage() {
  return (
    <AppShell title="Website" subtitle="Website operations and publishing workspace.">
      <WebsiteSection />
    </AppShell>
  );
}
