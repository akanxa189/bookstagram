import {
  BookOpen,
  Calendar,
  Home,
  Library,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/mock-data";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  bookshelf: Library,
  book: BookOpen,
  trophy: Trophy,
  calendar: Calendar,
};

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
        {navItems.map((item) => {
          const Icon = iconMap[item.id];
          const isActive = item.id === activeId;

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="icon-lg"
              nativeButton={false}
              render={
                <Link
                  href={item.href}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                />
              }
              className={cn(
                "size-11 rounded-xl",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  : "text-primary hover:bg-accent"
              )}
            >
              {Icon && <Icon className="size-5" />}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
