import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

import { StarRating } from "@/components/common/star-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { WishlistBook } from "@/lib/wishlist";

type WishlistDetailHeaderProps = {
  book: WishlistBook;
};

export function WishlistDetailHeader({ book }: WishlistDetailHeaderProps) {
  return (
    <header className="mb-8">
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href="/wishlist" />}
        className="mb-6 -ml-2 gap-2 text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to wishlist
      </Button>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="relative size-36 shrink-0 self-center overflow-hidden rounded-2xl bg-secondary sm:self-start sm:size-44">
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={book.title}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <BookOpen className="size-14 text-primary/60" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-4 text-center sm:text-left">
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {book.title}
            </h1>
            <p className="text-muted-foreground">
              {book.author}
              {book.year ? ` · ${book.year}` : ""}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 sm:items-start">
            <StarRating rating={book.rating} className="gap-1" />
            <p className="text-sm text-muted-foreground">
              {book.rating} out of 5 average rating
            </p>
          </div>

          {book.genres.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {book.genres.map((genre) => (
                <Badge key={genre} variant="outline" className="rounded-full">
                  {genre}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
