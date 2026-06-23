export type TrackerLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type TrackerLevelConfig = {
  level: TrackerLevel;
  label: string;
  pages: number;
};

export const TRACKER_LEVELS: TrackerLevelConfig[] = [
  { level: 0, label: "0 pages", pages: 0 },
  { level: 1, label: "1–10", pages: 10 },
  { level: 2, label: "10–20", pages: 20 },
  { level: 3, label: "20–50", pages: 50 },
  { level: 4, label: "50–100", pages: 100 },
  { level: 5, label: "100–150", pages: 150 },
  { level: 6, label: "150–200", pages: 200 },
  { level: 7, label: "200+ / Finished", pages: 200 },
];

export type TrackerMonthData = Record<number, TrackerLevel>;

export type TrackerStore = Record<string, TrackerMonthData>;

export const TRACKER_STORAGE_KEY = "bookstagram-tracker";

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function getMonthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getPagesForLevel(level: TrackerLevel): number {
  return TRACKER_LEVELS.find((item) => item.level === level)?.pages ?? 0;
}

export function isBookFinished(level: TrackerLevel): boolean {
  return level === 7;
}

export function getTrackerLevelConfig(level: TrackerLevel): TrackerLevelConfig {
  return TRACKER_LEVELS[level];
}

export function computeMonthStats(monthData: TrackerMonthData = {}) {
  let pages = 0;
  let booksFinished = 0;

  for (const level of Object.values(monthData)) {
    if (level > 0) {
      pages += getPagesForLevel(level);
    }
    if (isBookFinished(level)) {
      booksFinished += 1;
    }
  }

  return { pages, booksFinished };
}

export const seedTrackerData: TrackerStore = {
  "2026-06": {
    3: 2,
    7: 4,
    12: 1,
    15: 5,
    18: 7,
    22: 3,
  },
};

export function loadTrackerData(): TrackerStore {
  if (typeof window === "undefined") {
    return seedTrackerData;
  }

  try {
    const stored = localStorage.getItem(TRACKER_STORAGE_KEY);
    if (!stored) {
      return seedTrackerData;
    }

    const parsed = JSON.parse(stored) as TrackerStore;
    return { ...seedTrackerData, ...parsed };
  } catch {
    return seedTrackerData;
  }
}

export function saveTrackerData(data: TrackerStore): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(data));
}

const TRACKER_SWATCH_CLASSES: Record<TrackerLevel, string> = {
  0: "border border-border bg-transparent",
  1: "border border-transparent bg-tracker-1",
  2: "border border-transparent bg-tracker-2",
  3: "border border-transparent bg-tracker-3",
  4: "border border-transparent bg-tracker-4",
  5: "border border-transparent bg-tracker-5",
  6: "border border-transparent bg-tracker-6",
  7: "border border-transparent bg-tracker-7",
};

export function getTrackerCellClassName(level: TrackerLevel): string {
  return TRACKER_SWATCH_CLASSES[level];
}

export function getTrackerSwatchClassName(level: TrackerLevel): string {
  return TRACKER_SWATCH_CLASSES[level];
}
