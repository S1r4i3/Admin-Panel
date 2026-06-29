import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

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
import LoginPage from "@/routes/login";

/** Redirects to /login when the user is not authenticated. */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/accounts" element={<ProtectedRoute><AccountsPage /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
      <Route path="/cms" element={<ProtectedRoute><CMSPage /></ProtectedRoute>} />
      <Route path="/ai-jobs" element={<ProtectedRoute><AiJobsPage /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
      <Route path="/api-keys" element={<ProtectedRoute><ApiKeysPage /></ProtectedRoute>} />
      <Route path="/credits" element={<ProtectedRoute><CreditsPage /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
      <Route path="/payments" element={<ProtectedRoute><PaymentsPage /></ProtectedRoute>} />
      <Route path="/security" element={<ProtectedRoute><SecurityPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/subscriptions" element={<ProtectedRoute><SubscriptionsPage /></ProtectedRoute>} />
      <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
      <Route path="/website" element={<ProtectedRoute><WebsitePage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
