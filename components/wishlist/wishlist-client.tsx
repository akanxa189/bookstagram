"use client";

import { useEffect, useState } from "react";

import { AddWishlistBookDialog } from "@/components/wishlist/add-wishlist-book-dialog";
import { WishlistBookCard } from "@/components/wishlist/wishlist-book-card";
import { WishlistHeader } from "@/components/wishlist/wishlist-header";
import { Button } from "@/components/ui/button";
import { loadWishlistBooks, type WishlistBook } from "@/lib/wishlist";

export function WishlistClient() {
  const [books, setBooks] = useState<WishlistBook[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  function refreshBooks() {
    setBooks(loadWishlistBooks());
  }

  useEffect(() => {
    refreshBooks();
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <WishlistHeader
        bookCount={books.length}
        onAddBook={() => setDialogOpen(true)}
      />

      {books.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <WishlistBookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center">
          <p className="max-w-sm text-muted-foreground">
            Save books you want to read. Search by title or upload a poster —
            we&apos;ll fetch the details for you.
          </p>
          <Button onClick={() => setDialogOpen(true)} className="rounded-xl">
            Add your first book
          </Button>
        </div>
      )}

      <AddWishlistBookDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={refreshBooks}
      />
    </>
  );
}
