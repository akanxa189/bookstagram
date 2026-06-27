"use client";

import { useCallback, useEffect, useState } from "react";

import { BookDetailHeader } from "@/components/book/book-detail-header";
import { BookOwnershipSection } from "@/components/book/book-ownership-section";
import { BookRatingSection } from "@/components/book/book-rating-section";
import { QuotesSection } from "@/components/book/quotes-section";
import { ReadingInfoSection } from "@/components/book/reading-info-section";
import { getReadStatus, saveBook } from "@/lib/books-store";
import type { BookDetail, BookQuote } from "@/lib/mock-data";

type BookDetailClientProps = {
  book: BookDetail;
};

export function BookDetailClient({ book: initialBook }: BookDetailClientProps) {
  const [book, setBook] = useState(initialBook);

  const persistBook = useCallback((nextBook: BookDetail) => {
    setBook(nextBook);
    saveBook(nextBook);
  }, []);

  useEffect(() => {
    setBook(initialBook);
  }, [initialBook]);

  const readStatus = getReadStatus(book);

  return (
    <>
      <BookDetailHeader book={book} />
      <BookOwnershipSection
        book={book}
        onOwnershipChange={(info) => {
          persistBook({ ...book, ...info });
        }}
      />
      {readStatus === "read" && book.rating > 0 && (
        <BookRatingSection rating={book.rating} />
      )}
      <ReadingInfoSection
        readingInfo={{
          startedReading: book.startedReading,
          finishedReading: book.finishedReading,
          thoughts: book.thoughts,
        }}
        onReadingInfoChange={(info) => {
          persistBook({ ...book, ...info });
        }}
      />
      <QuotesSection
        quotes={book.quotes}
        onQuotesChange={(quotes: BookQuote[]) => {
          persistBook({ ...book, quotes });
        }}
      />
    </>
  );
}
