import { NavIconButton } from "@/components/layout/nav-icon-button";
import { navItems } from "@/lib/mock-data";

type SidebarProps = {
  activeId?: string;
};

export function Sidebar({ activeId = "home" }: SidebarProps) {
  return (
    <aside className="hidden h-screen w-[72px] shrink-0 flex-col items-center border-r border-sidebar-border bg-sidebar py-6 lg:flex">
      <div className="mb-10 flex size-10 items-center justify-center rounded-xl bg-primary/10">
        <span className="font-serif text-lg font-semibold text-primary">P</span>
      </div>

      <nav className="flex flex-1 flex-col items-center gap-3">
        {navItems.map((item) => (
          <NavIconButton
            key={item.id}
            id={item.id}
            href={item.href}
            label={item.label}
            isActive={item.id === activeId}
            tooltipSide="right"
          />
        ))}
      </nav>
    </aside>
  );
}
