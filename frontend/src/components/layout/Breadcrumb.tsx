import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { breadcrumbLabels } from "@/lib/mock-nav";
import { cn } from "@/lib/utils";

export function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    const label = breadcrumbLabels[segment] ?? segment;
    return { path, label };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 px-4 py-3 text-sm md:px-6">
      <Link
        to="/"
        className={cn(
          "flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground",
          segments.length === 0 && "font-medium text-foreground"
        )}
      >
        <Home className="h-3.5 w-3.5" aria-hidden="true" />
        Home
      </Link>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span key={crumb.path} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            {isLast ? (
              <span className="font-medium text-foreground">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="text-muted-foreground transition-colors hover:text-foreground">
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
