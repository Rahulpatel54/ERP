/**
 * Sidebar navigation tree and topbar badge counts. Icon names reference keys
 * in components/layout/nav-icons.ts (lucide-react components) rather than
 * storing JSX here, so this file stays plain, serializable mock data that
 * can later be swapped for an API response without touching the Sidebar.
 */

export type NavIconKey =
  | "dashboard"
  | "employees"
  | "attendance"
  | "leave"
  | "payroll"
  | "approvals"
  | "reports"
  | "assets"
  | "organization"
  | "settings"
  | "notifications"
  | "help";

export interface NavChild {
  label: string;
  path: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: NavIconKey;
  badge?: number;
  children?: NavChild[];
}

export const primaryNav: NavItem[] = [
  { label: "Dashboard", path: "/", icon: "dashboard" },
  { label: "Employees", path: "/employees", icon: "employees" },
  {
    label: "Attendance",
    path: "/attendance",
    icon: "attendance",
    children: [
      { label: "Calendar View", path: "/attendance" },
      { label: "Table View", path: "/attendance/table" },
    ],
  },
  { label: "Leave", path: "/leave", icon: "leave" },
  { label: "Payroll", path: "/payroll", icon: "payroll" },
  { label: "Approvals", path: "/approvals", icon: "approvals", badge: 12 },
  { label: "Reports", path: "/reports", icon: "reports" },
  { label: "Assets", path: "/assets", icon: "assets" },
  { label: "Organization", path: "/organization", icon: "organization" },
  {
    label: "Settings",
    path: "/settings",
    icon: "settings",
    children: [
      { label: "General", path: "/settings" },
      { label: "Theme & Accent", path: "/settings/theme" },
      { label: "Roles & Permissions", path: "/settings/permissions" },
    ],
  },
];

export const bottomNav: NavItem[] = [
  { label: "Notifications", path: "/notifications", icon: "notifications", badge: 6 },
  { label: "Help & Support", path: "/help", icon: "help" },
];

/** Topbar icon badge counts, distinct from the sidebar's Notifications entry. */
export const topbarBadges = {
  notifications: 6,
  mail: 3,
};

export const breadcrumbLabels: Record<string, string> = {
  "": "Dashboard",
  employees: "Employees",
  attendance: "Attendance",
  table: "Table View",
  leave: "Leave",
  approvals: "Approvals",
  payroll: "Payroll",
  reports: "Reports",
  assets: "Assets",
  organization: "Organization",
  settings: "Settings",
  theme: "Theme & Accent",
  permissions: "Roles & Permissions",
  notifications: "Notifications",
  help: "Help & Support",
};
