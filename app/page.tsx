import { Clock, Heart } from "lucide-react";
import Link from "next/link";

import { BookCard } from "@/components/dashboard/book-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { WishlistPreview } from "@/components/dashboard/wishlist-preview";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { dashboardStats, recentlyAdded } from "@/lib/mock-data";

export default function Home() {
  return (
    <DashboardLayout activeNavId="home">
      <DashboardHeader />

      <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </section>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <SectionHeader title="Wishlist" icon={Heart} className="mb-0" />
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href="/wishlist" />}
            className="rounded-xl"
          >
            View all
          </Button>
        </div>
        <WishlistPreview />
      </section>

      <section>
        <SectionHeader title="Recently added" icon={Clock} />
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {recentlyAdded.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              rating={book.rating}
              className="w-[160px] shrink-0 snap-start sm:w-auto"
            />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
