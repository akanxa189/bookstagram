"use client";

import { TrackerCell } from "@/components/tracker/tracker-cell";
import type { TrackerLevel, TrackerMonthData } from "@/lib/tracker";

type TrackerDayRowProps = {
  day: number;
  level: TrackerLevel;
  onLevelChange: (day: number, level: TrackerLevel) => void;
};

export function TrackerDayRow({ day, level, onLevelChange }: TrackerDayRowProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-8 shrink-0 text-sm tabular-nums text-muted-foreground">
        {String(day).padStart(2, "0")}
      </span>
      <TrackerCell
        level={level}
        onLevelChange={(nextLevel) => onLevelChange(day, nextLevel)}
      />
    </div>
  );
}

type TrackerGridProps = {
  daysInMonth: number;
  monthData: TrackerMonthData;
  onLevelChange: (day: number, level: TrackerLevel) => void;
};

export function TrackerGrid({
  daysInMonth,
  monthData,
  onLevelChange,
}: TrackerGridProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 1;

        return (
          <TrackerDayRow
            key={day}
            day={day}
            level={monthData[day] ?? 0}
            onLevelChange={onLevelChange}
          />
        );
      })}
    </div>
  );
}
