import {
  Activity,
  Bell,
  Bot,
  Briefcase,
  ChartSpline,
  CircleCheckBig,
  CreditCard,
  FileText,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  Lock,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
  Webhook,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ThemeMode = "light" | "dark";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number | string;
  section?: string;
}

export interface MetricCard {
  title: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: LucideIcon;
  tone: "primary" | "secondary" | "success" | "warning";
  subtitle?: string;
}

export interface TrendPoint {
  name: string;
  revenue: number;
  users: number;
  subscriptions: number;
  aiUsage: number;
  refunds?: number;
  upgrades?: number;
  downgrades?: number;
}

export interface DonutStat {
  name: string;
  value: number;
  fill: string;
}

export interface ActivityItem {
  title: string;
  detail: string;
  time: string;
  tone: "primary" | "success" | "warning" | "danger";
}

export interface UserRow {
  name: string;
  email: string;
  role: string;
  plan: string;
  status: "Active" | "Inactive" | "Invited";
  lastActive: string;
}

export interface JobRow {
  id: string;
  jobName: string;
  asset: string;
  model: string;
  user: string;
  status: "Completed" | "Processing" | "Failed";
  duration: string;
  credits: number;
  createdAt: string;
}

export interface TransactionRow {
  id: string;
  customer: string;
  email: string;
  amount: string;
  method: string;
  status: "Completed" | "Refunded" | "Pending";
  date: string;
}

export interface SubscriptionRow {
  subscriber: string;
  email: string;
  plan: string;
  status: "Active" | "Trial" | "Past Due";
  renewalDate: string;
  amount: string;
}

export interface ContentRow {
  title: string;
  slug: string;
  type: string;
  category: string;
  status: "Published" | "Draft";
  updatedAt: string;
}

export interface NotificationRow {
  title: string;
  detail: string;
  time: string;
  badge: string;
  tone: "primary" | "success" | "warning" | "danger";
}

export interface ApiKeyRow {
  name: string;
  key: string;
  environment: "Production" | "Staging" | "Development";
  requests: string;
  createdAt: string;
  lastUsed: string;
}

export interface CreditPurchase {
  date: string;
  package: string;
  amount: string;
  status: "Paid" | "Pending";
}

export interface SecurityLog {
  event: string;
  detail: string;
  ip: string;
  date: string;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard, section: "Core" },
  { label: "Accounts", href: "/accounts", icon: Briefcase, section: "Core" },
  { label: "Users", href: "/users", icon: Users, section: "Core" },
  { label: "AI Jobs", href: "/ai-jobs", icon: Bot, section: "Core" },
  { label: "Analytics", href: "/analytics", icon: ChartSpline, section: "Core" },
  { label: "CMS", href: "/cms", icon: FileText, section: "Operations" },
  { label: "API Keys", href: "/api-keys", icon: KeyRound, section: "Operations" },
  { label: "Credits", href: "/credits", icon: WalletCards, section: "Operations" },
  { label: "Notifications", href: "/notifications", icon: Bell, badge: 8, section: "Operations" },
  { label: "Payments", href: "/payments", icon: CreditCard, section: "Revenue" },
  { label: "Security", href: "/security", icon: Lock, section: "Governance" },
  { label: "Subscriptions", href: "/subscriptions", icon: Sparkles, section: "Revenue" },
  { label: "Website", href: "/website", icon: Webhook, section: "Governance" },
  { label: "Support", href: "/support", icon: LifeBuoy, section: "Governance" },
  { label: "Settings", href: "/settings", icon: Settings, section: "Governance" },
];

export const metricCards: MetricCard[] = [
  {
    title: "Total Users",
    value: "24,875",
    delta: "+12.5%",
    trend: "up",
    icon: Users,
    tone: "primary",
    subtitle: "vs last month",
  },
  {
    title: "Revenue",
    value: "$245,680",
    delta: "+18.7%",
    trend: "up",
    icon: WalletCards,
    tone: "secondary",
    subtitle: "vs last month",
  },
  {
    title: "Active Subscriptions",
    value: "8,564",
    delta: "+8.3%",
    trend: "up",
    icon: Sparkles,
    tone: "success",
    subtitle: "net growth",
  },
  {
    title: "AI Jobs Processed",
    value: "1.45M",
    delta: "+23.1%",
    trend: "up",
    icon: Bot,
    tone: "warning",
    subtitle: "rolling 30 days",
  },
];

export const trendData: TrendPoint[] = [
  { name: "May 13", revenue: 42000, users: 4200, subscriptions: 620, aiUsage: 480, refunds: 14, upgrades: 54, downgrades: 18 },
  { name: "May 14", revenue: 61000, users: 6200, subscriptions: 870, aiUsage: 720, refunds: 18, upgrades: 63, downgrades: 16 },
  { name: "May 15", revenue: 55000, users: 8100, subscriptions: 790, aiUsage: 650, refunds: 12, upgrades: 58, downgrades: 20 },
  { name: "May 16", revenue: 67000, users: 11000, subscriptions: 1020, aiUsage: 980, refunds: 22, upgrades: 75, downgrades: 22 },
  { name: "May 17", revenue: 82000, users: 13200, subscriptions: 960, aiUsage: 1150, refunds: 20, upgrades: 82, downgrades: 19 },
  { name: "May 18", revenue: 69000, users: 16800, subscriptions: 1240, aiUsage: 1280, refunds: 16, upgrades: 90, downgrades: 25 },
  { name: "May 19", revenue: 86250, users: 24875, subscriptions: 1510, aiUsage: 1460, refunds: 26, upgrades: 104, downgrades: 24 },
];

export const subscriptionBreakdown: DonutStat[] = [
  { name: "Basic", value: 812, fill: "var(--color-chart-2)" },
  { name: "Pro", value: 2453, fill: "var(--color-chart-1)" },
  { name: "Enterprise", value: 245, fill: "var(--color-chart-3)" },
  { name: "Custom", value: 92, fill: "var(--color-chart-4)" },
];

export const paymentMethodBreakdown: DonutStat[] = [
  { name: "Stripe", value: 45210, fill: "var(--color-chart-1)" },
  { name: "PayPal", value: 20300, fill: "var(--color-chart-2)" },
  { name: "Razorpay", value: 15120, fill: "var(--color-chart-3)" },
  { name: "Other", value: 5620, fill: "var(--color-chart-4)" },
];

export const recentActivities: ActivityItem[] = [
  { title: "New user registered", detail: "jane.doe@acme.com", time: "2m ago", tone: "primary" },
  { title: "Subscription upgraded", detail: "Acme Corp · Enterprise Plan", time: "15m ago", tone: "success" },
  { title: "AI job completed", detail: "Document Analysis · 128 pages", time: "32m ago", tone: "primary" },
  { title: "Payment received", detail: "$8,500 from Acme Corp", time: "1h ago", tone: "success" },
  { title: "API key generated", detail: "By John Smith", time: "2h ago", tone: "warning" },
];

export const realtimeFeed: ActivityItem[] = [
  { title: "New user registered", detail: "John Doe has joined the platform", time: "2 min ago", tone: "primary" },
  { title: "Payment received", detail: "$29.99 from TechStart Inc.", time: "5 min ago", tone: "success" },
  { title: "AI job completed", detail: "Image generation completed", time: "10 min ago", tone: "primary" },
  { title: "Subscription upgraded", detail: "Acme Corp upgraded to Pro plan", time: "15 min ago", tone: "warning" },
  { title: "Refund processed", detail: "$19.99 refund to Sarah Johnson", time: "20 min ago", tone: "danger" },
];

export const topUsers = [
  { company: "Acme Corporation", email: "acme@company.com", jobs: 2451 },
  { company: "TechStart Inc.", email: "admin@techstart.com", jobs: 1892 },
  { company: "Global Solutions", email: "contact@globalsolutions.com", jobs: 1234 },
  { company: "Innovate Ltd.", email: "hello@innovate.com", jobs: 987 },
  { company: "Digital Agency", email: "team@digitalagency.com", jobs: 765 },
];

export const users: UserRow[] = [
  { name: "John Smith", email: "john.smith@acme.com", role: "Admin", plan: "Enterprise", status: "Active", lastActive: "2 min ago" },
  { name: "Sarah Johnson", email: "sarah.j@acme.com", role: "Manager", plan: "Professional", status: "Active", lastActive: "15 min ago" },
  { name: "Michael Brown", email: "michael.b@acme.com", role: "Editor", plan: "Professional", status: "Active", lastActive: "1 hour ago" },
  { name: "Emily Davis", email: "emily.d@acme.com", role: "Viewer", plan: "Basic", status: "Invited", lastActive: "—" },
  { name: "David Wilson", email: "david.w@acme.com", role: "Editor", plan: "Professional", status: "Inactive", lastActive: "2 days ago" },
  { name: "Jessica Taylor", email: "jessica.t@acme.com", role: "Viewer", plan: "Basic", status: "Active", lastActive: "3 days ago" },
  { name: "Daniel Anderson", email: "daniel.a@acme.com", role: "Manager", plan: "Enterprise", status: "Active", lastActive: "5 min ago" },
  { name: "Olivia Martinez", email: "olivia.m@acme.com", role: "Editor", plan: "Professional", status: "Inactive", lastActive: "1 week ago" },
];

export const aiJobs: JobRow[] = [
  { id: "job_8f3a1d2e", jobName: "Document Analysis", asset: "invoice_2025_0421.pdf", model: "GPT-4o", user: "Sarah Johnson", status: "Completed", duration: "12.4s", credits: 2450, createdAt: "May 19, 2025 10:24 AM" },
  { id: "job_7c2d9e1f", jobName: "Data Extraction", asset: "bank-statement.pdf", model: "Claude 3.5", user: "Michael Brown", status: "Processing", duration: "45.7s", credits: 1850, createdAt: "May 19, 2025 10:22 AM" },
  { id: "job_5b1f3c7a", jobName: "Content Generation", asset: "Marketing Copy", model: "GPT-4o", user: "Emily Davis", status: "Completed", duration: "8.2s", credits: 950, createdAt: "May 19, 2025 10:20 AM" },
  { id: "job_2e4d6f8b", jobName: "Image Analysis", asset: "screenshot_2025.png", model: "Vision Pro", user: "David Wilson", status: "Failed", duration: "—", credits: 0, createdAt: "May 19, 2025 10:18 AM" },
  { id: "job_1a2b3c4d", jobName: "Report Summarization", asset: "Q1_2025_Report.pdf", model: "GPT-4o", user: "Jessica Taylor", status: "Completed", duration: "15.6s", credits: 1250, createdAt: "May 19, 2025 10:15 AM" },
];

export const transactions: TransactionRow[] = [
  { id: "txn_1N8V7Q2", customer: "Acme Corporation", email: "acme@company.com", amount: "$299.99", method: "Stripe", status: "Completed", date: "May 19, 2025 · 10:24 AM" },
  { id: "txn_1N8V7Q3", customer: "TechStart Inc.", email: "admin@techstart.com", amount: "$99.99", method: "PayPal", status: "Completed", date: "May 19, 2025 · 09:15 AM" },
  { id: "txn_1N8V7Q4", customer: "Global Solutions", email: "contact@globalsolutions.com", amount: "$999.99", method: "Razorpay", status: "Completed", date: "May 18, 2025 · 04:32 PM" },
  { id: "txn_1N8V7Q5", customer: "John Smith", email: "john.smith@email.com", amount: "$29.99", method: "Stripe", status: "Refunded", date: "May 18, 2025 · 02:11 PM" },
  { id: "txn_1N8V7Q6", customer: "Sarah Johnson", email: "sarah.j@email.com", amount: "$199.99", method: "PayPal", status: "Completed", date: "May 17, 2025 · 11:08 AM" },
];

export const subscriptions: SubscriptionRow[] = [
  { subscriber: "Acme Corporation", email: "acme@company.com", plan: "Pro", status: "Active", renewalDate: "May 25, 2025", amount: "$29.99" },
  { subscriber: "TechStart Inc.", email: "admin@techstart.com", plan: "Enterprise", status: "Active", renewalDate: "June 1, 2025", amount: "$99.99" },
  { subscriber: "John Smith", email: "john.smith@email.com", plan: "Basic", status: "Active", renewalDate: "May 20, 2025", amount: "$9.99" },
  { subscriber: "Sarah Johnson", email: "sarah.j@email.com", plan: "Pro", status: "Trial", renewalDate: "May 28, 2025", amount: "$29.99" },
  { subscriber: "Global Solutions", email: "contact@globalsolutions.com", plan: "Enterprise", status: "Past Due", renewalDate: "June 5, 2025", amount: "$99.99" },
];

export const contentRows: ContentRow[] = [
  { title: "Home Page", slug: "/", type: "Page", category: "General", status: "Published", updatedAt: "May 19, 2025 · 10:30 AM" },
  { title: "About Us", slug: "/about-us", type: "Page", category: "Company", status: "Published", updatedAt: "May 18, 2025 · 02:15 PM" },
  { title: "How AI is Transforming Business", slug: "/blog/ai-transforming-business", type: "Blog", category: "Technology", status: "Published", updatedAt: "May 19, 2025 · 09:45 AM" },
  { title: "Getting Started with SmartLogix AI", slug: "/blog/getting-started", type: "Blog", category: "Guides", status: "Draft", updatedAt: "May 17, 2025 · 04:20 PM" },
  { title: "What is SmartLogix AI?", slug: "/faq/what-is-smartlogix-ai", type: "FAQ", category: "General", status: "Published", updatedAt: "May 16, 2025 · 11:10 AM" },
  { title: "Summer Sale Banner", slug: "/banners/summer-sale", type: "Banner", category: "Promotions", status: "Published", updatedAt: "May 15, 2025 · 08:30 AM" },
];

export const notifications: NotificationRow[] = [
  { title: "New User Registered", detail: "John Doe has successfully registered on the platform.", time: "2 min ago", badge: "New", tone: "primary" },
  { title: "New Subscription", detail: "Acme Corporation subscribed to Enterprise Plan.", time: "15 min ago", badge: "Billing", tone: "success" },
  { title: "Payment Failed", detail: "Payment failed for subscription #SUB-12345.", time: "1 hour ago", badge: "Action Required", tone: "danger" },
  { title: "AI Job Completed", detail: "AI job #JOB-67890 has been completed successfully.", time: "2 hours ago", badge: "Jobs", tone: "primary" },
  { title: "Email Campaign Sent", detail: "Your email campaign ‘New Features Update’ has been sent.", time: "3 hours ago", badge: "Email", tone: "warning" },
];

export const apiKeys: ApiKeyRow[] = [
  { name: "Production API", key: "sk_live_•••••••••••", environment: "Production", requests: "2.4M", createdAt: "May 05, 2025", lastUsed: "2 min ago" },
  { name: "Staging Webhooks", key: "sk_test_•••••••••••", environment: "Staging", requests: "184K", createdAt: "Apr 22, 2025", lastUsed: "18 min ago" },
  { name: "Internal Tools", key: "sk_dev_•••••••••••", environment: "Development", requests: "42K", createdAt: "Apr 04, 2025", lastUsed: "Yesterday" },
];

export const creditPurchases: CreditPurchase[] = [
  { date: "May 18, 2025", package: "500K Credits", amount: "$499", status: "Paid" },
  { date: "May 10, 2025", package: "250K Credits", amount: "$279", status: "Paid" },
  { date: "May 01, 2025", package: "100K Credits", amount: "$129", status: "Pending" },
];

export const securityLogs: SecurityLog[] = [
  { event: "Admin login", detail: "Successful sign in from Chrome on macOS", ip: "192.168.1.11", date: "May 19, 2025 · 10:30 AM" },
  { event: "2FA changed", detail: "TOTP fallback codes regenerated", ip: "192.168.1.11", date: "May 18, 2025 · 07:10 PM" },
  { event: "API key revoked", detail: "Legacy integration key removed", ip: "172.18.10.9", date: "May 18, 2025 · 04:45 PM" },
  { event: "IP allowlist updated", detail: "Added London office gateway", ip: "10.20.0.18", date: "May 17, 2025 · 11:05 AM" },
];

export const planCards = [
  {
    name: "Basic",
    price: "$9.99",
    description: "Perfect for individuals and small teams getting started.",
    features: ["5 AI Jobs / Month", "Basic Analytics", "Email Support"],
    subscribers: 812,
    tone: "secondary",
  },
  {
    name: "Pro",
    price: "$29.99",
    description: "Ideal for growing teams and businesses.",
    features: ["50 AI Jobs / Month", "Advanced Analytics", "Prioritized Support", "Custom Integrations"],
    subscribers: 2453,
    tone: "primary",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$99.99",
    description: "For large organizations with advanced needs.",
    features: ["Unlimited AI Jobs", "Advanced Analytics", "Dedicated Support", "SLA & Security"],
    subscribers: 245,
    tone: "success",
  },
];

export const settingsTabs = ["General", "Security", "Payment", "Firebase", "API Keys", "Email Settings"];

export const healthChecks = [
  { label: "API Services", status: "Operational" },
  { label: "AI Processing", status: "Operational" },
  { label: "Database", status: "Operational" },
  { label: "File Storage", status: "Operational" },
  { label: "Email Service", status: "Operational" },
  { label: "Payment Gateway", status: "Operational" },
];

export const kpiStrip = [
  { label: "New Users", value: "256", delta: "+12.5%" },
  { label: "New Subscriptions", value: "89", delta: "+8.7%" },
  { label: "Refunds", value: "12", delta: "-2.1%" },
  { label: "Churn Rate", value: "2.35%", delta: "-0.5%" },
  { label: "Avg. Response Time", value: "1.2s", delta: "+5.2%" },
];

export const accountSummary = {
  adminName: "Admin User",
  adminRole: "Super Admin",
  email: "admin@smartlogix.ai",
  company: "SmartLogix AI",
};

export const systemStatusCard = {
  title: "All Systems Operational",
  detail: "100% uptime",
};

export const quickActions = [
  { label: "Create AI Job", description: "Run a new workflow", icon: Sparkles },
  { label: "Add New User", description: "Invite a teammate", icon: Users },
  { label: "Create Plan", description: "Launch billing tier", icon: CircleCheckBig },
  { label: "Send Notification", description: "Broadcast update", icon: Bell },
];

export const cmsSummary = [
  { label: "Pages", value: "42", delta: "+12.5%", tone: "secondary" },
  { label: "Blogs", value: "128", delta: "+18.2%", tone: "primary" },
  { label: "FAQs", value: "64", delta: "+8.7%", tone: "success" },
  { label: "Banners", value: "24", delta: "+5.3%", tone: "warning" },
];

export const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
