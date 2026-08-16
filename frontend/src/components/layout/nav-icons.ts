import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Plane,
  Wallet,
  ClipboardCheck,
  BarChart3,
  Boxes,
  Network,
  Settings,
  Bell,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import type { NavIconKey } from "@/lib/mock-nav";

export const navIcons: Record<NavIconKey, LucideIcon> = {
  dashboard: LayoutDashboard,
  employees: Users,
  attendance: CalendarCheck,
  leave: Plane,
  payroll: Wallet,
  approvals: ClipboardCheck,
  reports: BarChart3,
  assets: Boxes,
  organization: Network,
  settings: Settings,
  notifications: Bell,
  help: HelpCircle,
};
