"use client";

import { useState } from "react";

import { BookDetailHeader } from "@/components/book/book-detail-header";
import { BookRatingSection } from "@/components/book/book-rating-section";
import { QuotesSection } from "@/components/book/quotes-section";
import { ReadingInfoSection } from "@/components/book/reading-info-section";
import type { BookDetail, BookQuote } from "@/lib/mock-data";

type BookDetailClientProps = {
  book: BookDetail;
};

export function BookDetailClient({ book }: BookDetailClientProps) {
  const [startedReading, setStartedReading] = useState(book.startedReading);
  const [finishedReading, setFinishedReading] = useState(book.finishedReading);
  const [thoughts, setThoughts] = useState(book.thoughts);
  const [quotes, setQuotes] = useState<BookQuote[]>(book.quotes);

  return (
    <>
      <BookDetailHeader book={book} />
      <BookRatingSection rating={book.rating} />
      <ReadingInfoSection
        readingInfo={{ startedReading, finishedReading, thoughts }}
        onReadingInfoChange={(info) => {
          setStartedReading(info.startedReading);
          setFinishedReading(info.finishedReading);
          setThoughts(info.thoughts);
        }}
      />
      <QuotesSection quotes={quotes} onQuotesChange={setQuotes} />
    </>
  );
}
