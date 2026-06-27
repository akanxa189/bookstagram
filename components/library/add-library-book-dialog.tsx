"use client";

import { useState } from "react";

import { DialogActions } from "@/components/common/dialog-actions";
import { FormField } from "@/components/common/form-field";
import { StarRatingInput } from "@/components/common/star-rating-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createLibraryBook } from "@/lib/books-store";
import { resizeCoverImage } from "@/lib/image-utils";
import type { ReadStatus } from "@/lib/mock-data";

type AddLibraryBookDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (bookId: string) => void;
};

export function AddLibraryBookDialog({
  open,
  onOpenChange,
  onSave,
}: AddLibraryBookDialogProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [readStatus, setReadStatus] = useState<ReadStatus>("unread");
  const [purchasedAt, setPurchasedAt] = useState("");
  const [rating, setRating] = useState(0);
  const [coverUrl, setCoverUrl] = useState<string>();
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  function resetForm() {
    setTitle("");
    setAuthor("");
    setYear(String(new Date().getFullYear()));
    setReadStatus("unread");
    setPurchasedAt("");
    setRating(0);
    setCoverUrl(undefined);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  }

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsProcessingImage(true);

    try {
      const resized = await resizeCoverImage(file);
      setCoverUrl(resized);
    } finally {
      setIsProcessingImage(false);
    }
  }

  function handleSave() {
    if (!title.trim() || !author.trim()) {
      return;
    }

    const parsedYear = Number(year) || new Date().getFullYear();
    const book = createLibraryBook({
      title: title.trim(),
      author: author.trim(),
      year: parsedYear,
      readStatus,
      purchasedAt: purchasedAt.trim() || undefined,
      rating: readStatus === "read" ? rating || undefined : 0,
      coverUrl,
    });

    onSave(book.id);
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add book to library</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <FormField label="Title" htmlFor="library-book-title">
            <Input
              id="library-book-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Book title"
            />
          </FormField>

          <FormField label="Author" htmlFor="library-book-author">
            <Input
              id="library-book-author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="Author name"
            />
          </FormField>

          <FormField label="Publication year" htmlFor="library-book-year">
            <Input
              id="library-book-year"
              type="number"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              placeholder="Publication year"
            />
          </FormField>

          <FormField label="Status">
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

          <FormField label="Purchased on" htmlFor="library-book-purchased">
            <Input
              id="library-book-purchased"
              value={purchasedAt}
              onChange={(event) => setPurchasedAt(event.target.value)}
              placeholder="e.g. 15 Mar 2024"
            />
          </FormField>

          {readStatus === "read" && (
            <FormField label="Rating">
              <StarRatingInput
                rating={rating || 1}
                onChange={setRating}
              />
            </FormField>
          )}

          <FormField label="Cover image" htmlFor="library-book-cover">
            <Input
              id="library-book-cover"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isProcessingImage}
            />
            {coverUrl && (
              <div className="relative aspect-3/4 w-32 overflow-hidden rounded-xl border border-border">
                <img
                  src={coverUrl}
                  alt="Cover preview"
                  className="size-full object-cover"
                />
              </div>
            )}
          </FormField>
        </div>

        <DialogActions
          onCancel={() => handleOpenChange(false)}
          onConfirm={handleSave}
          confirmLabel="Add to library"
          confirmDisabled={!title.trim() || !author.trim()}
        />
      </DialogContent>
    </Dialog>
  );
}
