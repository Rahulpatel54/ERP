import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";

import { LoginPage } from "@/features/auth/pages/LoginPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { EmployeeListPage } from "@/features/employees/pages/EmployeeListPage";
import { EmployeeDetailPage } from "@/features/employees/pages/EmployeeDetailPage";
import { AttendanceCalendarPage } from "@/features/attendance/pages/AttendanceCalendarPage";
import { AttendanceTablePage } from "@/features/attendance/pages/AttendanceTablePage";
import { LeaveWizardPage } from "@/features/leave/pages/LeaveWizardPage";
import { ApprovalsPage } from "@/features/approvals/pages/ApprovalsPage";
import { PayrollPage } from "@/features/payroll/pages/PayrollPage";
import { ReportsPage } from "@/features/reports/pages/ReportsPage";
import { AssetsPage } from "@/features/assets/pages/AssetsPage";
import { OrganizationPage } from "@/features/organization/pages/OrganizationPage";
import { SettingsGeneralPage } from "@/features/settings/pages/SettingsGeneralPage";
import { SettingsThemePage } from "@/features/settings/pages/SettingsThemePage";
import { SettingsPermissionsPage } from "@/features/settings/pages/SettingsPermissionsPage";
import { NotificationsPage } from "@/features/notifications/pages/NotificationsPage";
import { HelpPage } from "@/features/help/pages/HelpPage";
import { NotFoundPage } from "@/features/errors/pages/NotFoundPage";
import { ForbiddenPage } from "@/features/errors/pages/ForbiddenPage";

const router = createBrowserRouter([
  // Pre-auth — no sidebar/topbar chrome.
  { path: "/login", element: <LoginPage /> },
  { path: "/403", element: <ForbiddenPage /> },

  // Authenticated app — wrapped in AppShell (Sidebar + Topbar + Breadcrumb).
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/employees", element: <EmployeeListPage /> },
      { path: "/employees/:id", element: <EmployeeDetailPage /> },
      { path: "/attendance", element: <AttendanceCalendarPage /> },
      { path: "/attendance/table", element: <AttendanceTablePage /> },
      { path: "/leave", element: <LeaveWizardPage /> },
      { path: "/approvals", element: <ApprovalsPage /> },
      { path: "/payroll", element: <PayrollPage /> },
      { path: "/reports", element: <ReportsPage /> },
      { path: "/assets", element: <AssetsPage /> },
      { path: "/organization", element: <OrganizationPage /> },
      { path: "/settings", element: <SettingsGeneralPage /> },
      { path: "/settings/theme", element: <SettingsThemePage /> },
      { path: "/settings/permissions", element: <SettingsPermissionsPage /> },
      { path: "/notifications", element: <NotificationsPage /> },
      { path: "/help", element: <HelpPage /> },
    ],
  },

  // Catch-all 404 — kept outside AppShell so a broken deep link doesn't
  // depend on the shell rendering correctly.
  { path: "*", element: <NotFoundPage /> },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
