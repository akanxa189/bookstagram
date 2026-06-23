"use client";

import { useEffect, useState } from "react";

import { AddBookDialog } from "@/components/challenge/add-book-dialog";
import { ChallengeGoalPicker } from "@/components/challenge/challenge-goal-picker";
import { ChallengeGrid } from "@/components/challenge/challenge-grid";
import { ChallengeHeader } from "@/components/challenge/challenge-header";
import {
  assignBookToSlot,
  createInitialChallengeState,
  loadChallengeState,
  saveChallengeState,
  seedChallengeState,
  setGoal,
  type ChallengeGoal,
  type ChallengeState,
} from "@/lib/challenge";

export function ReadingChallengeClient() {
  const [challenge, setChallenge] = useState<ChallengeState>(seedChallengeState);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setChallenge(loadChallengeState());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    saveChallengeState(challenge);
  }, [challenge, isHydrated]);

  function handleGoalSelect(goal: ChallengeGoal) {
    setChallenge(createInitialChallengeState(goal));
  }

  function handleGoalChange(goal: ChallengeGoal) {
    setChallenge((current) => setGoal(current, goal));
  }

  function handleAddToSlot(slotIndex: number) {
    setActiveSlotIndex(slotIndex);
    setDialogOpen(true);
  }

  function handleBookSaved(bookId: string) {
    if (activeSlotIndex === null) {
      return;
    }

    setChallenge((current) => assignBookToSlot(current, activeSlotIndex, bookId));
    setActiveSlotIndex(null);
    setDialogOpen(false);
  }

  if (!isHydrated) {
    return null;
  }

  if (!challenge.goal) {
    return <ChallengeGoalPicker onSelect={handleGoalSelect} />;
  }

  return (
    <>
      <ChallengeHeader
        goal={challenge.goal}
        slots={challenge.slots}
        onGoalChange={handleGoalChange}
      />
      <ChallengeGrid challenge={challenge} onAddToSlot={handleAddToSlot} />
      <AddBookDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleBookSaved}
      />
    </>
  );
}
