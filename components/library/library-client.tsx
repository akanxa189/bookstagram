"use client";

import { useEffect, useState } from "react";

import { AddLibraryBookDialog } from "@/components/library/add-library-book-dialog";
import { LibraryBookCard } from "@/components/library/library-book-card";
import { LibraryHeader } from "@/components/library/library-header";
import { Button } from "@/components/ui/button";
import { getLibraryBooks } from "@/lib/books-store";
import type { BookDetail } from "@/lib/mock-data";

export function LibraryClient() {
  const [books, setBooks] = useState<BookDetail[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  function refreshBooks() {
    setBooks(getLibraryBooks());
  }

  useEffect(() => {
    refreshBooks();
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    function handleStorage() {
      refreshBooks();
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function handleBookSaved() {
    refreshBooks();
    setDialogOpen(false);
  }

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <LibraryHeader
        bookCount={books.length}
        onAddBook={() => setDialogOpen(true)}
      />

      {books.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <LibraryBookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center">
          <p className="max-w-sm text-muted-foreground">
            Your library is empty. Add the books you own to track what you&apos;ve
            read and when you got them.
          </p>
          <Button onClick={() => setDialogOpen(true)} className="rounded-xl">
            Add your first book
          </Button>
        </div>
      )}

      <AddLibraryBookDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleBookSaved}
      />
    </>
  );
}
