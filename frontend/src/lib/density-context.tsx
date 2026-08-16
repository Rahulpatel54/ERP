import { createContext, useContext, useState, type ReactNode } from "react";

export type Density = "comfortable" | "compact";

interface DensityContextValue {
  density: Density;
  setDensity: (density: Density) => void;
}

const DensityContext = createContext<DensityContextValue | undefined>(undefined);

/**
 * Wraps the app so any component can read the current density (row height /
 * card padding) via useDensity(). The Theme & Accent settings screen
 * (Phase 14) will call setDensity() when the user toggles Comfortable/Compact.
 */
export function DensityProvider({ children }: { children: ReactNode }) {
  const [density, setDensity] = useState<Density>("comfortable");

  return (
    <DensityContext.Provider value={{ density, setDensity }}>
      <div data-density={density}>{children}</div>
    </DensityContext.Provider>
  );
}

export function useDensity() {
  const ctx = useContext(DensityContext);
  if (!ctx) {
    throw new Error("useDensity must be used within a DensityProvider");
  }
  return ctx;
}
