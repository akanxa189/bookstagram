import { Star } from "lucide-react";

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
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            aria-label={`Rate ${value} out of ${max}`}
            className="rounded-sm transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Star
              className={cn(
                "size-5",
                filled
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
