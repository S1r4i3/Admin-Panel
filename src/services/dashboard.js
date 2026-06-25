/**
 * Dashboard service — all hooks use placeholderData (static fallback).
 * When the backend is connected, real data replaces the fallback automatically.
 *
 * Expected backend response shapes are documented on each hook.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import * as fallback from "@/lib/dashboard-data";

const get = (path, params) => apiClient.get(path, { params });

// ─── Normalizers ─────────────────────────────────────────────────────────────
// Map backend responses → the shape dashboard-widgets.jsx expects.
// Adjust these if your API returns different field names.

function normalizeAnalytics(data) {
  if (!data) return null;

  // Expected: { trend: [{date, revenue, users, subscriptions, ai_usage, refunds}], ... }
  const trend = (data.trend ?? data.trend_data ?? []).map((item) => ({
    name:          item.date ?? item.name,
    revenue:       item.revenue       ?? 0,
    users:         item.users         ?? item.user_count ?? 0,
    subscriptions: item.subscriptions ?? item.subscription_count ?? 0,
    aiUsage:       item.ai_usage      ?? item.aiUsage ?? 0,
    refunds:       item.refunds       ?? 0,
    upgrades:      item.upgrades      ?? 0,
    downgrades:    item.downgrades    ?? 0,
  }));

  // Expected: { metric_cards: [{title, value, delta, trend, subtitle}] }
  const metricCards = (data.metric_cards ?? data.metricCards ?? []).map((c) => ({
    title:    c.title,
    value:    c.value,
    delta:    c.delta,
    trend:    c.trend ?? "up",
    subtitle: c.subtitle ?? "vs last month",
    tone:     c.tone ?? "primary",
  }));

  // Expected: { subscription_breakdown: [{name, value}] }
  const subBreakdown = (data.subscription_breakdown ?? data.subscriptionBreakdown ?? []).map((s, i) => ({
    name:  s.name ?? s.plan,
    value: s.value ?? s.count ?? 0,
    fill:  s.fill ?? `var(--color-chart-${i + 1})`,
  }));

  // Expected: { payment_methods: [{name, value}] }
  const paymentBreakdown = (data.payment_methods ?? data.paymentMethodBreakdown ?? []).map((p, i) => ({
    name:  p.name ?? p.method,
    value: p.value ?? p.amount ?? 0,
    fill:  p.fill ?? `var(--color-chart-${i + 1})`,
  }));

  // Expected: { recent_activities: [{title, detail, time, tone}] }
  const recentActivities = (data.recent_activities ?? data.recentActivities ?? []).map((a) => ({
    title:  a.title,
    detail: a.detail ?? a.description,
    time:   a.time   ?? a.created_at,
    tone:   a.tone   ?? "primary",
  }));

  // Expected: { realtime_feed: [{title, detail, time, tone}] }
  const realtimeFeed = (data.realtime_feed ?? data.realtimeFeed ?? []).map((a) => ({
    title:  a.title,
    detail: a.detail ?? a.description,
    time:   a.time   ?? a.created_at,
    tone:   a.tone   ?? "primary",
  }));

  // Expected: { kpi: [{label, value, delta}] }
  const kpiStrip = (data.kpi ?? data.kpi_strip ?? data.kpiStrip ?? []).map((k) => ({
    label: k.label,
    value: k.value,
    delta: k.delta,
  }));

  return { trend, metricCards, subBreakdown, paymentBreakdown, recentActivities, realtimeFeed, kpiStrip };
}

// ─── Analytics (drives all dashboard charts) ─────────────────────────────────
export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn:  async () => {
      const data = await get("/api/analytics/");
      return normalizeAnalytics(data);
    },
    placeholderData: {
      trend:            fallback.trendData,
      metricCards:      fallback.metricCards,
      subBreakdown:     fallback.subscriptionBreakdown,
      paymentBreakdown: fallback.paymentMethodBreakdown,
      recentActivities: fallback.recentActivities,
      realtimeFeed:     fallback.realtimeFeed,
      kpiStrip:         fallback.kpiStrip,
    },
    staleTime: 30_000,   // refetch every 30s when window is focused
    retry: 1,
  });
}

// ─── Users ────────────────────────────────────────────────────────────────────
// Expected: { results: [{name, email, role, plan, status, last_active}] } or flat array
export function useUsers(params = {}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn:  () => get("/api/auth/users/", params),
    select:   (data) => (Array.isArray(data) ? data : data?.results ?? data),
    placeholderData: fallback.users,
    staleTime: 60_000,
  });
}

// ─── AI Jobs ─────────────────────────────────────────────────────────────────
// Expected: { results: [{id, job_name, asset, model, user, status, duration, credits, created_at}] }
export function useAIJobs(params = {}) {
  return useQuery({
    queryKey: ["ai-jobs", params],
    queryFn:  () => get("/api/ai-jobs/", params),
    select:   (data) => {
      const list = Array.isArray(data) ? data : data?.results ?? data;
      return list.map((j) => ({
        id:        j.id,
        jobName:   j.job_name   ?? j.jobName   ?? j.name,
        asset:     j.asset,
        model:     j.model,
        user:      j.user       ?? j.user_name,
        status:    j.status,
        duration:  j.duration,
        credits:   j.credits,
        createdAt: j.created_at ?? j.createdAt,
      }));
    },
    placeholderData: fallback.aiJobs,
    staleTime: 30_000,
  });
}

// ─── Subscriptions ───────────────────────────────────────────────────────────
// Expected: { results: [{subscriber, email, plan, status, renewal_date, amount}] }
export function useSubscriptions(params = {}) {
  return useQuery({
    queryKey: ["subscriptions", params],
    queryFn:  () => get("/api/subscriptions/", params),
    select:   (data) => {
      const list = Array.isArray(data) ? data : data?.results ?? data;
      return list.map((s) => ({
        subscriber:  s.subscriber  ?? s.name,
        email:       s.email,
        plan:        s.plan,
        status:      s.status,
        renewalDate: s.renewal_date ?? s.renewalDate,
        amount:      s.amount,
      }));
    },
    placeholderData: fallback.subscriptions,
    staleTime: 60_000,
  });
}

// ─── Plans ───────────────────────────────────────────────────────────────────
export function usePlans(params = {}) {
  return useQuery({
    queryKey: ["plans", params],
    queryFn:  () => get("/api/subscriptions/plans/", params),
    select:   (data) => Array.isArray(data) ? data : data?.results ?? data,
    placeholderData: fallback.planCards,
    staleTime: 300_000,
  });
}

// ─── Transactions ────────────────────────────────────────────────────────────
// Expected: { results: [{id, customer, email, amount, method, status, date}] }
export function useTransactions(params = {}) {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn:  () => get("/api/payments/transactions/", params),
    select:   (data) => {
      const list = Array.isArray(data) ? data : data?.results ?? data;
      return list.map((t) => ({
        id:       t.id,
        customer: t.customer ?? t.customer_name,
        email:    t.email,
        amount:   t.amount,
        method:   t.method   ?? t.payment_method,
        status:   t.status,
        date:     t.date     ?? t.created_at,
      }));
    },
    placeholderData: fallback.transactions,
    staleTime: 30_000,
  });
}

// ─── Notifications ───────────────────────────────────────────────────────────
export function useNotifications(params = {}) {
  return useQuery({
    queryKey: ["notifications", params],
    queryFn:  () => get("/api/notifications/", params),
    select:   (data) => Array.isArray(data) ? data : data?.results ?? data,
    placeholderData: fallback.notifications,
    staleTime: 15_000,
  });
}

// ─── CMS ─────────────────────────────────────────────────────────────────────
export function useCMSContent(params = {}) {
  return useQuery({
    queryKey: ["cms-content", params],
    queryFn: async () => {
      const [pages, blogs, faqs, banners] = await Promise.allSettled([
        get("/api/cms/pages/",   params),
        get("/api/cms/blogs/",   params),
        get("/api/cms/faqs/",    params),
        get("/api/cms/banners/", params),
      ]);
      const safe = (r) => (r.status === "fulfilled"
        ? (Array.isArray(r.value) ? r.value : r.value?.results ?? [])
        : []);
      return [
        ...safe(pages).map((i)  => ({ ...i, type: "Page",   category: i.category ?? "General", updatedAt: i.updated_at ?? i.updatedAt })),
        ...safe(blogs).map((i)  => ({ ...i, type: "Blog",   category: i.category ?? "General", updatedAt: i.updated_at ?? i.updatedAt })),
        ...safe(faqs).map((i)   => ({ title: i.question, slug: i.id, type: "FAQ", category: i.category ?? "General", status: i.status, updatedAt: i.updated_at ?? i.updatedAt })),
        ...safe(banners).map((i)=> ({ ...i, type: "Banner", category: i.placement ?? "General", updatedAt: i.updated_at ?? i.updatedAt })),
      ];
    },
    placeholderData: fallback.contentRows,
    staleTime: 60_000,
  });
}

// ─── API Keys ────────────────────────────────────────────────────────────────
export function useApiKeys(params = {}) {
  return useQuery({
    queryKey: ["api-keys", params],
    queryFn:  () => get("/api/api-keys/", params),
    select:   (data) => Array.isArray(data) ? data : data?.results ?? data,
    placeholderData: fallback.apiKeys,
    staleTime: 60_000,
  });
}

// ─── Credits ─────────────────────────────────────────────────────────────────
export function useCredits(params = {}) {
  return useQuery({
    queryKey: ["credits", params],
    queryFn:  () => get("/api/credits/", params),
    select:   (data) => Array.isArray(data) ? data : data?.results ?? data,
    placeholderData: fallback.creditPurchases,
    staleTime: 60_000,
  });
}

// ─── Generic mutations ────────────────────────────────────────────────────────
export function useCreateResource(path, queryKey) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => apiClient.post(path, payload),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  });
}

// Keep useDashboardData as a thin wrapper so existing widget code still works
export function useDashboardData() {
  return useAnalytics();
}
