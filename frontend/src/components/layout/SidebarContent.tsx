import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navIcons } from "@/components/layout/nav-icons";
import { primaryNav, bottomNav, type NavItem } from "@/lib/mock-nav";
import { Badge } from "@/components/ui/badge";

interface SidebarContentProps {
  /** Icon-only rail (tablet breakpoint) — hides labels, badges, and children. */
  collapsed?: boolean;
  /** Called after a nav link is clicked — used to close the mobile Sheet. */
  onNavigate?: () => void;
}

function isSectionActive(item: NavItem, pathname: string) {
  if (item.path === "/") return pathname === "/";
  return pathname === item.path || pathname.startsWith(`${item.path}/`);
}

function NavRow({
  item,
  collapsed,
  active,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  active: boolean;
  onNavigate?: () => void;
}) {
  const Icon = navIcons[item.icon];

  return (
    <div>
      <NavLink
        to={item.path}
        end={item.path === "/"}
        onClick={onNavigate}
        title={collapsed ? item.label : undefined}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            collapsed && "justify-center px-0",
            isActive || active
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
        {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
        {!collapsed && typeof item.badge === "number" && (
          <Badge variant="neutral">{item.badge}</Badge>
        )}
      </NavLink>

      {!collapsed && item.children && active && (
        <div className="ml-[34px] mt-1 flex flex-col gap-0.5 border-l border-border pl-3">
          {item.children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              end
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-2.5 py-1.5 text-sm transition-colors",
                  isActive
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export function SidebarContent({ collapsed = false, onNavigate }: SidebarContentProps) {
  const { pathname } = useLocation();

  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex items-center gap-2.5 px-4 py-5", collapsed && "justify-center px-0")}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
          E
        </span>
        {!collapsed && (
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold text-foreground">EWMS</p>
            <p className="truncate text-xs text-muted-foreground">Workforce Management</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {primaryNav.map((item) => (
          <NavRow
            key={item.path}
            item={item}
            collapsed={collapsed}
            active={isSectionActive(item, pathname)}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="space-y-1 border-t border-border px-3 py-3">
        {bottomNav.map((item) => (
          <NavRow
            key={item.path}
            item={item}
            collapsed={collapsed}
            active={isSectionActive(item, pathname)}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      <div
        className={cn(
          "border-t border-border px-4 py-3 text-xs text-muted-foreground",
          collapsed && "px-0 text-center"
        )}
      >
        {collapsed ? "v1.0.0" : <>© {new Date().getFullYear()} EWMS · v1.0.0</>}
      </div>
    </div>
  );
}
