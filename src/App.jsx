import { Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "@/routes/index";
import AccountsPage from "@/routes/accounts";
import UsersPage from "@/routes/users";
import CMSPage from "@/routes/cms";
import AiJobsPage from "@/routes/ai-jobs";
import AnalyticsPage from "@/routes/analytics";
import ApiKeysPage from "@/routes/api-keys";
import CreditsPage from "@/routes/credits";
import NotificationsPage from "@/routes/notifications";
import PaymentsPage from "@/routes/payments";
import SecurityPage from "@/routes/security";
import SettingsPage from "@/routes/settings";
import SubscriptionsPage from "@/routes/subscriptions";
import SupportPage from "@/routes/support";
import WebsitePage from "@/routes/website";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/accounts" element={<AccountsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/cms" element={<CMSPage />} />
      <Route path="/ai-jobs" element={<AiJobsPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/api-keys" element={<ApiKeysPage />} />
      <Route path="/credits" element={<CreditsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/subscriptions" element={<SubscriptionsPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/website" element={<WebsitePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
