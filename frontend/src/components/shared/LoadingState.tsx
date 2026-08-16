import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface LoadingStateProps {
  variant?: "card" | "chart" | "table" | "list";
  /** Number of skeleton rows for "table"/"list" variants. */
  rows?: number;
  className?: string;
}

export function LoadingState({ variant = "card", rows = 5, className }: LoadingStateProps) {
  if (variant === "chart") {
    return (
      <div className={cn("rounded-xl border border-border bg-card p-card-mobile md:p-card-desktop", className)}>
        <Skeleton className="h-5 w-40" />
        <Skeleton className="mt-6 h-56 w-full" />
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}>
        <Skeleton className="h-11 w-full rounded-none" />
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-t border-border px-4 py-3">
            <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full max-w-[220px]" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-auto h-4 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
            <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // "card" — mirrors StatCard's own `loading` skeleton so grids stay consistent.
  return (
    <div className={cn("rounded-xl border border-border bg-card p-card-mobile md:p-card-desktop", className)}>
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
