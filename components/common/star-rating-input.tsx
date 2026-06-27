import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StarRatingInputProps = {
  rating: number;
  max?: number;
  onChange: (rating: number) => void;
  className?: string;
};

export function StarRatingInput({
  rating,
  max = 5,
  onChange,
  className,
}: StarRatingInputProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }, (_, index) => {
        const value = index + 1;
        const filled = value <= rating;

        return (
          <Button
            key={value}
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => onChange(value)}
            aria-label={`Rate ${value} out of ${max}`}
            className="rounded-sm hover:scale-110"
          >
            <Star
              className={cn(
                "size-5",
                filled
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted"
              )}
            />
          </Button>
        );
      })}
    </div>
  );
}
