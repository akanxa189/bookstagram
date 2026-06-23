import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MONTHS } from "@/lib/tracker";

type MonthSelectorProps = {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
};

export function MonthSelector({
  selectedMonth,
  onMonthChange,
}: MonthSelectorProps) {
  return (
    <div className="mb-8 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
      {MONTHS.map((month, index) => {
        const isActive = index === selectedMonth;

        return (
          <Button
            key={month}
            type="button"
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onMonthChange(index)}
            className={cn(
              "shrink-0 rounded-full px-4",
              !isActive && "border-border bg-card text-foreground hover:bg-accent"
            )}
          >
            {month}
          </Button>
        );
      })}
    </div>
  );
}
