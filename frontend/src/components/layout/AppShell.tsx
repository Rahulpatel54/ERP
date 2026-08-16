import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarContent } from "@/components/layout/SidebarContent";
import { Topbar } from "@/components/layout/Topbar";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { DensityProvider } from "@/lib/density-context";

export function AppShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <DensityProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar />

        {/* Mobile off-canvas nav (< lg). Desktop/tablet use Sidebar directly. */}
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent side="left" className="w-[280px] p-0 lg:hidden">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SidebarContent onNavigate={() => setMobileNavOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onMenuClick={() => setMobileNavOpen((open) => !open)} />
          <Breadcrumb />
          <main className="flex-1 px-4 pb-8 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </DensityProvider>
  );
}
