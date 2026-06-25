import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, CalendarRange, ChevronDown, ChevronLeft, Command, Download, Menu, Moon, Search, Sparkles, SunMedium, } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { accountSummary, navItems, systemStatusCard } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/lib/dashboard-store";

function SmartLogixMark({ collapsed }) {
  if (collapsed) {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center">
        <img
          src="https://res.cloudinary.com/dhwydorji/image/upload/v1782133040/logo_khjxng.png"
          alt="SmartLogix AI"
          className="h-9 w-9 object-contain"
        />
      </div>
    );
  }
  return (
    <img
      src="https://res.cloudinary.com/dhwydorji/image/upload/v1782133040/logo_khjxng.png"
      alt="SmartLogix AI"
      className="h-10 w-auto max-w-[180px] shrink-0 object-contain"
    />
  );
}

function SidebarContent({ mobile = false }) {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();
  const sections = Array.from(new Set(navItems.map((item) => item.section)));

  return (
    <div className={cn("glass-panel mesh-border flex h-full flex-col overflow-hidden rounded-[28px]", mobile ? "w-full rounded-none border-0 bg-sidebar/95" : "")}>
      <div className="flex items-center gap-3 border-b border-border/60 px-5 py-5">
        <SmartLogixMark collapsed={sidebarCollapsed && !mobile} />
        {(!sidebarCollapsed || mobile) && (
          <p className="text-sm text-muted-foreground whitespace-nowrap"></p>
        )}
        {!mobile && (
          <Button variant="ghost" size="icon" className="ml-auto shrink-0 rounded-full border border-border/60 bg-card/40" onClick={toggleSidebar}>
            <ChevronLeft className={cn("transition-transform", sidebarCollapsed && "rotate-180")} />
          </Button>
        )}
      </div>

      {(!sidebarCollapsed || mobile) && (
        <div className="px-5 pt-5">
          <div className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Search menu...</span>
            <Badge variant="outline" className="ml-auto rounded-xl border-border/70 bg-background/40 text-[10px] text-muted-foreground">
              ⌘ K
            </Badge>
          </div>
        </div>
      )}

      <div className="mt-4 flex-1 overflow-y-auto px-3 pb-4">
        {sections.map((section) => (
          <div key={section} className="mb-5">
            {(!sidebarCollapsed || mobile) && (
              <p className="px-3 pb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
                {section}
              </p>
            )}
            <div className="space-y-1.5">
              {navItems
                .filter((item) => item.section === section)
                .map((item) => {
                  const active = location.pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <TooltipProvider key={item.href} delayDuration={150}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            to={item.href}
                            className={cn(
                              "group relative flex items-center gap-3 overflow-hidden rounded-2xl border px-3 py-3 transition-all duration-300",
                              sidebarCollapsed && !mobile ? "justify-center px-2.5" : "",
                              active
                                ? "brand-gradient border-primary/40 text-primary-foreground shadow-[var(--shadow-glow)]"
                                : "border-transparent text-sidebar-foreground hover:border-border/60 hover:bg-sidebar-accent/70 hover:shadow-[var(--shadow-soft)]"
                            )}
                          >
                            {active && (
                              <motion.span
                                layoutId="active-nav-pill"
                                className="absolute inset-0 rounded-2xl bg-transparent"
                                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                              />
                            )}
                            <span className={cn(
                              "relative flex h-10 w-10 items-center justify-center rounded-2xl border",
                              active
                                ? "border-white/15 bg-white/10"
                                : "border-border/60 bg-card/30 group-hover:border-primary/40 group-hover:bg-primary/10"
                            )}>
                              <Icon className="h-5 w-5" />
                            </span>
                            {(!sidebarCollapsed || mobile) && (
                              <>
                                <span className="relative flex-1 text-sm font-medium">{item.label}</span>
                                {item.badge ? (
                                  <Badge className={cn("relative rounded-full px-2 py-0 text-[11px]", active ? "bg-white/15 text-primary-foreground" : "bg-primary/15 text-primary")}>
                                    {item.badge}
                                  </Badge>
                                ) : null}
                              </>
                            )}
                          </Link>
                        </TooltipTrigger>
                        {sidebarCollapsed && !mobile ? <TooltipContent side="right">{item.label}</TooltipContent> : null}
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 border-t border-border/60 p-4">
        <div className="glass-panel rounded-3xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl brand-gradient text-primary-foreground shadow-[var(--shadow-glow)]">
              <Sparkles className="h-5 w-5" />
            </div>
            {(!sidebarCollapsed || mobile) && (
              <div>
                <p className="font-medium text-foreground">Enterprise Plan</p>
                <p className="text-sm text-muted-foreground">Unlimited access</p>
              </div>
            )}
          </div>
          {(!sidebarCollapsed || mobile) && (
            <>
              <div className="mt-4 h-2 rounded-full bg-muted/70">
                <div className="h-2 w-[75%] rounded-full brand-gradient" />
              </div>
              <p className="mt-2 text-xs text-secondary">75% of monthly limit</p>
            </>
          )}
        </div>

        <div className="glass-panel rounded-3xl p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
              <span className="absolute inset-2 rounded-full bg-success/20 blur-lg" />
              <span className="relative h-3.5 w-3.5 rounded-full bg-success" />
            </div>
            {(!sidebarCollapsed || mobile) && (
              <div>
                <p className="font-medium text-foreground">{systemStatusCard.title}</p>
                <p className="text-sm text-muted-foreground">Updated 2 minutes ago</p>
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border border-border/60">
              <AvatarFallback className="brand-gradient text-primary-foreground">AU</AvatarFallback>
            </Avatar>
            {(!sidebarCollapsed || mobile) && (
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{accountSummary.adminName}</p>
                <p className="truncate text-sm text-muted-foreground">{accountSummary.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TopBar({ title, subtitle, actions }) {
  const { theme, toggleTheme } = useDashboardStore();
  const displayName = accountSummary.adminName;
  const displayRole = accountSummary.adminRole;

  return (
    <header className="sticky top-0 z-30 mb-6 glass-panel rounded-[28px] px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        {/* Left: mobile menu + title */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="xl:hidden shrink-0">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-2xl border-border/60 bg-card/50">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[92vw] max-w-[360px] border-border/60 bg-background/90 p-0 backdrop-blur-3xl">
                <SidebarContent mobile />
              </SheetContent>
            </Sheet>
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
            <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        {/* Right: controls */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="glass-panel hidden lg:flex items-center gap-3 rounded-2xl px-4 py-2.5 w-[220px]">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input placeholder="Search..." className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 text-sm" />
            <Badge variant="outline" className="rounded-xl border-border/60 bg-background/30 text-[10px] text-muted-foreground shrink-0">
              <Command className="mr-1 h-3 w-3" />K
            </Badge>
          </div>

          <Button variant="outline" className="hidden xl:flex rounded-2xl border-border/60 bg-card/45 text-sm">
            <CalendarRange className="h-4 w-4" />
            <span className="hidden 2xl:inline">May 13 – May 19, 2025</span>
          </Button>

          <Button variant="outline" size="icon" className="rounded-2xl border-border/60 bg-card/45" onClick={toggleTheme}>
            {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button variant="outline" size="icon" className="relative rounded-2xl border-border/60 bg-card/45">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 rounded-2xl border-border/60 bg-card/45 px-3 gap-2">
                <Avatar className="h-7 w-7 border border-border/60">
                  <AvatarFallback className="brand-gradient text-primary-foreground text-xs">AU</AvatarFallback>
                </Avatar>
                <div className="hidden text-left xl:block">
                  <p className="text-sm font-medium text-foreground leading-none">{displayName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{displayRole}</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-panel w-56 rounded-2xl border-border/60 bg-popover/85 p-2">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Team settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={toggleTheme}>Toggle theme</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="rounded-2xl px-4 shadow-[var(--shadow-glow)] text-sm shrink-0">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export Report</span>
          </Button>
        </div>
      </div>
      {actions ? <div className="mt-4">{actions}</div> : null}
    </header>
  );
}

export function AppShell({ title, subtitle, actions, children }) {
  const { theme, sidebarCollapsed } = useDashboardStore();

  return (
    <div className={cn("min-h-screen bg-background text-foreground", theme === "dark" ? "dark" : "")}>
      <div className="app-shell-bg min-h-screen">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="surface-dots absolute inset-0 opacity-20" />
          <motion.div
            className="absolute left-[12%] top-24 h-40 w-40 rounded-full bg-primary/14 blur-3xl"
            animate={{ y: [0, 24, 0], x: [0, 16, 0] }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-[8%] h-52 w-52 rounded-full bg-secondary/12 blur-3xl"
            animate={{ y: [0, -18, 0], x: [0, -12, 0] }}
            transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-[1600px] gap-6 p-4 lg:p-6">
          <AnimatePresence initial={false}>
            <motion.aside
              layout
              className="hidden xl:block"
              animate={{ width: sidebarCollapsed ? 112 : 320 }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
            >
              <SidebarContent />
            </motion.aside>
          </AnimatePresence>

          <main className="flex min-w-0 flex-1 flex-col">
            <TopBar title={title} subtitle={subtitle} actions={actions} />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex-1"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}