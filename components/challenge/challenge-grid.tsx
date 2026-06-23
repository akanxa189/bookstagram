import { ChallengeEmptySlot } from "@/components/challenge/challenge-empty-slot";
import { ChallengeFilledSlot } from "@/components/challenge/challenge-filled-slot";
import { getBookById } from "@/lib/books-store";
import type { ChallengeState } from "@/lib/challenge";

type ChallengeGridProps = {
  challenge: ChallengeState;
  onAddToSlot: (slotIndex: number) => void;
};

export function ChallengeGrid({ challenge, onAddToSlot }: ChallengeGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {challenge.slots.map((bookId, index) => {
        const slotNumber = index + 1;

        if (bookId) {
          const book = getBookById(bookId);
          if (!book) {
            return (
              <ChallengeEmptySlot
                key={index}
                slotNumber={slotNumber}
                onAdd={() => onAddToSlot(index)}
              />
            );
          }

          return (
            <ChallengeFilledSlot
              key={index}
              slotNumber={slotNumber}
              book={book}
            />
          );
        }

        return (
          <ChallengeEmptySlot
            key={index}
            slotNumber={slotNumber}
            onAdd={() => onAddToSlot(index)}
          />
        );
      })}
    </div>
  );
}
