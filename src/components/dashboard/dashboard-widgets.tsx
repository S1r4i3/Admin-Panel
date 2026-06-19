import { zodResolver } from "@hookform/resolvers/zod";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Shield,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { z } from "zod";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  activityItem,
  accountSummary,
  aiJobs,
  apiKeys,
  cmsSummary,
  contentRows,
  creditPurchases,
  formatCompactNumber,
  healthChecks,
  kpiStrip,
  metricCards,
  notifications,
  paymentMethodBreakdown,
  planCards,
  recentActivities,
  realtimeFeed,
  securityLogs,
  settingsTabs,
  subscriptionBreakdown,
  subscriptions,
  topUsers,
  transactions,
  trendData,
  users,
  type ActivityItem,
  type ApiKeyRow,
  type ContentRow,
  type CreditPurchase,
  type JobRow,
  type NotificationRow,
  type SecurityLog,
  type SubscriptionRow,
  type TransactionRow,
  type UserRow,
} from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

function toneClasses(tone: "primary" | "secondary" | "success" | "warning" | "danger") {
  switch (tone) {
    case "primary":
      return "bg-primary/12 text-primary border-primary/25";
    case "secondary":
      return "bg-secondary/12 text-secondary border-secondary/25";
    case "success":
      return "bg-success/12 text-success border-success/25";
    case "warning":
      return "bg-warning/12 text-warning border-warning/25";
    case "danger":
      return "bg-destructive/12 text-destructive border-destructive/25";
  }
}

function statusBadge(status: string) {
  if (["Active", "Completed", "Published", "Paid", "Operational"].includes(status)) {
    return "bg-success/12 text-success border-success/20";
  }
  if (["Processing", "Trial", "Pending", "Invited"].includes(status)) {
    return "bg-primary/12 text-primary border-primary/20";
  }
  if (["Past Due"].includes(status)) {
    return "bg-warning/12 text-warning border-warning/20";
  }
  return "bg-destructive/12 text-destructive border-destructive/20";
}

function initials(value: string) {
  return value
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function MetricCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metricCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.25 }}
          >
            <Card className="glass-panel mesh-border rounded-[28px] border-border/60 bg-card/70">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className="mt-3 text-4xl font-semibold text-foreground">{card.value}</p>
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-1", card.trend === "up" ? "bg-success/12 text-success border-success/20" : "bg-destructive/12 text-destructive border-destructive/20")}>
                        {card.trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                        {card.delta}
                      </span>
                      <span className="text-muted-foreground">{card.subtitle}</span>
                    </div>
                  </div>
                  <div className={cn("flex h-14 w-14 items-center justify-center rounded-3xl border shadow-[var(--shadow-glow)]", toneClasses(card.tone))}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

export function OverviewCharts() {
  const chartConfig = {
    revenue: { label: "Revenue", color: "var(--color-chart-1)" },
    users: { label: "Users", color: "var(--color-chart-2)" },
    subscriptions: { label: "Subscriptions", color: "var(--color-chart-3)" },
    aiUsage: { label: "AI Usage", color: "var(--color-chart-4)" },
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr_0.9fr]">
      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70 xl:col-span-1">
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>$245,680 <span className="ml-2 text-success">+18.7%</span> vs last month</CardDescription>
          </div>
          <Select defaultValue="month">
            <SelectTrigger className="w-[130px] rounded-2xl border-border/60 bg-background/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="pt-2">
          <ChartContainer config={chartConfig} className="h-[320px] w-full">
            <LineChart data={trendData}>
              <CartesianGrid vertical={false} strokeDasharray="4 4" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={44} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={3} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle>Subscription Analytics</CardTitle>
            <CardDescription>Distribution by plan</CardDescription>
          </div>
          <Badge className="rounded-full bg-primary/12 text-primary">This Week</Badge>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer
            config={{
              Basic: { label: "Basic", color: "var(--color-chart-2)" },
              Pro: { label: "Pro", color: "var(--color-chart-1)" },
              Enterprise: { label: "Enterprise", color: "var(--color-chart-3)" },
              Custom: { label: "Custom", color: "var(--color-chart-4)" },
            }}
            className="h-[320px]"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={subscriptionBreakdown} dataKey="value" nameKey="name" innerRadius={68} outerRadius={108} strokeWidth={0}>
                {subscriptionBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Legend content={<ChartLegendContent className="gap-4" />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle>Real-time Activity</CardTitle>
            <CardDescription>Live operational updates</CardDescription>
          </div>
          <Badge className="rounded-full bg-success/12 text-success">Live</Badge>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {realtimeFeed.map((item) => (
            <div key={item.title + item.time} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/20 p-3">
              <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border", toneClasses(item.tone))}>
                {item.tone === "danger" ? <AlertTriangle className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
          <Button variant="ghost" className="w-full justify-between rounded-2xl border border-border/60 bg-background/15">
            View All Activity <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function BottomOverview() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_1.1fr_0.9fr]">
      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Operational highlights across the workspace</CardDescription>
          </div>
          <Button variant="ghost" className="rounded-2xl border border-border/60 bg-background/10">View all</Button>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {recentActivities.map((item) => (
            <div key={item.title + item.time} className="flex items-start gap-3 border-b border-border/50 pb-3 last:border-b-0 last:pb-0">
              <div className={cn("mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border", toneClasses(item.tone))}>
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>High-frequency workflows for operators</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: UserPlus, label: "Add New User", detail: "Create a new account" },
            { icon: Sparkles, label: "Create Subscription", detail: "Setup a new plan" },
            { icon: RefreshCw, label: "Run AI Job", detail: "Process documents or data" },
            { icon: Shield, label: "System Settings", detail: "Configure platform settings" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <motion.button
                whileHover={{ y: -3 }}
                key={action.label}
                className="glass-panel rounded-3xl border-border/60 p-4 text-left"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl brand-gradient text-primary-foreground shadow-[var(--shadow-glow)]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 font-medium text-foreground">{action.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{action.detail}</p>
              </motion.button>
            );
          })}
        </CardContent>
      </Card>

      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader>
          <CardTitle>Platform Health</CardTitle>
          <CardDescription>Live services and infrastructure status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {healthChecks.slice(0, 5).map((check) => (
            <div key={check.label} className="flex items-center justify-between gap-3 border-b border-border/50 pb-3 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-success" />
                <span className="text-sm text-foreground">{check.label}</span>
              </div>
              <Badge className="rounded-full bg-success/12 text-success">{check.status}</Badge>
            </div>
          ))}
          <div className="brand-gradient rounded-3xl p-[1px] shadow-[var(--shadow-glow)]">
            <div className="glass-panel rounded-[calc(var(--radius)+4px)] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/12 text-success">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-foreground">All Systems Operational</p>
                  <p className="text-sm text-muted-foreground">100% uptime</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function KPIFooter() {
  return (
    <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
      <CardContent className="grid gap-4 p-0 sm:grid-cols-2 xl:grid-cols-5">
        {kpiStrip.map((item, index) => (
          <div key={item.label} className={cn("p-5", index < kpiStrip.length - 1 && "border-b border-border/50 xl:border-b-0 xl:border-r")}>
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-3 text-4xl font-semibold text-foreground">{item.value}</p>
            <p className="mt-3 text-sm text-success">{item.delta} <span className="text-muted-foreground">vs last week</span></p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function DataTable<TData>({
  data,
  columns,
}: {
  data: TData[];
  columns: ColumnDef<TData>[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-[24px] border border-border/60 bg-background/10">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-border/60 hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="h-12 px-4 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="border-border/50 hover:bg-accent/40">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="px-4 py-4 align-middle">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TableToolbar({
  placeholder,
  action,
}: {
  placeholder: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        <div className="glass-panel flex flex-1 items-center gap-3 rounded-2xl px-4 py-3">
          <Input placeholder={placeholder} className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full rounded-2xl border-border/60 bg-background/10 md:w-[160px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {action}
    </div>
  );
}

export function UserManagementSection() {
  const columns = useMemo<ColumnDef<UserRow>[]>(() => [
    {
      id: "select",
      header: () => <Checkbox aria-label="Select all" />,
      cell: () => <Checkbox aria-label="Select row" />,
    },
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-border/60">
            <AvatarFallback className="brand-gradient text-primary-foreground">{initials(row.original.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{row.original.name}</p>
            <p className="text-sm text-muted-foreground">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    { accessorKey: "role", header: "Role", cell: ({ row }) => <Badge className="rounded-full bg-primary/12 text-primary">{row.original.role}</Badge> },
    { accessorKey: "plan", header: "Plan" },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge className={cn("rounded-full border", statusBadge(row.original.status))}>{row.original.status}</Badge> },
    { accessorKey: "lastActive", header: "Last Active" },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-xl border border-border/60 bg-background/10"><MoreHorizontal className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-panel rounded-2xl border-border/60 bg-popover/90">
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuItem>Change role</DropdownMenuItem>
            <DropdownMenuItem>Suspend</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], []);

  return (
    <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
      <CardHeader>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage users, roles, and permissions across your platform.</CardDescription>
          </div>
          <Button className="rounded-2xl"><Plus className="h-4 w-4" /> Add User</Button>
        </div>
      </CardHeader>
      <CardContent>
        <TableToolbar
          placeholder="Search users by name, email or role..."
          action={<Button variant="outline" className="rounded-2xl border-border/60 bg-background/10">Filters</Button>}
        />
        <DataTable data={users} columns={columns} />
      </CardContent>
    </Card>
  );
}

export function AIJobsSection() {
  const columns = useMemo<ColumnDef<JobRow>[]>(() => [
    { accessorKey: "id", header: "Job ID" },
    {
      accessorKey: "jobName",
      header: "Job Name",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground">{row.original.jobName}</p>
          <p className="text-sm text-muted-foreground">{row.original.asset}</p>
        </div>
      ),
    },
    { accessorKey: "model", header: "Model" },
    { accessorKey: "user", header: "User" },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge className={cn("rounded-full border", statusBadge(row.original.status))}>{row.original.status}</Badge> },
    { accessorKey: "duration", header: "Duration" },
    { accessorKey: "credits", header: "Credits Used", cell: ({ row }) => formatCompactNumber(row.original.credits) },
    { accessorKey: "createdAt", header: "Created At" },
  ], []);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Total Jobs", value: "24,875", delta: "+18.5%" },
          { label: "Completed", value: "21,562", delta: "+14.3%" },
          { label: "Processing", value: "2,456", delta: "+7.3%" },
          { label: "Failed", value: "857", delta: "-2.1%" },
          { label: "Credits Consumed", value: "1.25M", delta: "+22.7%" },
        ].map((item) => (
          <Card key={item.label} className="glass-panel rounded-[28px] border-border/60 bg-card/70">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-3 text-4xl font-semibold text-foreground">{item.value}</p>
              <p className="mt-3 text-sm text-success">{item.delta} <span className="text-muted-foreground">vs last 7 days</span></p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.95fr]">
        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Jobs Over Time</CardTitle>
              <CardDescription>Execution volume over the last week</CardDescription>
            </div>
            <Select defaultValue="7d">
              <SelectTrigger className="w-[140px] rounded-2xl border-border/60 bg-background/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ aiUsage: { label: "Jobs", color: "var(--color-chart-1)" } }} className="h-[300px]">
              <LineChart data={trendData}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="aiUsage" stroke="var(--color-aiUsage)" strokeWidth={3} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Jobs by Status</CardTitle>
              <CardDescription>This week</CardDescription>
            </div>
            <Badge className="rounded-full bg-primary/12 text-primary">This Week</Badge>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ Completed: { label: "Completed", color: "var(--color-chart-1)" }, Processing: { label: "Processing", color: "var(--color-chart-3)" }, Failed: { label: "Failed", color: "var(--color-chart-5)" } }} className="h-[300px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={[
                    { name: "Completed", value: 21562, fill: "var(--color-chart-1)" },
                    { name: "Processing", value: 2456, fill: "var(--color-chart-3)" },
                    { name: "Failed", value: 857, fill: "var(--color-chart-5)" },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                >
                  <Cell fill="var(--color-chart-1)" />
                  <Cell fill="var(--color-chart-3)" />
                  <Cell fill="var(--color-chart-5)" />
                </Pie>
                <Legend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader>
          <CardTitle>Jobs Table</CardTitle>
          <CardDescription>Search, filter, and monitor AI executions across the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <TableToolbar
            placeholder="Search jobs by name, ID or user..."
            action={<Button variant="outline" className="rounded-2xl border-border/60 bg-background/10">Filters</Button>}
          />
          <DataTable data={aiJobs} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}

export function AnalyticsSection() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "MRR", value: "$84,240", delta: "+16.7%" },
          { label: "ARR", value: "$1,010,880", delta: "+17.3%" },
          { label: "LTV", value: "$2,890", delta: "+14.2%" },
          { label: "ARPU", value: "$24.01", delta: "+8.1%" },
        ].map((item) => (
          <Card key={item.label} className="glass-panel rounded-[28px] border-border/60 bg-card/70">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-3 text-4xl font-semibold text-foreground">{item.value}</p>
              <p className="mt-3 text-sm text-success">{item.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>Multi-series financial performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ revenue: { label: "Revenue", color: "var(--color-chart-1)" }, refunds: { label: "Refunds", color: "var(--color-chart-5)" } }} className="h-[320px]">
              <BarChart data={trendData}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="refunds" fill="var(--color-refunds)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Subscription & User Analytics</CardTitle>
            <CardDescription>Growth across active users and paid plans</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ users: { label: "Users", color: "var(--color-chart-2)" }, subscriptions: { label: "Subscriptions", color: "var(--color-chart-3)" } }} className="h-[320px]">
              <LineChart data={trendData}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="subscriptions" stroke="var(--color-subscriptions)" strokeWidth={3} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>AI Usage Analytics</CardTitle>
            <CardDescription>Credits and processing demand trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ aiUsage: { label: "AI Usage", color: "var(--color-chart-4)" }, upgrades: { label: "Upgrades", color: "var(--color-chart-1)" }, downgrades: { label: "Downgrades", color: "var(--color-chart-5)" } }} className="h-[320px]">
              <BarChart data={trendData}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Bar dataKey="aiUsage" fill="var(--color-aiUsage)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="upgrades" fill="var(--color-upgrades)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="downgrades" fill="var(--color-downgrades)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>KPI Snapshot</CardTitle>
            <CardDescription>Key conversion and retention metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {[
              ["Revenue Growth", "+18.7%"],
              ["User Growth", "+12.5%"],
              ["Subscription Growth", "+15.3%"],
              ["AI Usage Growth", "+22.7%"],
            ].map(([label, value]) => (
              <div key={label} className="glass-panel rounded-2xl px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="font-medium text-success">{value}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function CMSSection() {
  const columns = useMemo<ColumnDef<ContentRow>[]>(() => [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground">{row.original.title}</p>
          <p className="text-sm text-muted-foreground">{row.original.slug}</p>
        </div>
      ),
    },
    { accessorKey: "type", header: "Type", cell: ({ row }) => <Badge className="rounded-full bg-primary/12 text-primary">{row.original.type}</Badge> },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge className={cn("rounded-full border", statusBadge(row.original.status))}>{row.original.status}</Badge> },
    { accessorKey: "updatedAt", header: "Last Updated" },
    { id: "actions", header: "Actions", cell: () => <Button variant="ghost" size="icon" className="rounded-xl border border-border/60 bg-background/10"><MoreHorizontal className="h-4 w-4" /></Button> },
  ], []);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cmsSummary.map((item) => (
          <Card key={item.label} className="glass-panel rounded-[28px] border-border/60 bg-card/70">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-4 text-5xl font-semibold text-foreground">{item.value}</p>
              <p className="mt-3 text-sm text-success">{item.delta} vs last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>All Content</CardTitle>
              <CardDescription>258 items found</CardDescription>
            </div>
            <Button className="rounded-2xl"><Plus className="h-4 w-4" /> Create Content</Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap gap-3">
              <Tabs defaultValue="all">
                <TabsList className="rounded-2xl bg-background/15 p-1">
                  <TabsTrigger value="all" className="rounded-xl">All Content</TabsTrigger>
                  <TabsTrigger value="pages" className="rounded-xl">Pages</TabsTrigger>
                  <TabsTrigger value="blogs" className="rounded-xl">Blogs</TabsTrigger>
                  <TabsTrigger value="faqs" className="rounded-xl">FAQs</TabsTrigger>
                  <TabsTrigger value="banners" className="rounded-xl">Banners</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <DataTable data={contentRows} columns={columns} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
            <CardHeader>
              <CardTitle>Content Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ Pages: { label: "Pages", color: "var(--color-chart-2)" }, Blogs: { label: "Blogs", color: "var(--color-chart-1)" }, FAQs: { label: "FAQs", color: "var(--color-chart-3)" }, Banners: { label: "Banners", color: "var(--color-chart-4)" } }} className="h-[240px]">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={[
                      { name: "Pages", value: 42, fill: "var(--color-chart-2)" },
                      { name: "Blogs", value: 128, fill: "var(--color-chart-1)" },
                      { name: "FAQs", value: 64, fill: "var(--color-chart-3)" },
                      { name: "Banners", value: 24, fill: "var(--color-chart-4)" },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={56}
                    outerRadius={88}
                  >
                    <Cell fill="var(--color-chart-2)" />
                    <Cell fill="var(--color-chart-1)" />
                    <Cell fill="var(--color-chart-3)" />
                    <Cell fill="var(--color-chart-4)" />
                  </Pie>
                  <Legend content={<ChartLegendContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {[
                "Create New Page",
                "Create New Blog",
                "Create New FAQ",
                "Upload Banner",
              ].map((item) => (
                <Button key={item} variant="outline" className="w-full justify-start rounded-2xl border-border/60 bg-background/10">{item}</Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function PaymentsSection() {
  const columns = useMemo<ColumnDef<TransactionRow>[]>(() => [
    { accessorKey: "id", header: "Transaction ID" },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground">{row.original.customer}</p>
          <p className="text-sm text-muted-foreground">{row.original.email}</p>
        </div>
      ),
    },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "method", header: "Method" },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge className={cn("rounded-full border", statusBadge(row.original.status))}>{row.original.status}</Badge> },
    { accessorKey: "date", header: "Date" },
  ], []);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Total Revenue", value: "$86,250", delta: "+18.7%" },
          { label: "Successful Payments", value: "1,256", delta: "+15.2%" },
          { label: "Refunds", value: "32", delta: "-11.3%" },
          { label: "Disputes", value: "7", delta: "-22.2%" },
          { label: "Net Revenue", value: "$82,950", delta: "+19.8%" },
        ].map((item) => (
          <Card key={item.label} className="glass-panel rounded-[28px] border-border/60 bg-card/70">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-3 text-4xl font-semibold text-foreground">{item.value}</p>
              <p className="mt-3 text-sm text-success">{item.delta} vs last week</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr_0.8fr]">
        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>$86,250 total revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ revenue: { label: "Revenue", color: "var(--color-chart-1)" } }} className="h-[320px]">
              <LineChart data={trendData}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={3} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>This week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ Stripe: { label: "Stripe", color: "var(--color-chart-1)" }, PayPal: { label: "PayPal", color: "var(--color-chart-2)" }, Razorpay: { label: "Razorpay", color: "var(--color-chart-3)" }, Other: { label: "Other", color: "var(--color-chart-4)" } }} className="h-[320px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={paymentMethodBreakdown} dataKey="value" nameKey="name" innerRadius={68} outerRadius={104}>
                  {paymentMethodBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
            <CardHeader>
              <CardTitle>Gateway Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {[
                ["Stripe", "99.9%"],
                ["PayPal", "99.5%"],
                ["Razorpay", "99.7%"],
              ].map(([name, uptime]) => (
                <div key={name} className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/10 px-4 py-3">
                  <span className="text-sm text-foreground">{name}</span>
                  <div className="flex items-center gap-3">
                    <Badge className="rounded-full bg-success/12 text-success">Active</Badge>
                    <span className="text-sm text-muted-foreground">{uptime}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full rounded-2xl border-border/60 bg-background/10">Manage Gateways</Button>
            </CardContent>
          </Card>

          <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {[
                "Refund Payment",
                "View Disputes",
                "Download Invoices",
                "Gateway Settings",
              ].map((item) => (
                <Button key={item} variant="outline" className="w-full justify-start rounded-2xl border-border/60 bg-background/10">{item}</Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Monitor transactions, refunds, and payment performance.</CardDescription>
        </CardHeader>
        <CardContent>
          <TableToolbar
            placeholder="Search transactions..."
            action={<Button variant="outline" className="rounded-2xl border-border/60 bg-background/10">Filters</Button>}
          />
          <DataTable data={transactions} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}

export function SubscriptionSection() {
  const columns = useMemo<ColumnDef<SubscriptionRow>[]>(() => [
    {
      accessorKey: "subscriber",
      header: "Subscriber",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground">{row.original.subscriber}</p>
          <p className="text-sm text-muted-foreground">{row.original.email}</p>
        </div>
      ),
    },
    { accessorKey: "plan", header: "Plan", cell: ({ row }) => <Badge className="rounded-full bg-primary/12 text-primary">{row.original.plan}</Badge> },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge className={cn("rounded-full border", statusBadge(row.original.status))}>{row.original.status}</Badge> },
    { accessorKey: "renewalDate", header: "Renewal Date" },
    { accessorKey: "amount", header: "Amount" },
  ], []);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[1.45fr_0.85fr]">
        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>Manage plans, subscribers, and revenue insights</CardDescription>
            </div>
            <Button className="rounded-2xl"><Plus className="h-4 w-4" /> Create New Plan</Button>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-3">
            {planCards.map((plan) => (
              <div key={plan.name} className={cn("glass-panel relative rounded-[28px] p-5", plan.featured && "shadow-[var(--shadow-glow)]") }>
                {plan.featured ? <Badge className="absolute right-4 top-4 rounded-full">Most Popular</Badge> : null}
                <p className="text-xl font-semibold text-foreground">{plan.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-5 flex items-end gap-1">
                  <span className="text-4xl font-semibold text-foreground">{plan.price}</span>
                  <span className="pb-1 text-sm text-muted-foreground">/month</span>
                </div>
                <Separator className="my-5 bg-border/60" />
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{plan.subscribers} active subscribers</span>
                  <Button variant="outline" className="rounded-2xl border-border/60 bg-background/10">View Plan</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Subscription Analytics</CardTitle>
            <CardDescription>Revenue and plan distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <ChartContainer config={{ subscriptions: { label: "Growth", color: "var(--color-chart-1)" } }} className="h-[180px]">
              <LineChart data={trendData}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="subscriptions" stroke="var(--color-subscriptions)" strokeWidth={3} dot={false} />
              </LineChart>
            </ChartContainer>
            <ChartContainer config={{ Basic: { label: "Basic", color: "var(--color-chart-2)" }, Pro: { label: "Pro", color: "var(--color-chart-1)" }, Enterprise: { label: "Enterprise", color: "var(--color-chart-3)" } }} className="h-[220px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={subscriptionBreakdown.slice(0, 3)} dataKey="value" nameKey="name" innerRadius={56} outerRadius={86}>
                  {subscriptionBreakdown.slice(0, 3).map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["MRR", "$84,240"],
                ["ARR", "$1,010,880"],
                ["LTV", "$2,890"],
                ["ARPU", "$24.01"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-border/60 bg-background/10 p-4">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader>
          <CardTitle>Active Subscribers</CardTitle>
          <CardDescription>Track renewals, upgrades, and downgrades.</CardDescription>
        </CardHeader>
        <CardContent>
          <TableToolbar
            placeholder="Search subscribers..."
            action={<Button variant="outline" className="rounded-2xl border-border/60 bg-background/10">Export</Button>}
          />
          <DataTable data={subscriptions} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}

export function NotificationSection() {
  const [selected, setSelected] = useState(notifications[0]);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.35fr_0.8fr]">
      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader className="space-y-4">
          <div>
            <CardTitle>Notification Center</CardTitle>
            <CardDescription>Stay updated with real-time alerts and important updates.</CardDescription>
          </div>
          <Tabs defaultValue="all">
            <TabsList className="rounded-2xl bg-background/15 p-1">
              <TabsTrigger value="all" className="rounded-xl">All Notifications</TabsTrigger>
              <TabsTrigger value="push" className="rounded-xl">Push Notifications</TabsTrigger>
              <TabsTrigger value="email" className="rounded-xl">Email Notifications</TabsTrigger>
              <TabsTrigger value="alerts" className="rounded-xl">Alerts</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <Select defaultValue="all-types">
                <SelectTrigger className="w-[150px] rounded-2xl border-border/60 bg-background/10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="rounded-2xl border-border/60 bg-background/10">Mark all as read</Button>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-2xl border-border/60 bg-background/10">Filter</Button>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[150px] rounded-2xl border-border/60 bg-background/10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Sort by: Newest</SelectItem>
                  <SelectItem value="oldest">Sort by: Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {notifications.map((item) => (
              <button
                key={item.title + item.time}
                onClick={() => setSelected(item)}
                className={cn(
                  "flex w-full items-start gap-4 rounded-[24px] border p-4 text-left transition-all",
                  selected.title === item.title
                    ? "border-primary/40 bg-primary/8 shadow-[var(--shadow-glow)]"
                    : "border-border/60 bg-background/10 hover:bg-accent/40",
                )}
              >
                <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border", toneClasses(item.tone))}>
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </div>
                <Badge className={cn("rounded-full border", toneClasses(item.tone))}>{item.badge}</Badge>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>{selected.title}</CardTitle>
                <CardDescription>{selected.time}</CardDescription>
              </div>
              <Badge className={cn("rounded-full border", toneClasses(selected.tone))}>{selected.badge}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-0">
            <div className="rounded-3xl border border-border/60 bg-background/10 p-4">
              <p className="text-foreground">{selected.detail}</p>
            </div>
            <div className="space-y-3 rounded-3xl border border-border/60 bg-background/10 p-4">
              <p className="text-sm font-medium text-foreground">Details</p>
              <div className="grid gap-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between"><span>User Email</span><span>{accountSummary.email}</span></div>
                <div className="flex items-center justify-between"><span>Registration Date</span><span>May 19, 2025, 10:30 AM</span></div>
                <div className="flex items-center justify-between"><span>IP Address</span><span>192.168.1.1</span></div>
                <div className="flex items-center justify-between"><span>User Plan</span><Badge className="rounded-full bg-primary/12 text-primary">Basic Plan</Badge></div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button className="rounded-2xl">View User</Button>
              <Button variant="outline" className="rounded-2xl border-border/60 bg-background/10">Send Welcome Email</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Notification Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 pt-0">
            {[
              ["Total", "128", "+12.5%"],
              ["Unread", "8", "+33.3%"],
              ["Push", "75", "+8.3%"],
              ["Email", "53", "+16.2%"],
            ].map(([label, value, delta]) => (
              <div key={label} className="rounded-2xl border border-border/60 bg-background/10 p-4">
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-3 text-4xl font-semibold text-foreground">{value}</p>
                <p className="mt-2 text-sm text-success">{delta}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const apiKeySchema = z.object({
  name: z.string().min(3, "Name is required"),
  environment: z.string().min(1, "Environment is required"),
});

export function ApiKeysSection() {
  const form = useForm<z.infer<typeof apiKeySchema>>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: { name: "", environment: "Production" },
  });

  const onSubmit = form.handleSubmit(() => {
    form.reset({ name: "", environment: "Production" });
  });

  const columns = useMemo<ColumnDef<ApiKeyRow>[]>(() => [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "key", header: "API Key" },
    { accessorKey: "environment", header: "Environment", cell: ({ row }) => <Badge className="rounded-full bg-primary/12 text-primary">{row.original.environment}</Badge> },
    { accessorKey: "requests", header: "Requests" },
    { accessorKey: "createdAt", header: "Created" },
    { accessorKey: "lastUsed", header: "Last Used" },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl border border-border/60 bg-background/10"><Copy className="h-4 w-4" /></Button>
              </TooltipTrigger>
              <TooltipContent>Copy key</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="ghost" size="icon" className="rounded-xl border border-border/60 bg-background/10"><MoreHorizontal className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ], []);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Generate, revoke, and manage environment-scoped access keys.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={apiKeys} columns={columns} />
        </CardContent>
      </Card>
      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader>
          <CardTitle>Generate Key</CardTitle>
          <CardDescription>Create new credentials with environment tags.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Production API" className="rounded-2xl border-border/60 bg-background/10" />
                    </FormControl>
                    <FormDescription>Use descriptive names for easier rotation.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="environment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Environment</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="rounded-2xl border-border/60 bg-background/10">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Production">Production</SelectItem>
                        <SelectItem value="Staging">Staging</SelectItem>
                        <SelectItem value="Development">Development</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full rounded-2xl"><Plus className="h-4 w-4" /> Generate Key</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export function CreditsSection() {
  const columns = useMemo<ColumnDef<CreditPurchase>[]>(() => [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "package", header: "Package" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge className={cn("rounded-full border", statusBadge(row.original.status))}>{row.original.status}</Badge> },
  ], []);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Credit Usage</CardTitle>
            <CardDescription>Track remaining credits and usage trends.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div className="rounded-[28px] border border-border/60 bg-background/10 p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Credits</p>
                  <p className="mt-3 text-5xl font-semibold text-foreground">1.25M</p>
                </div>
                <p className="text-sm text-muted-foreground">2M total credits</p>
              </div>
              <div className="mt-5 h-3 rounded-full bg-muted/60">
                <div className="h-3 w-[62%] rounded-full brand-gradient" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">62% consumed</p>
            </div>
            <ChartContainer config={{ aiUsage: { label: "Usage", color: "var(--color-chart-1)" } }} className="h-[260px]">
              <BarChart data={trendData}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="aiUsage" fill="var(--color-aiUsage)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Purchase History</CardTitle>
            <CardDescription>Recent credit top-ups and invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable data={creditPurchases} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function SecuritySection() {
  const columns = useMemo<ColumnDef<SecurityLog>[]>(() => [
    { accessorKey: "event", header: "Event" },
    { accessorKey: "detail", header: "Detail" },
    { accessorKey: "ip", header: "IP Address" },
    { accessorKey: "date", header: "Date" },
  ], []);

  return (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader>
          <CardTitle>Security Controls</CardTitle>
          <CardDescription>2FA, sessions, IP whitelisting, and governance settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {[
            ["Require Two-Factor Authentication", "Mandatory for admin roles", true],
            ["Session Expiration", "Auto sign-out after 12 hours", true],
            ["IP Whitelisting", "Restrict admin access to trusted ranges", false],
            ["Sensitive Action Approvals", "Prompt additional confirmation for high-risk tasks", true],
          ].map(([label, detail, checked]) => (
            <div key={String(label)} className="flex items-center justify-between gap-4 rounded-3xl border border-border/60 bg-background/10 p-4">
              <div>
                <p className="font-medium text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground">{detail}</p>
              </div>
              <Switch defaultChecked={Boolean(checked)} />
            </div>
          ))}
          <Button className="w-full rounded-2xl">Save Security Settings</Button>
        </CardContent>
      </Card>
      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader>
          <CardTitle>Security Logs</CardTitle>
          <CardDescription>Recent admin and policy events</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={securityLogs} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}

export function SettingsSection() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
        <CardHeader>
          <div>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your platform configuration and operational preferences.</CardDescription>
          </div>
          <Tabs defaultValue="General">
            <TabsList className="rounded-2xl bg-background/15 p-1">
              {settingsTabs.map((tab) => (
                <TabsTrigger key={tab} value={tab} className="rounded-xl">{tab}</TabsTrigger>
              ))}
            </TabsList>
            {settingsTabs.map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-6">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      ["Platform Name", "SmartLogix AI"],
                      ["Company Name", "SmartLogix Technologies Inc."],
                      ["Support Email", "support@smartlogix.ai"],
                      ["Support Phone", "+1 (555) 123-4567"],
                    ].map(([label, value]) => (
                      <div key={String(label)}>
                        <p className="mb-2 text-sm font-medium text-foreground">{label}</p>
                        <Input value={String(value)} readOnly className="rounded-2xl border-border/60 bg-background/10" />
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-sm font-medium text-foreground">Timezone</p>
                      <Select defaultValue="et">
                        <SelectTrigger className="rounded-2xl border-border/60 bg-background/10"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="et">(UTC-05:00) Eastern Time (ET)</SelectItem>
                          <SelectItem value="utc">(UTC+00:00) UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium text-foreground">Language</p>
                      <Select defaultValue="en">
                        <SelectTrigger className="rounded-2xl border-border/60 bg-background/10"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English (US)</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {[
                    ["Enable Maintenance Mode", "Only admins can access during maintenance.", false],
                    ["Enable User Registration", "Allow new users to register on the platform.", true],
                    ["Enable Analytics Tracking", "Collect analytics data to improve user experience.", true],
                    ["Enable Public API", "Allow access to public API endpoints.", false],
                  ].map(([label, detail, checked]) => (
                    <div key={String(label)} className="flex items-center justify-between gap-4 rounded-3xl border border-border/60 bg-background/10 p-4">
                      <div>
                        <p className="font-medium text-foreground">{label}</p>
                        <p className="text-sm text-muted-foreground">{detail}</p>
                      </div>
                      <Switch defaultChecked={Boolean(checked)} />
                    </div>
                  ))}
                  <Button className="rounded-2xl">Save Changes</Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>Current system status and health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {healthChecks.map((check) => (
              <div key={check.label} className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/10 px-4 py-3">
                <span className="text-sm text-foreground">{check.label}</span>
                <Badge className="rounded-full bg-success/12 text-success">{check.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Recent Changes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {[
              ["API key 'sk_live_••••••' created", "2 minutes ago"],
              ["Payment gateway updated", "15 minutes ago"],
              ["Firebase configuration saved", "1 hour ago"],
              ["Email settings updated", "2 hours ago"],
            ].map(([text, time]) => (
              <div key={String(text)} className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/10 px-4 py-3">
                <span className="text-sm text-foreground">{text}</span>
                <span className="text-xs text-muted-foreground">{time}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full rounded-2xl border-border/60 bg-background/10">View All Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function PlaceholderSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="glass-panel rounded-[28px] border-border/60 bg-card/70">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-[24px] border border-border/60 bg-background/10 p-4">
            <Skeleton className="h-5 w-28 rounded-full" />
            <Skeleton className="mt-4 h-10 w-full rounded-2xl" />
            <Skeleton className="mt-3 h-24 w-full rounded-3xl" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
