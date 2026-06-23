"use client";

import { useState } from "react";

import { StarRatingInput } from "@/components/common/star-rating-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
          <div className="space-y-2">
            <Label htmlFor="book-title">Title</Label>
            <Input
              id="book-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Book title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="book-author">Author</Label>
            <Input
              id="book-author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="Author name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="book-year">Year</Label>
            <Input
              id="book-year"
              type="number"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              placeholder="Publication year"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="book-cover">Cover image</Label>
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
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <StarRatingInput rating={rating} onChange={setRating} />
          </div>
        </div>

        <DialogFooter className="mt-2 border-0 bg-transparent p-0 sm:justify-end">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim() || !author.trim()}>
            Save book
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
