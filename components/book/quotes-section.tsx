"use client";

import { useState } from "react";

import { QuoteItem } from "@/components/book/quote-item";
import { DialogActions } from "@/components/common/dialog-actions";
import { FormField } from "@/components/common/form-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BookQuote } from "@/lib/mock-data";

type QuotesSectionProps = {
  quotes: BookQuote[];
  onQuotesChange: (quotes: BookQuote[]) => void;
};

export function QuotesSection({ quotes, onQuotesChange }: QuotesSectionProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [page, setPage] = useState("");

  function handleSave() {
    if (!text.trim() || !page.trim()) return;

    const pageNumber = Number(page);
    if (Number.isNaN(pageNumber) || pageNumber <= 0) return;

    onQuotesChange([
      ...quotes,
      {
        id: `q-${Date.now()}`,
        text: text.trim(),
        page: pageNumber,
      },
    ]);

    setText("");
    setPage("");
    setOpen(false);
  }

  return (
    <section>
      <p className="mb-4 text-xs font-medium tracking-widest text-muted-foreground uppercase">
        Favourite quotes
      </p>

      {quotes.length > 0 ? (
        <div className="mb-6 space-y-6">
          {quotes.map((quote) => (
            <QuoteItem key={quote.id} quote={quote} />
          ))}
        </div>
      ) : (
        <p className="mb-6 text-sm text-muted-foreground">
          No favourite quotes yet.
        </p>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={<Button variant="outline" className="rounded-xl" />}
        >
          Add quote
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add a favourite quote</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <FormField label="Quote" htmlFor="quote-text">
              <Textarea
                id="quote-text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Enter the quote..."
                className="min-h-24 rounded-xl"
              />
            </FormField>

            <FormField label="Page number" htmlFor="quote-page">
              <Input
                id="quote-page"
                type="number"
                min={1}
                value={page}
                onChange={(event) => setPage(event.target.value)}
                placeholder="e.g. 27"
              />
            </FormField>
          </div>

          <DialogActions
            onCancel={() => setOpen(false)}
            onConfirm={handleSave}
            confirmLabel="Save quote"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
