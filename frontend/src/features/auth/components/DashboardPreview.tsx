import { Home, Users, CalendarCheck, Plane, Wallet, BarChart3, Settings } from "lucide-react";

/**
 * Static illustration only — mirrors the real Dashboard's shape (Phase 2)
 * but isn't wired to mock data. Values here are fixed design copy, same
 * category as the headline and feature bullets on this panel, not live
 * app data, so they're fine hardcoded per MASTER_PLAN's data-wiring rule.
 */
const previewNavIcons = [Home, Users, CalendarCheck, Plane, Wallet, BarChart3, Settings];

const statBlocks = [
  { label: "Total Employees", value: "248", meta: "↑ 12 this month" },
  { label: "Present Today", value: "198", meta: "80% of total" },
  { label: "On Leave", value: "18", meta: "↑ 2 this month" },
  { label: "Departments", value: "12", meta: "Active" },
];

export function DashboardPreview() {
  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
    >
      <div className="flex gap-3">
        {/* Decorative mini sidebar rail — presentational only. */}
        <div className="hidden shrink-0 flex-col items-center gap-3 border-r border-white/10 pr-3 sm:flex">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-white">
            E
          </span>
          <div className="mt-1 flex flex-col gap-2.5">
            {previewNavIcons.map((Icon, i) => (
              <Icon key={i} className="h-3.5 w-3.5 text-white/40" />
            ))}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-white/70">Dashboard</p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {statBlocks.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-white p-2.5">
                <p className="truncate text-[10px] text-slate-500">{stat.label}</p>
                <p className="mt-0.5 text-base font-semibold text-slate-900">{stat.value}</p>
                <p className="mt-0.5 text-[10px] text-emerald-600">{stat.meta}</p>
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-5 gap-2">
            <div className="col-span-3 rounded-lg bg-white p-2.5">
              <p className="text-[10px] font-medium text-slate-500">Attendance Overview</p>
              <svg viewBox="0 0 120 40" className="mt-1.5 h-10 w-full" preserveAspectRatio="none">
                <polyline
                  points="0,28 20,18 40,24 60,20 80,26 100,12 120,8"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center rounded-lg bg-white p-2.5">
              <p className="self-start text-[10px] font-medium text-slate-500">Leave Balance</p>
              <svg viewBox="0 0 36 36" className="mt-1 h-9 w-9">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="4"
                  strokeDasharray="62 97"
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <p className="mt-1 text-[10px] font-semibold text-slate-900">12.5d</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
