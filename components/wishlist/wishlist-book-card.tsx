import Link from "next/link";
import { BookOpen } from "lucide-react";

import { StarRating } from "@/components/common/star-rating";
import { Card, CardContent } from "@/components/ui/card";
import type { WishlistBook } from "@/lib/wishlist";
import { cn } from "@/lib/utils";

type WishlistBookCardProps = {
  book: WishlistBook;
  className?: string;
};

export function WishlistBookCard({ book, className }: WishlistBookCardProps) {
  return (
    <Link href={`/wishlist/${book.id}`} className="block">
      <Card
        className={cn(
          "h-full py-0 transition-colors hover:border-primary/40",
          className
        )}
      >
        <CardContent className="flex h-full flex-col gap-3 p-4">
          <div className="aspect-3/4 w-full overflow-hidden rounded-xl bg-secondary">
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

          <div className="space-y-1">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
              {book.title}
            </h3>
            <p className="truncate text-xs text-muted-foreground">{book.author}</p>
            <StarRating rating={book.rating} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
