import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating: number;
  max?: number;
  className?: string;
};

export function StarRating({ rating, max = 5, className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }, (_, index) => {
        const filled = index < rating;

        return (
          <Star
            key={index}
            className={cn(
              "size-3.5",
              filled
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            )}
          />
        );
      })}
    </div>
  );
}
