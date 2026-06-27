import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type LibraryHeaderProps = {
  bookCount: number;
  onAddBook: () => void;
};

export function LibraryHeader({ bookCount, onAddBook }: LibraryHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-1 text-sm text-primary">Your collection</p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Library
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {bookCount === 0
            ? "Add books you own to keep track of your collection."
            : `${bookCount} book${bookCount === 1 ? "" : "s"} in your library`}
        </p>
      </div>

      <Button onClick={onAddBook} className="rounded-xl">
        <Plus className="size-4" />
        Add book
      </Button>
    </header>
  );
}
