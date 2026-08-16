import { ShieldCheck } from "lucide-react";
import { LoginBrandPanel } from "@/features/auth/components/LoginBrandPanel";
import { LoginForm } from "@/features/auth/components/LoginForm";

export function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <LoginBrandPanel />

      <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 px-6 py-10">
        {/* Compact brand mark — shown only when the full brand panel is hidden (< lg). */}
        <div className="flex items-center gap-2 lg:hidden">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            E
          </span>
          <span className="text-sm font-semibold text-foreground">EWMS</span>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <LoginForm />
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Secured by enterprise-grade encryption
        </p>
      </div>
    </div>
  );
}
