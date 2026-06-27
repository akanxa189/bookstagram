import Link from "next/link";
import { BookOpen } from "lucide-react";

import { StarRating } from "@/components/common/star-rating";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getReadStatus, type BookDetail } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type LibraryBookCardProps = {
  book: BookDetail;
  className?: string;
};

export function LibraryBookCard({ book, className }: LibraryBookCardProps) {
  const readStatus = getReadStatus(book);

  return (
    <Link href={`/books/${book.id}`} className="block">
      <Card
        className={cn(
          "h-full py-0 transition-colors hover:border-primary/40",
          className
        )}
      >
        <CardContent className="flex h-full flex-col gap-3 p-4">
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
            <Badge
              variant={readStatus === "read" ? "default" : "secondary"}
              className="absolute top-2 right-2 rounded-full capitalize"
            >
              {readStatus}
            </Badge>
          </div>

          <div className="space-y-1">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
              {book.title}
            </h3>
            <p className="truncate text-xs text-muted-foreground">{book.author}</p>
            {readStatus === "read" && book.rating > 0 && (
              <StarRating rating={book.rating} />
            )}
            {book.purchasedAt && (
              <p className="text-xs text-muted-foreground">
                Purchased {book.purchasedAt}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
