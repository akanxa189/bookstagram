"use client";

import { useState } from "react";

import { DialogActions } from "@/components/common/dialog-actions";
import { FormField } from "@/components/common/form-field";
import { StarRatingInput } from "@/components/common/star-rating-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getReadStatus, type BookDetail, type ReadStatus } from "@/lib/mock-data";

type OwnershipInfo = Pick<BookDetail, "readStatus" | "purchasedAt" | "rating">;

type BookOwnershipSectionProps = {
  book: BookDetail;
  onOwnershipChange: (info: OwnershipInfo) => void;
};

export function BookOwnershipSection({
  book,
  onOwnershipChange,
}: BookOwnershipSectionProps) {
  const currentStatus = getReadStatus(book);
  const [open, setOpen] = useState(false);
  const [readStatus, setReadStatus] = useState<ReadStatus>(currentStatus);
  const [purchasedAt, setPurchasedAt] = useState(book.purchasedAt ?? "");
  const [rating, setRating] = useState(book.rating || 1);

  const hasInfo = Boolean(book.purchasedAt || book.readStatus);

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setReadStatus(getReadStatus(book));
      setPurchasedAt(book.purchasedAt ?? "");
      setRating(book.rating || 1);
    }
    setOpen(nextOpen);
  }

  function handleSave() {
    onOwnershipChange({
      readStatus,
      purchasedAt: purchasedAt.trim() || undefined,
      rating: readStatus === "read" ? rating : 0,
    });
    setOpen(false);
  }

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Ownership
        </p>

        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger
            render={
              <Button variant="outline" size="sm" className="rounded-xl" />
            }
          >
            {hasInfo ? "Edit" : "Add info"}
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Book ownership details</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <FormField label="Reading status">
                <div className="flex gap-2">
                  {(["unread", "read"] as const).map((status) => (
                    <Button
                      key={status}
                      type="button"
                      variant={readStatus === status ? "default" : "outline"}
                      className="flex-1 rounded-xl capitalize"
                      onClick={() => setReadStatus(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </FormField>

              <FormField label="Purchased on" htmlFor="book-purchased">
                <Input
                  id="book-purchased"
                  value={purchasedAt}
                  onChange={(event) => setPurchasedAt(event.target.value)}
                  placeholder="e.g. 15 Mar 2024"
                />
              </FormField>

              {readStatus === "read" && (
                <FormField label="Rating">
                  <StarRatingInput rating={rating} onChange={setRating} />
                </FormField>
              )}
            </div>

            <DialogActions
              onCancel={() => setOpen(false)}
              onConfirm={handleSave}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant={currentStatus === "read" ? "default" : "secondary"}
            className="rounded-full capitalize"
          >
            {currentStatus}
          </Badge>

          {book.purchasedAt && (
            <p className="text-sm text-muted-foreground">
              Purchased on{" "}
              <span className="text-foreground">{book.purchasedAt}</span>
            </p>
          )}
        </div>

        {!hasInfo && currentStatus === "unread" && (
          <p className="mt-3 text-sm text-muted-foreground">
            Mark this book as read or add when you purchased it.
          </p>
        )}
      </div>
    </section>
  );
}
