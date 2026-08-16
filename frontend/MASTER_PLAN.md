# MASTER_PLAN.md — EWMS Frontend

## Project
EWMS (Enterprise Workforce Management System) — HR/admin web app. Frontend only, all data is
dummy/mock (no real backend). Every text field, table row, stat, and list is placeholder data
wired through props/state so it's trivially swappable for live data later — never hardcode a
value directly inside JSX.

## Stack
React + Vite + TypeScript + Tailwind CSS + shadcn/ui (Button, Input, Select, Dialog, Sheet,
Dropdown, Tabs, Table primitives — always via shadcn, never hand-rolled duplicates) +
recharts (line, bar, donut/pie) + lucide-react (icons) + react-router (routing) +
react-hook-form + zod (all forms + validation).

## Source material
17 reference screenshots, two of which are annotated spec sheets (breakpoints + component
lists):
- `1-_login-signup.png` — Auth screen
- `2-_dashboard.png` — Main dashboard
- `2. MAIN DASHBOARD` spec sheet — dashboard at desktop/tablet/mobile + component list
- `notification.png` — Notification side panel
- `search.png` — Global command-palette search
- `3-_employee_list.png` — Employee List table
- `employee_add-editpng.png` — Add/Edit Employee (Sheet/drawer, tabbed)
- `4_employee_detail.png` — Employee Detail page
- `5-attendance-module.png` — Attendance Calendar (basic)
- `5. ATTENDANCE MODULE` spec sheet — Attendance Calendar/Table at desktop/tablet/mobile
- `6_-_leave_wizard.png` — Leave Request multi-step wizard
- `7-_leave-approval.png` — Leave Approval detail + workflow timeline
- `payroll-reports-assets.png` — Payroll Summary, Reports, Assets (3 pages in 1 image)
- `org_tree_structurepng.png` — Organization Structure (tree + detail panel)
- `Settings.png` — Settings → General
- `theme-opration.png` — Settings → Theme & Accent picker
- `permission_matrix.png` — Settings → Roles & Permission Matrix
- `404-403.png` — Error pages

## Working method (non-negotiable)
- One phase = one focused task = one conversation. Only the screenshot(s) named for that
  phase are in scope.
- Every new chat starts by reading `PIPELINE.md` (tokens, folder structure, Component
  Registry, Phase Log, TODOs) before writing any code.
- Reuse before building. Check the Component Registry in PIPELINE.md first.
- DRY: shared UI is a component with props, not copy-pasted per page.
- Finish smaller scope completely rather than half-finish a bigger one. Cut breadth (fewer
  tabs/fields/edge states), never leave something wired in a way that can crash.
- 2 failed fix attempts on the same bug = stop, re-scope, don't try a 3rd patch.
- All data is dummy/placeholder, but structured as typed mock objects/arrays passed as props
  — not literal strings buried in JSX — so real data can drop in later without touching
  component internals.

## Phase list

| # | Phase | Screenshot(s) | Depends on |
|---|-------|---------------|------------|
| 0 | Foundation: tokens, layout shell (Sidebar, Topbar, Breadcrumb), routing skeleton | dashboard, spec sheets (for chrome only) | — |
| 1 | Auth: Login / Signup | `1-_login-signup.png` | 0 |
| 2 | Main Dashboard | `2-_dashboard.png`, `2. MAIN DASHBOARD` spec | 0 |
| 3 | Notifications panel + Global Search palette | `notification.png`, `search.png` | 0, 2 |
| 4 | Employee List | `3-_employee_list.png` | 0 |
| 5 | Add/Edit Employee drawer | `employee_add-editpng.png` | 0, 4 |
| 6 | Employee Detail page | `4_employee_detail.png` | 0, 4 |
| 7 | Attendance Calendar + Table (responsive) | `5-attendance-module.png`, `5. ATTENDANCE MODULE` spec | 0 |
| 8 | Leave Request Wizard | `6_-_leave_wizard.png` | 0 |
| 9 | Leave Approval detail | `7-_leave-approval.png` | 0 |
| 10 | Payroll Summary | `payroll-reports-assets.png` (top section) | 0 |
| 11 | Reports | `payroll-reports-assets.png` (bottom-left) | 0 |
| 12 | Assets | `payroll-reports-assets.png` (bottom-right) | 0 |
| 13 | Organization Structure (tree + detail panel) | `org_tree_structurepng.png` | 0 |
| 14 | Settings: General + Theme & Accent | `Settings.png`, `theme-opration.png` | 0 |
| 15 | Settings: Users & Roles → Permission Matrix | `permission_matrix.png` | 0, 14 |
| 16 | Error pages: 404 / 403 | `404-403.png` | 0 |

16 build phases (0–15) + 1 closing phase (16). Order above is the recommended build order;
phases 10/11/12 can be split into three separate chats since they're visually one image but
are three independent pages.

## Definition of done (every phase)
- Route wired in react-router, reachable from the sidebar where applicable.
- Responsive down to the breakpoints shown in the spec sheets (desktop 1440 / tablet 1024 /
  mobile 390) even for phases without an explicit spec sheet — infer from the shared shell.
- Loading / empty / error states implemented where the reference shows them (see spec sheets
  and the Employee List "States Preview" row).
- All new shared components added to the Component Registry in PIPELINE.md with props
  documented.
- Phase Log entry appended in PIPELINE.md: what was built, what was deferred, any TODOs.