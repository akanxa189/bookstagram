import { Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

type WishlistHeaderProps = {
  bookCount: number;
  onAddBook: () => void;
};

export function WishlistHeader({ bookCount, onAddBook }: WishlistHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-1 flex items-center gap-1.5 text-sm text-primary">
          <Sparkles className="size-3.5" />
          Books to read next
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Wishlist
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {bookCount === 0
            ? "Add a book by name or upload a poster — AI will find the details."
            : `${bookCount} book${bookCount === 1 ? "" : "s"} on your wishlist`}
        </p>
      </div>

      <Button onClick={onAddBook} className="rounded-xl">
        <Plus className="size-4" />
        Add to wishlist
      </Button>
    </header>
  );
}
