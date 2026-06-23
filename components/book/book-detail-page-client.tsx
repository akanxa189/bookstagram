"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { BookDetailClient } from "@/components/book/book-detail-client";
import { Button } from "@/components/ui/button";
import { getBookById } from "@/lib/books-store";
import type { BookDetail } from "@/lib/mock-data";

type BookDetailPageClientProps = {
  id: string;
};

export function BookDetailPageClient({ id }: BookDetailPageClientProps) {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setBook(getBookById(id) ?? null);
    setIsHydrated(true);
  }, [id]);

  if (!isHydrated) {
    return null;
  }

  if (!book) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-muted-foreground">Book not found.</p>
        <Button variant="outline" nativeButton={false} render={<Link href="/challenge" />}>
          Back to challenge
        </Button>
      </div>
    );
  }

  return <BookDetailClient book={book} />;
}
