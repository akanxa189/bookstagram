"use client";

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

type MobileNavProps = {
  activeId?: string;
};

export function MobileNav({ activeId = "home" }: MobileNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-sidebar-border bg-sidebar px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around">
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
                "size-11 min-h-11 min-w-11 rounded-xl",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  : "text-primary hover:bg-accent"
              )}
            >
              {Icon && <Icon className="size-5" />}
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
