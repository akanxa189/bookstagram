"use client";

import { useEffect, useMemo, useState } from "react";

import { MonthSelector } from "@/components/tracker/month-selector";
import { TrackerGrid } from "@/components/tracker/tracker-grid";
import { TrackerHeader } from "@/components/tracker/tracker-header";
import { TrackerKeys } from "@/components/tracker/tracker-keys";
import { TrackerSummary } from "@/components/tracker/tracker-summary";
import {
  computeMonthStats,
  getDaysInMonth,
  getMonthKey,
  loadTrackerData,
  saveTrackerData,
  seedTrackerData,
  type TrackerLevel,
  type TrackerStore,
} from "@/lib/tracker";

export function ReadingTrackerClient() {
  const now = new Date();
  const [year] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [trackerData, setTrackerData] = useState<TrackerStore>(seedTrackerData);

  useEffect(() => {
    setTrackerData(loadTrackerData());
  }, []);

  useEffect(() => {
    saveTrackerData(trackerData);
  }, [trackerData]);

  const monthKey = getMonthKey(year, selectedMonth);
  const monthData = trackerData[monthKey] ?? {};
  const daysInMonth = getDaysInMonth(year, selectedMonth);

  const { pages, booksFinished } = useMemo(
    () => computeMonthStats(monthData),
    [monthData]
  );

  function handleLevelChange(day: number, level: TrackerLevel) {
    setTrackerData((current) => {
      const currentMonth = current[monthKey] ?? {};
      const nextMonth = { ...currentMonth, [day]: level };

      if (level === 0) {
        delete nextMonth[day];
      }

      return {
        ...current,
        [monthKey]: nextMonth,
      };
    });
  }

  return (
    <>
      <TrackerHeader />
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />

      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1 md:max-w-md">
          <TrackerGrid
            daysInMonth={daysInMonth}
            monthData={monthData}
            onLevelChange={handleLevelChange}
          />
        </div>

        <TrackerKeys className="md:w-48 md:shrink-0" />
      </div>

      <TrackerSummary pages={pages} booksFinished={booksFinished} />
    </>
  );
}
