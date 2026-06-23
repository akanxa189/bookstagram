import { StarRating } from "@/components/common/star-rating";

type BookRatingSectionProps = {
  rating: number;
};

export function BookRatingSection({ rating }: BookRatingSectionProps) {
  return (
    <section className="mb-8">
      <p className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
        My rating
      </p>
      <StarRating rating={rating} className="gap-1" />
    </section>
  );
}
