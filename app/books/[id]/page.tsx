import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { BookDetailPageClient } from "@/components/book/book-detail-page-client";

type BookPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;

  return (
    <DashboardLayout activeNavId="bookshelf">
      <BookDetailPageClient id={id} />
    </DashboardLayout>
  );
}
