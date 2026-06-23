export type ChallengeGoal = 20 | 50 | 100;

export type ChallengeState = {
  goal: ChallengeGoal | null;
  slots: (string | null)[];
};

export const CHALLENGE_STORAGE_KEY = "bookstagram-challenge";

export const CHALLENGE_GOALS: ChallengeGoal[] = [20, 50, 100];

export const seedChallengeState: ChallengeState = {
  goal: 50,
  slots: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    ...Array.from({ length: 38 }, () => null),
  ],
};

export function loadChallengeState(): ChallengeState {
  if (typeof window === "undefined") {
    return seedChallengeState;
  }

  try {
    const stored = localStorage.getItem(CHALLENGE_STORAGE_KEY);
    if (!stored) {
      return seedChallengeState;
    }

    return JSON.parse(stored) as ChallengeState;
  } catch {
    return seedChallengeState;
  }
}

export function saveChallengeState(state: ChallengeState): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(state));
}

export function getCompletedCount(slots: (string | null)[]): number {
  return slots.filter(Boolean).length;
}

export function getProgressPercent(
  slots: (string | null)[],
  goal: ChallengeGoal | null
): number {
  if (!goal) {
    return 0;
  }

  return Math.round((getCompletedCount(slots) / goal) * 100);
}

export function setGoal(
  state: ChallengeState,
  goal: ChallengeGoal
): ChallengeState {
  const filled = state.slots.filter((slot): slot is string => Boolean(slot));
  const slotCount = Math.max(goal, filled.length);
  const nextSlots = Array.from({ length: slotCount }, (_, index) => {
    return filled[index] ?? null;
  });

  return {
    goal,
    slots: nextSlots,
  };
}

export function assignBookToSlot(
  state: ChallengeState,
  slotIndex: number,
  bookId: string
): ChallengeState {
  const nextSlots = [...state.slots];
  nextSlots[slotIndex] = bookId;

  return {
    ...state,
    slots: nextSlots,
  };
}

export function createInitialChallengeState(goal: ChallengeGoal): ChallengeState {
  return {
    goal,
    slots: Array.from({ length: goal }, () => null),
  };
}
