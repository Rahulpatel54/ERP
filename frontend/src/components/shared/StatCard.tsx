import type { LucideIcon } from "lucide-react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export interface StatCardProps {
  /** Icon shown in the tinted circle, top-left. */
  icon: LucideIcon;
  /** Tailwind color token driving both the icon circle and the progress bar, e.g. "success", "info", "warning", "primary". */
  tone?: "primary" | "success" | "warning" | "danger" | "info" | "sky" | "neutral";
  label: string;
  /** Primary metric, e.g. "1,248" or "12.6". */
  value: string | number;
  /** Optional trailing fraction, e.g. "/ 1,320". */
  valueSuffix?: string;
  /** Small pill in the top-right, e.g. "94.5%" or "+1.3". */
  badge?: { label: string; variant?: BadgeProps["variant"] };
  /** Sub-line under the value, e.g. "Present / Total Employees". */
  description?: string;
  /** Trend line at the bottom, e.g. "3.2% vs last week". */
  delta?: { direction: "up" | "down"; label: string };
  /** 0–100 fill for the thin progress bar under the description. Omit to hide the bar. */
  progress?: number;
  loading?: boolean;
  className?: string;
}

const toneClasses: Record<NonNullable<StatCardProps["tone"]>, { bg: string; fg: string; bar: string }> = {
  primary: { bg: "bg-primary/10", fg: "text-primary", bar: "bg-primary" },
  success: { bg: "bg-success/10", fg: "text-success", bar: "bg-success" },
  warning: { bg: "bg-warning/10", fg: "text-warning", bar: "bg-warning" },
  danger: { bg: "bg-danger/10", fg: "text-danger", bar: "bg-danger" },
  info: { bg: "bg-info/10", fg: "text-info", bar: "bg-info" },
  sky: { bg: "bg-sky/10", fg: "text-sky", bar: "bg-sky" },
  neutral: { bg: "bg-neutral/10", fg: "text-neutral", bar: "bg-neutral" },
};

export function StatCard({
  icon: Icon,
  tone = "primary",
  label,
  value,
  valueSuffix,
  badge,
  description,
  delta,
  progress,
  loading = false,
  className,
}: StatCardProps) {
  const tones = toneClasses[tone];

  if (loading) {
    return (
      <div
        className={cn(
          "rounded-xl border border-border bg-card p-card-mobile md:p-card-desktop",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <Skeleton className="mt-4 h-3 w-24" />
        <Skeleton className="mt-2 h-7 w-20" />
        <Skeleton className="mt-2 h-3 w-32" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-card-mobile md:p-card-desktop",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-full", tones.bg)}>
          <Icon className={cn("h-5 w-5", tones.fg)} aria-hidden="true" />
        </span>
        {badge && <Badge variant={badge.variant ?? "neutral"}>{badge.label}</Badge>}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 flex items-baseline gap-1.5 text-2xl font-semibold text-foreground">
        {value}
        {valueSuffix && <span className="text-base font-normal text-muted-foreground">{valueSuffix}</span>}
      </p>
      {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}

      {typeof progress === "number" && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-neutral/10">
          <div
            className={cn("h-full rounded-full", tones.bar)}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}

      {delta && (
        <p
          className={cn(
            "mt-2 flex items-center gap-1 text-xs font-medium",
            delta.direction === "up" ? "text-success" : "text-danger"
          )}
        >
          {delta.direction === "up" ? (
            <ArrowUp className="h-3 w-3" aria-hidden="true" />
          ) : (
            <ArrowDown className="h-3 w-3" aria-hidden="true" />
          )}
          {delta.label}
        </p>
      )}
    </div>
  );
}
