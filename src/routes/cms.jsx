import { AppShell } from "@/components/dashboard/app-shell";
import { CMSSection } from "@/components/dashboard/dashboard-widgets";

export default function CMSPage() {
  return (
    <AppShell title="CMS" subtitle="Manage pages, blogs, FAQs, and banners.">
      <CMSSection />
    </AppShell>
  );
}
