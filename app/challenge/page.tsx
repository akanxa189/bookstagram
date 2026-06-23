import { ReadingChallengeClient } from "@/components/challenge/reading-challenge-client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function ChallengePage() {
  return (
    <DashboardLayout activeNavId="trophy">
      <ReadingChallengeClient />
    </DashboardLayout>
  );
}
