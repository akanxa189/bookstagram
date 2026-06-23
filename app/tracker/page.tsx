import { ReadingTrackerClient } from "@/components/tracker/reading-tracker-client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function TrackerPage() {
  return (
    <DashboardLayout activeNavId="calendar">
      <ReadingTrackerClient />
    </DashboardLayout>
  );
}
