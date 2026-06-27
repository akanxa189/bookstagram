"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { WishlistBuyLinks } from "@/components/wishlist/wishlist-buy-links";
import { WishlistDetailHeader } from "@/components/wishlist/wishlist-detail-header";
import { Button } from "@/components/ui/button";
import { getWishlistBookById } from "@/lib/wishlist";
import type { WishlistBook } from "@/lib/wishlist";

type WishlistDetailPageClientProps = {
  id: string;
};

export function WishlistDetailPageClient({ id }: WishlistDetailPageClientProps) {
  const [book, setBook] = useState<WishlistBook | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setBook(getWishlistBookById(id) ?? null);
    setIsHydrated(true);
  }, [id]);

  if (!isHydrated) {
    return null;
  }

  if (!book) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-muted-foreground">Book not found on your wishlist.</p>
        <Button variant="outline" nativeButton={false} render={<Link href="/wishlist" />}>
          Back to wishlist
        </Button>
      </div>
    );
  }

  return (
    <>
      <WishlistDetailHeader book={book} />

      {book.description && (
        <section className="mb-10">
          <p className="mb-3 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            About this book
          </p>
          <p className="leading-relaxed text-foreground">{book.description}</p>
        </section>
      )}

      <WishlistBuyLinks links={book.buyLinks} />
    </>
  );
}
