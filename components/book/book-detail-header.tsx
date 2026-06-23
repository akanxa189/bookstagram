import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BookDetail } from "@/lib/mock-data";

type BookDetailHeaderProps = {
  book: Pick<BookDetail, "title" | "author" | "year" | "genres" | "coverUrl">;
};

export function BookDetailHeader({ book }: BookDetailHeaderProps) {
  return (
    <header className="mb-8">
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href="/challenge" />}
        className="mb-6 -ml-2 gap-2 text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to my books
      </Button>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="relative size-36 shrink-0 self-center overflow-hidden rounded-2xl bg-secondary sm:self-start sm:size-40">
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
              {book.author} · {book.year}
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
