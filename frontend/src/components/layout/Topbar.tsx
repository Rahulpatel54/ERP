import { Menu, Search, Bell, Mail, HelpCircle, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { topbarBadges } from "@/lib/mock-nav";
import { currentUser } from "@/lib/mock-people";
import { cn } from "@/lib/utils";

interface TopbarProps {
  onMenuClick: () => void;
  /** Notifications count shown on the bell — passed in rather than imported
   * directly so a later phase can drive it from live/mock state. */
  notificationsCount?: number;
  mailCount?: number;
}

function IconBadge({ count }: { count?: number }) {
  if (!count) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-danger-foreground">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function Topbar({
  onMenuClick,
  notificationsCount = topbarBadges.notifications,
  mailCount = topbarBadges.mail,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-topbar-height items-center gap-3 border-b border-border bg-card px-4 md:px-6">
      <Button variant="ghost" size="icon" className="shrink-0 lg:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Open menu</span>
      </Button>

      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          placeholder="Search employees, modules, reports…"
          className="pl-9 pr-14"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      <Button variant="ghost" size="icon" className="ml-auto shrink-0 md:hidden" aria-label="Search">
        <Search className="h-5 w-5" aria-hidden="true" />
      </Button>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" aria-hidden="true" />
          <IconBadge count={notificationsCount} />
        </Button>
        <Button variant="ghost" size="icon" className="relative hidden sm:inline-flex" aria-label="Messages">
          <Mail className="h-5 w-5" aria-hidden="true" />
          <IconBadge count={mailCount} />
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Help & support">
          <HelpCircle className="h-5 w-5" aria-hidden="true" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "ml-1 flex items-center gap-2 rounded-lg px-1.5 py-1 transition-colors hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <Avatar>
                <AvatarFallback>{currentUser.avatarInitials}</AvatarFallback>
              </Avatar>
              <span className="hidden text-left leading-tight md:block">
                <span className="block text-sm font-medium text-foreground">{currentUser.name}</span>
                <span className="block text-xs text-muted-foreground">{currentUser.role}</span>
              </span>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{currentUser.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4" aria-hidden="true" />
              My profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4" aria-hidden="true" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-danger focus:bg-danger/10 focus:text-danger">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
