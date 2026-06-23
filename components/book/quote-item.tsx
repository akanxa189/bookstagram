import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BookQuote } from "@/lib/mock-data";

type QuoteItemProps = {
  quote: BookQuote;
  className?: string;
};

export function QuoteItem({ quote, className }: QuoteItemProps) {
  return (
    <figure
      className={cn(
        "flex items-start justify-between gap-4 border-l-2 border-primary py-1 pl-4",
        className
      )}
    >
      <blockquote className="font-serif text-base leading-relaxed text-foreground italic">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      <Badge variant="outline" className="shrink-0 rounded-full">
        p.{quote.page}
      </Badge>
    </figure>
  );
}
