import { StatCard } from "@/components/dashboard/stat-card";

type TrackerSummaryProps = {
  pages: number;
  booksFinished: number;
};

export function TrackerSummary({ pages, booksFinished }: TrackerSummaryProps) {
  return (
    <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <StatCard value={String(pages)} label="pages this month" />
      <StatCard value={String(booksFinished)} label="books finished" />
    </section>
  );
}
