# PIPELINE.md — EWMS Frontend (single source of truth)

Read this fully before starting any phase. Update the **Component Registry**, **Phase Log**,
and **Open TODOs** sections at the end of every phase — this file is the only thing a fresh
chat can rely on to know current state.

---

## 1. Design tokens (read off the screenshots)

### Color
```
--primary: #2563EB          /* royal blue — logo mark, primary buttons, active nav, links */
--primary-foreground: #FFFFFF

/* Status / semantic (used across dashboard donuts, attendance legends, badges) */
--success: #16A34A   /* Present, Approved, Active */
--warning: #F59E0B   /* Late, Pending, On Leave (amber) */
--danger:  #DC2626   /* Absent, Rejected, error banners */
--info:    #7C3AED   /* On Leave (purple, attendance legend) / WFH uses --sky */
--sky:     #0EA5E9   /* WFH marker */
--neutral: #64748B   /* Weekend/Holiday, disabled, muted text */

/* Accent picker (Theme & Accent screen) — full selectable palette, default = Blue */
blue indigo purple violet pink rose red orange amber yellow lime green teal cyan sky slate

/* Surfaces */
--bg-app: #F8FAFC
--bg-card: #FFFFFF
--border: #E2E8F0
--text-primary: #0F172A
--text-secondary: #64748B
```

### Typography
System sans stack (Inter-like). Sizes observed: page title ~24–28px semibold, section header
~16–18px semibold, body 14px, small/meta 12–13px. Font-size control exists in Theme settings
(A- / A / A+) — build type scale off a CSS variable (`--font-scale`) so that control can work.

### Spacing / radius / density
- Radius control in Theme settings (Small/Medium/Large) → drive via `--radius` CSS var,
  default `8px`.
- Density control on same screen (Comfortable/Compact) → affects table row height & card
  padding via a `density` context, default Comfortable.
- Card padding ~24px desktop, 16px mobile. Sidebar width ~220–260px desktop, collapses to
  icon rail or off-canvas on tablet/mobile per spec sheets.

### Layout shell (present on every authenticated screen)
- **Sidebar** (left, fixed): logo block, primary nav (Dashboard, Employees, Attendance,
  Leave, Payroll, Approvals, Reports, Assets, Organization, Settings), nested sub-nav on
  active section, bottom cluster (Notifications count, Help & Support, user menu).
- **Topbar**: hamburger (collapse sidebar), global search bar with `⌘K` hint, notification
  bell w/ badge, mail/messages icon w/ badge, help icon, user avatar+name+role dropdown.
- **Breadcrumb** under topbar on every inner page: `Home > Section > Page`.
- Badges on nav items (e.g. Approvals "12") and topbar icons must be dynamic props, not
  hardcoded.

### Responsive breakpoints (from the two annotated spec sheets)
- Desktop: 1440px — full sidebar + topbar + multi-column grids.
- Tablet: 1024px — condensed sidebar (icon rail), stacked summary cards in a 2-col grid.
- Mobile: 390px — bottom/hidden sidebar, single-column stacked cards, tab bar for
  view-toggles (e.g. Calendar View / Table View).

---

## 2. Folder structure

```
src/
  components/
    ui/            # shadcn primitives only — do not hand-edit generated internals beyond theming
    layout/         # Sidebar, Topbar, Breadcrumb, PageHeader, AppShell
    shared/         # StatCard, DataTable, Badge(status), DonutChart, LineChart, BarChart,
                     # EmptyState, LoadingState, ErrorState, SearchCommandPalette,
                     # NotificationPanel, Avatar, FormField wrappers
  features/
    auth/
    dashboard/
    employees/
    attendance/
    leave/
    payroll/
    reports/
    assets/
    organization/
    approvals/
    settings/
    errors/
    (each: components/, pages/, mock-data.ts, types.ts)
  routes/            # react-router route tree
  lib/               # utils, cn(), zod schemas shared across features
  styles/            # tailwind.css, tokens.css (CSS vars from section 1)
  App.tsx
```

Rule: a feature folder never imports another feature's internals directly — shared pieces
move up to `components/shared` first.

---

## 3. Component Registry

*(Append rows as components are built. Never build a duplicate of something already listed —
extend it with a new prop instead.)*

| Component | Location | Props (summary) | Used by (phase) | Notes |
|---|---|---|---|---|
| Button | `components/ui/button.tsx` | `variant` (default/destructive/outline/secondary/ghost/link), `size` (default/sm/lg/icon), `asChild` | 0 | shadcn-style, cva variants. `asChild` lets 404/403 pages render it as a `<Link>`. |
| Input | `components/ui/input.tsx` | standard `<input>` props | 0 | shadcn-style. Used by Topbar search. |
| Badge | `components/ui/badge.tsx` | `variant` (default/success/warning/danger/info/neutral/outline/solid) | 0 | shadcn-style. Used by StatCard, Sidebar nav badges. |
| Skeleton | `components/ui/skeleton.tsx` | standard `<div>` props | 0 | shadcn-style. Backs LoadingState and StatCard's `loading` prop. |
| Avatar / AvatarImage / AvatarFallback | `components/ui/avatar.tsx` | radix-based | 0 | Used by Topbar user menu. |
| DropdownMenu (+ Trigger/Content/Item/Label/Separator/Group) | `components/ui/dropdown-menu.tsx` | radix-based | 0 | Used by Topbar user menu. |
| Sheet (+ Trigger/Close/Content/Title) | `components/ui/sheet.tsx` | radix Dialog styled as slide-in drawer, `side` (left/right) | 0 | Used by AppShell for the mobile off-canvas sidebar. Will be reused for the Add/Edit Employee drawer (Phase 5). |
| AppShell | `components/layout/AppShell.tsx` | none (reads route via `<Outlet />`) | 0 | Composes Sidebar + Topbar + Breadcrumb + mobile Sheet nav + DensityProvider. Wraps every authenticated route in routes/index.tsx. |
| Sidebar | `components/layout/Sidebar.tsx` | none | 0 | Desktop/tablet only (`hidden lg:block`). Full sidebar at `xl+`, icon rail from `lg` to `xl`. |
| SidebarContent | `components/layout/SidebarContent.tsx` | `collapsed?: boolean`, `onNavigate?: () => void` | 0 | Shared nav markup used by both `Sidebar` (desktop/rail) and AppShell's mobile `Sheet`. Renders `primaryNav`/`bottomNav` from mock-nav.ts; expands children only when that section is active. |
| Topbar | `components/layout/Topbar.tsx` | `onMenuClick: () => void`, `notificationsCount?`, `mailCount?` | 0 | Hamburger (mobile only), global search w/ ⌘K hint, notification/mail icon badges, help icon, user avatar dropdown. |
| Breadcrumb | `components/layout/Breadcrumb.tsx` | none (reads route via `useLocation`) | 0 | Derives `Home > Section > Page` from the URL using `breadcrumbLabels` in mock-nav.ts. |
| StatCard | `components/shared/StatCard.tsx` | `icon`, `tone`, `label`, `value`, `valueSuffix?`, `badge?`, `description?`, `delta?`, `progress?`, `loading?` | 0 | Generic summary-card used by dashboard, attendance, payroll, etc. Has its own built-in skeleton via `loading`. |
| EmptyState | `components/shared/EmptyState.tsx` | `icon?`, `title`, `description?`, `action?` | 0 | Generic "no data" state per spec sheets. |
| LoadingState | `components/shared/LoadingState.tsx` | `variant` (card/chart/table/list), `rows?` | 0 | Generic skeleton block, shape matches where it's dropped in (card grid, chart panel, table, list). |
| ErrorState | `components/shared/ErrorState.tsx` | `title?`, `description?`, `onRetry?` | 0 | Inline error banner with retry, per spec sheets' "Error State" variant. |
| PlaceholderPage | `components/shared/PlaceholderPage.tsx` | `title`, `phase: number \| "unscoped"` | 0 | Stand-in for every route not yet built, so routing works end to end from Phase 0. Swapped out phase by phase. |

---

## 4. Phase Log

*(Append one entry per completed phase.)*

| Phase | Status | Summary | Deferred / TODO |
|---|---|---|---|
| 0 — Foundation | Done | Scaffolded the Vite + React + TS + Tailwind project. Implemented every CSS variable token in `styles/tokens.css` (colors, radius, font-scale) wired through `tailwind.config.ts` using the `hsl(var(--x) / <alpha-value>)` pattern so opacity modifiers work. Built `AppShell` (Sidebar full/rail + mobile Sheet drawer, Topbar, Breadcrumb) responsive at 1440/1024/390. Built shared `StatCard`, `EmptyState`, `LoadingState`, `ErrorState`. Wired the full react-router tree from MASTER_PLAN's phase table with `PlaceholderPage` stand-ins so every route is reachable now. Added shadcn-style primitives needed for the shell: Button, Input, Badge, Skeleton, Avatar, DropdownMenu, Sheet. Mock data lives in `lib/mock-people.ts` (shared cast) and `lib/mock-nav.ts` (nav tree + badge counts + breadcrumb labels). | **Could not run `npm install` or build/typecheck this project** — this sandbox has no network access to the npm registry, so none of this has been verified by an actual compiler or dev server. I did a manual line-by-line audit (import correctness, Tailwind class/token validity, prop typing) and fixed two real bugs that way (missing `<alpha-value>` in color tokens, an invalid `bg-text-primary` class), but a real `npm install && npm run dev` pass is still needed before building on top of this. Desktop sidebar collapse/expand toggle deferred — only the responsive breakpoint behavior (rail at tablet, full at desktop) and the mobile Sheet toggle are wired. Density context exists but nothing yet reads `data-density` besides the CSS var override in globals.css — real row-height/padding consumption comes with Phase 4's DataTable. |

---

## 5. Open TODOs

*(Running list, pulled from "Deferred" column above. Clear items when picked up in a later
phase.)*

- Verify the Phase 0 scaffold with a real `npm install && npm run dev` — it has only been manually audited, never compiled, due to no network access in the build sandbox.
- Desktop sidebar collapse/expand (user-triggered rail toggle) — not built; only the automatic responsive breakpoint switch exists.
- Density context is wired but unconsumed — first real consumer should be Phase 4's DataTable (row height) and card padding across StatCard grids.

---

## 6. Mock data conventions

- Every feature owns a `mock-data.ts` exporting typed arrays/objects matching that feature's
  `types.ts`. Pages import from there — never inline literal employee names, numbers, or
  strings in JSX beyond static UI labels (button text, headers).
- Reuse the same mock people across features where the screenshots do (e.g. Vikram Mehta,
  Neha Sharma, Amit Patel, Rahul Singh, Priya Desai appear in dashboard, employee list,
  approvals, org tree) so the app feels coherent — keep one shared `mock-people.ts` in
  `lib/` that feature mock files import from.
- All numeric stats (counts, %, currency) are `number`/`string` props on `StatCard`, sourced
  from mock data, so swapping to an API later only touches the mock-data file.