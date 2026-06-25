import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AuthCard({ title, description, footer, children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="app-shell-bg flex min-h-screen items-center justify-center px-4 py-10">
        <Card className="glass-panel mesh-border w-full max-w-md rounded-[28px] border-border/60 bg-card/75">
          <CardHeader className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl brand-gradient text-primary-foreground shadow-[var(--shadow-glow)]">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl font-bold">SmartLogix AI</span>
            </Link>
            <div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {children}
            {footer ? <div className="mt-5 text-center text-sm text-muted-foreground">{footer}</div> : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
