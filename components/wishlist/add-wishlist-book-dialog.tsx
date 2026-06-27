"use client";

import { Loader2, Search, Upload } from "lucide-react";
import { useState } from "react";

import { FormField } from "@/components/common/form-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { resizeCoverImage } from "@/lib/image-utils";
import {
  addWishlistBook,
  mockFetchBookByTitle,
  mockFetchBookFromPoster,
} from "@/lib/wishlist";
import { cn } from "@/lib/utils";

type AddWishlistBookDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
};

type AddMode = "title" | "poster";

export function AddWishlistBookDialog({
  open,
  onOpenChange,
  onSave,
}: AddWishlistBookDialogProps) {
  const [mode, setMode] = useState<AddMode>("title");
  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function resetForm() {
    setMode("title");
    setTitle("");
    setCoverUrl(undefined);
    setIsLoading(false);
    setIsProcessingImage(false);
    setError(null);
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
    setError(null);

    try {
      const resized = await resizeCoverImage(file);
      setCoverUrl(resized);
    } catch {
      setError("Could not process that image. Try another file.");
    } finally {
      setIsProcessingImage(false);
    }
  }

  async function handleFetchByTitle() {
    if (!title.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const book = await mockFetchBookByTitle(title);
      addWishlistBook(book);
      onSave();
      handleOpenChange(false);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFetchFromPoster() {
    if (!coverUrl) {
      setError("Upload a book poster first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const book = await mockFetchBookFromPoster(coverUrl);
      addWishlistBook(book);
      onSave();
      handleOpenChange(false);
    } catch {
      setError("Could not recognize the poster. Try another image.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to wishlist</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 rounded-xl bg-muted p-1">
          <Button
            type="button"
            variant={mode === "title" ? "default" : "ghost"}
            className="flex-1 rounded-lg"
            onClick={() => setMode("title")}
          >
            <Search className="size-4" />
            By name
          </Button>
          <Button
            type="button"
            variant={mode === "poster" ? "default" : "ghost"}
            className="flex-1 rounded-lg"
            onClick={() => setMode("poster")}
          >
            <Upload className="size-4" />
            By poster
          </Button>
        </div>

        {mode === "title" ? (
          <div className="space-y-4">
            <FormField label="Book name" htmlFor="wishlist-book-title">
              <Input
                id="wishlist-book-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Fourth Wing"
                disabled={isLoading}
              />
            </FormField>
            <p className="text-xs text-muted-foreground">
              AI will search the internet for cover, genre, rating, and buy
              links.
            </p>
            <Button
              type="button"
              className="w-full rounded-xl"
              onClick={handleFetchByTitle}
              disabled={!title.trim() || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Finding book…
                </>
              ) : (
                <>
                  <Search className="size-4" />
                  Find & add book
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <FormField label="Book poster" htmlFor="wishlist-book-poster">
              <Input
                id="wishlist-book-poster"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isProcessingImage || isLoading}
              />
            </FormField>

            {coverUrl && (
              <div className="relative mx-auto aspect-3/4 w-36 overflow-hidden rounded-xl border border-border">
                <img
                  src={coverUrl}
                  alt="Poster preview"
                  className="size-full object-cover"
                />
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              Upload a cover image and AI will identify the book for you.
            </p>

            <Button
              type="button"
              className="w-full rounded-xl"
              onClick={handleFetchFromPoster}
              disabled={!coverUrl || isLoading || isProcessingImage}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Recognizing poster…
                </>
              ) : (
                <>
                  <Upload className="size-4" />
                  Recognize & add book
                </>
              )}
            </Button>
          </div>
        )}

        {error && (
          <p className={cn("text-sm text-destructive")}>{error}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
