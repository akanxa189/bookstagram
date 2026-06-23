import Link from "next/link";
import { BookOpen } from "lucide-react";

import { StarRating } from "@/components/common/star-rating";
import { Card, CardContent } from "@/components/ui/card";
import type { BookDetail } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type ChallengeFilledSlotProps = {
  slotNumber: number;
  book: BookDetail;
  className?: string;
};

export function ChallengeFilledSlot({
  slotNumber,
  book,
  className,
}: ChallengeFilledSlotProps) {
  return (
    <Link href={`/books/${book.id}`} className={cn("block", className)}>
      <Card className="h-full border-border py-0 transition-colors hover:border-primary/40">
        <CardContent className="flex h-full flex-col gap-3 p-3">
          <span className="text-xs font-medium text-muted-foreground tabular-nums">
            {String(slotNumber).padStart(2, "0")}
          </span>

          <div className="relative flex flex-1 items-center justify-center">
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-secondary">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <BookOpen className="size-10 text-primary/60" />
                </div>
              )}
            </div>
          </div>

          <StarRating rating={book.rating} className="justify-center" />
        </CardContent>
      </Card>
    </Link>
  );
}
