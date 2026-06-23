import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  CHALLENGE_GOALS,
  getCompletedCount,
  type ChallengeGoal,
} from "@/lib/challenge";

type ChallengeHeaderProps = {
  goal: ChallengeGoal;
  slots: (string | null)[];
  onGoalChange: (goal: ChallengeGoal) => void;
};

export function ChallengeHeader({
  goal,
  slots,
  onGoalChange,
}: ChallengeHeaderProps) {
  const completed = getCompletedCount(slots);
  const progressValue = Math.min(100, Math.round((completed / goal) * 100));

  return (
    <header className="mb-8">
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Reading Challenge
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Track your yearly reading goal
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {CHALLENGE_GOALS.map((option) => (
          <Button
            key={option}
            type="button"
            variant={option === goal ? "default" : "outline"}
            size="sm"
            onClick={() => onGoalChange(option)}
            className={cn(
              "rounded-full px-4",
              option !== goal && "border-border bg-card text-foreground hover:bg-accent"
            )}
          >
            {option}
          </Button>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-sm text-muted-foreground">
          {completed} of {goal} books completed
        </p>
        <Progress value={progressValue} className="gap-0" />
      </div>
    </header>
  );
}
