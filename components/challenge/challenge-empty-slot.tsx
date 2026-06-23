import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChallengeEmptySlotProps = {
  slotNumber: number;
  onAdd: () => void;
  className?: string;
};

export function ChallengeEmptySlot({
  slotNumber,
  onAdd,
  className,
}: ChallengeEmptySlotProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-44 flex-col rounded-2xl border border-dashed border-primary/40 bg-card/50 p-3",
        className
      )}
    >
      <span className="text-xs font-medium text-muted-foreground tabular-nums">
        {String(slotNumber).padStart(2, "0")}
      </span>

      <div className="flex flex-1 items-center justify-center">
        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          onClick={onAdd}
          aria-label={`Add book to slot ${slotNumber}`}
          className="size-12 rounded-full text-primary hover:bg-accent"
        >
          <Plus className="size-6" />
        </Button>
      </div>
    </div>
  );
}
