import { SidebarContent } from "@/components/layout/SidebarContent";

/**
 * Responsive behavior (PIPELINE.md section 1):
 *  - < lg (mobile, 390px target): not rendered here — AppShell renders a Sheet
 *    drawer instead, triggered by the Topbar hamburger.
 *  - lg to xl (tablet, 1024px target): icon rail, 72px, no labels.
 *  - >= xl (desktop, 1440px target): full sidebar, 260px, labels + sub-nav.
 */
export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen shrink-0 border-r border-border bg-card lg:block lg:w-sidebar-rail xl:w-sidebar">
      <div className="hidden h-full xl:block">
        <SidebarContent />
      </div>
      <div className="h-full xl:hidden">
        <SidebarContent collapsed />
      </div>
    </aside>
  );
}
