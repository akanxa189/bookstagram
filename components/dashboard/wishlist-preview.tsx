"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { WishlistBookCard } from "@/components/wishlist/wishlist-book-card";
import { Button } from "@/components/ui/button";
import { loadWishlistBooks, type WishlistBook } from "@/lib/wishlist";

export function WishlistPreview() {
  const [books, setBooks] = useState<WishlistBook[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setBooks(loadWishlistBooks().slice(0, 4));
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-border bg-card/50 p-6">
        <p className="text-sm text-muted-foreground">
          No books on your wishlist yet.
        </p>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/wishlist" />}
          className="rounded-xl"
        >
          Add to wishlist
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {books.map((book) => (
        <WishlistBookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
