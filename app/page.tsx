import { BookOpen, Clock } from "lucide-react";

import { BookCard } from "@/components/dashboard/book-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  currentlyReading,
  dashboardStats,
  recentlyAdded,
} from "@/lib/mock-data";

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
        <SectionHeader title="Currently reading" icon={BookOpen} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {currentlyReading.map((book) => (
            <ProgressCard
              key={book.id}
              title={book.title}
              author={book.author}
              progress={book.progress}
            />
          ))}
        </div>
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
