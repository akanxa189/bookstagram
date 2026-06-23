"use client";

import { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  getTrackerCellClassName,
  getTrackerSwatchClassName,
  TRACKER_LEVELS,
  type TrackerLevel,
} from "@/lib/tracker";
import { cn } from "@/lib/utils";

type TrackerKeyPickerProps = {
  level: TrackerLevel;
  onSelect: (level: TrackerLevel) => void;
};

export function TrackerKeyPicker({ level, onSelect }: TrackerKeyPickerProps) {
  const [open, setOpen] = useState(false);

  function handleSelect(nextLevel: TrackerLevel) {
    onSelect(nextLevel);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            aria-label="Set reading level for this day"
            className={cn(
              "size-6 rounded-sm transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              getTrackerCellClassName(level)
            )}
          />
        }
      />
      <PopoverContent align="start" className="w-56 p-2">
        <p className="mb-2 px-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Select level
        </p>
        <ul className="space-y-1">
          {TRACKER_LEVELS.map((item) => (
            <li key={item.level}>
              <button
                type="button"
                onClick={() => handleSelect(item.level as TrackerLevel)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-accent",
                  level === item.level && "bg-accent"
                )}
              >
                <span
                  className={cn(
                    "size-4 shrink-0 rounded-sm",
                    getTrackerSwatchClassName(item.level as TrackerLevel)
                  )}
                />
                <span className="text-foreground">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

type TrackerCellProps = {
  level: TrackerLevel;
  onLevelChange: (level: TrackerLevel) => void;
};

export function TrackerCell({ level, onLevelChange }: TrackerCellProps) {
  return <TrackerKeyPicker level={level} onSelect={onLevelChange} />;
}
