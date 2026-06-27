"use client";

import { useState } from "react";

import { DialogActions } from "@/components/common/dialog-actions";
import { FormField } from "@/components/common/form-field";
import { StarRatingInput } from "@/components/common/star-rating-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createBook, type CreateBookInput } from "@/lib/books-store";
import { resizeCoverImage } from "@/lib/image-utils";

type AddBookDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (bookId: string) => void;
};

export function AddBookDialog({
  open,
  onOpenChange,
  onSave,
}: AddBookDialogProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [rating, setRating] = useState(5);
  const [coverUrl, setCoverUrl] = useState<string>();
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  function resetForm() {
    setTitle("");
    setAuthor("");
    setYear(String(new Date().getFullYear()));
    setRating(5);
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
    if (!title.trim() || !author.trim() || rating < 1) {
      return;
    }

    const parsedYear = Number(year) || new Date().getFullYear();
    const input: CreateBookInput = {
      title: title.trim(),
      author: author.trim(),
      year: parsedYear,
      rating,
      coverUrl,
    };

    const book = createBook(input);
    onSave(book.id);
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add finished book</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <FormField label="Title" htmlFor="book-title">
            <Input
              id="book-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Book title"
            />
          </FormField>

          <FormField label="Author" htmlFor="book-author">
            <Input
              id="book-author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="Author name"
            />
          </FormField>

          <FormField label="Year" htmlFor="book-year">
            <Input
              id="book-year"
              type="number"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              placeholder="Publication year"
            />
          </FormField>

          <FormField label="Cover image" htmlFor="book-cover">
            <Input
              id="book-cover"
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

          <FormField label="Rating">
            <StarRatingInput rating={rating} onChange={setRating} />
          </FormField>
        </div>

        <DialogActions
          onCancel={() => handleOpenChange(false)}
          onConfirm={handleSave}
          confirmLabel="Save book"
          confirmDisabled={!title.trim() || !author.trim()}
        />
      </DialogContent>
    </Dialog>
  );
}
