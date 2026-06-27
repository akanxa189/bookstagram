"use client";

import { NavIconButton } from "@/components/layout/nav-icon-button";
import { navItems } from "@/lib/mock-data";

type MobileNavProps = {
  activeId?: string;
};

export function MobileNav({ activeId = "home" }: MobileNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-sidebar-border bg-sidebar px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {navItems.map((item) => (
          <NavIconButton
            key={item.id}
            id={item.id}
            href={item.href}
            label={item.label}
            isActive={item.id === activeId}
            tooltipSide="top"
            className="min-h-11 min-w-11"
          />
        ))}
      </div>
    </nav>
  );
}
