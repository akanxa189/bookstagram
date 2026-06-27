import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { BuyLink, BuyLinkStore } from "@/lib/wishlist";

const STORE_STYLES: Record<
  BuyLinkStore,
  { className: string; icon: string }
> = {
  amazon: {
    className: "border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100",
    icon: "A",
  },
  flipkart: {
    className: "border-blue-200 bg-blue-50 text-blue-900 hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-100",
    icon: "F",
  },
  audible: {
    className: "border-orange-200 bg-orange-50 text-orange-900 hover:bg-orange-100 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-100",
    icon: "♪",
  },
};

type WishlistBuyLinksProps = {
  links: BuyLink[];
};

export function WishlistBuyLinks({ links }: WishlistBuyLinksProps) {
  return (
    <section className="mb-10">
      <p className="mb-4 text-xs font-medium tracking-widest text-muted-foreground uppercase">
        Where to buy
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        {links.map((link) => {
          const style = STORE_STYLES[link.store];

          return (
            <Button
              key={link.store}
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              className={`h-auto justify-start gap-3 rounded-xl border px-4 py-3 ${style.className}`}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/60 text-sm font-bold dark:bg-black/20">
                {style.icon}
              </span>
              <span className="flex flex-1 flex-col items-start gap-0.5">
                <span className="text-sm font-semibold">{link.label}</span>
                <span className="text-xs opacity-70">Open store</span>
              </span>
              <ExternalLink className="size-4 shrink-0 opacity-60" />
            </Button>
          );
        })}
      </div>
    </section>
  );
}
