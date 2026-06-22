import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  icon: LucideIcon;
  className?: string;
};

export function SectionHeader({ title, icon: Icon, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-4 flex items-center gap-2", className)}>
      <Icon className="size-4 text-primary" />
      <h2 className="font-serif text-lg font-semibold text-foreground">{title}</h2>
    </div>
  );
}
