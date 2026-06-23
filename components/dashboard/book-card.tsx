import Link from "next/link";
import { BookOpen } from "lucide-react";

import { StarRating } from "@/components/common/star-rating";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type BookCardProps = {
  id: string;
  title: string;
  author: string;
  rating: number;
  className?: string;
};

export function BookCard({
  id,
  title,
  author,
  rating,
  className,
}: BookCardProps) {
  return (
    <Link href={`/books/${id}`} className="block">
      <Card
        className={cn(
          "min-w-[140px] py-0 transition-colors hover:border-primary/40 sm:min-w-0",
          className
        )}
      >
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex aspect-[3/4] w-full items-center justify-center rounded-xl bg-secondary">
            <BookOpen className="size-10 text-primary/60" />
          </div>

          <div className="space-y-1">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
              {title}
            </h3>
            <p className="truncate text-xs text-muted-foreground">{author}</p>
            <StarRating rating={rating} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
