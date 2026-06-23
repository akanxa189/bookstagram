import {
  getTrackerSwatchClassName,
  TRACKER_LEVELS,
  type TrackerLevel,
} from "@/lib/tracker";
import { cn } from "@/lib/utils";

type TrackerKeysProps = {
  className?: string;
};

export function TrackerKeys({ className }: TrackerKeysProps) {
  return (
    <aside className={cn("space-y-3", className)}>
      <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        Keys
      </p>

      <ul className="space-y-2">
        {TRACKER_LEVELS.map((item) => (
          <li key={item.level} className="flex items-center gap-3">
            <span
              className={cn(
                "size-4 shrink-0 rounded-sm",
                getTrackerSwatchClassName(item.level as TrackerLevel)
              )}
            />
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
