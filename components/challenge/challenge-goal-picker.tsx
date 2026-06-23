import { Button } from "@/components/ui/button";
import { CHALLENGE_GOALS, type ChallengeGoal } from "@/lib/challenge";

type ChallengeGoalPickerProps = {
  onSelect: (goal: ChallengeGoal) => void;
};

export function ChallengeGoalPicker({ onSelect }: ChallengeGoalPickerProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Reading Challenge
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        How many books do you want to read this year?
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {CHALLENGE_GOALS.map((goal) => (
          <Button
            key={goal}
            type="button"
            variant="outline"
            size="lg"
            onClick={() => onSelect(goal)}
            className="min-w-24 rounded-full px-8"
          >
            {goal} books
          </Button>
        ))}
      </div>
    </div>
  );
}
