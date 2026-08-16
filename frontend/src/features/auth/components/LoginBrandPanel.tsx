import { ShieldCheck, Zap, PieChart } from "lucide-react";
import { DashboardPreview } from "@/features/auth/components/DashboardPreview";

const featureBullets = [
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description: "Enterprise-grade security to protect your data",
  },
  {
    icon: Zap,
    title: "Smart & Efficient",
    description: "Streamline HR processes and save valuable time",
  },
  {
    icon: PieChart,
    title: "Insights & Reports",
    description: "Make data-driven decisions with powerful analytics",
  },
];

export function LoginBrandPanel() {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-10 py-10 text-white lg:flex lg:w-1/2 lg:shrink-0 xl:w-[45%] xl:px-16">
      {/* Ambient glow — purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold">
          E
        </span>
        <div className="leading-tight">
          <p className="text-lg font-bold">EWMS</p>
          <p className="text-xs text-white/60">Enterprise Workforce</p>
          <p className="text-xs text-white/60">Management System</p>
        </div>
      </div>

      <div className="relative mt-10 max-w-lg">
        <h1 className="text-4xl font-bold leading-tight xl:text-[2.75rem]">
          Manage your{" "}
          <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
            people
          </span>
          .
          <br />
          Empower your{" "}
          <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
            organization
          </span>
          .
        </h1>
        <p className="mt-4 text-white/70">
          A centralized platform to manage employees, attendance, leave, payroll and more — all
          in one place.
        </p>

        <div className="mt-8">
          <DashboardPreview />
        </div>
      </div>

      <div className="relative mt-10 grid grid-cols-3 gap-4">
        {featureBullets.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-start gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Icon className="h-4 w-4 text-indigo-300" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-white/60">{description}</p>
          </div>
        ))}
      </div>

      <p className="relative mt-10 text-xs text-white/40">
        © {new Date().getFullYear()} EWMS. All rights reserved.
      </p>
    </div>
  );
}
