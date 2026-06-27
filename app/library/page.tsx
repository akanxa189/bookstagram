import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LibraryClient } from "@/components/library/library-client";

export default function LibraryPage() {
  return (
    <DashboardLayout activeNavId="bookshelf">
      <LibraryClient />
    </DashboardLayout>
  );
}
