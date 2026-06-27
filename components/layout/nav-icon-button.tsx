"use client";

import {
  Calendar,
  Heart,
  Home,
  Library,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  bookshelf: Library,
  wishlist: Heart,
  trophy: Trophy,
  calendar: Calendar,
};

type NavIconButtonProps = {
  id: string;
  href: string;
  label: string;
  isActive: boolean;
  tooltipSide?: "top" | "right";
  className?: string;
};

export function NavIconButton({
  id,
  href,
  label,
  isActive,
  tooltipSide = "right",
  className,
}: NavIconButtonProps) {
  const Icon = iconMap[id];

  if (!Icon) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            nativeButton={false}
            render={
              <Link
                href={href}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
              />
            }
            className={cn(
              "size-11 rounded-xl",
              isActive
                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                : "text-primary hover:bg-accent",
              className
            )}
          >
            <Icon className="size-5" />
          </Button>
        }
      />
      <TooltipContent side={tooltipSide}>{label}</TooltipContent>
    </Tooltip>
  );
}
