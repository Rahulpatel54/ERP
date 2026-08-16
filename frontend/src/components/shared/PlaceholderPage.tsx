interface PlaceholderPageProps {
  title: string;
  /** Phase number from MASTER_PLAN.md's table, or "unscoped" for routes (like Help & Support) that don't have a dedicated phase yet. */
  phase: number | "unscoped";
}

/**
 * Every route in MASTER_PLAN.md's phase table needs to be reachable end to
 * end from Phase 0 onward, before the phase that actually builds it lands.
 * This is that stand-in — swapped for the real page in its own phase.
 */
export function PlaceholderPage({ title, phase }: PlaceholderPageProps) {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {phase === "unscoped"
          ? "This route isn't part of the current phase plan yet. Navigation and layout are wired now so routing works end to end."
          : `This page ships in Phase ${phase}. Navigation and layout are wired now so routing works end to end.`}
      </p>
    </div>
  );
}
