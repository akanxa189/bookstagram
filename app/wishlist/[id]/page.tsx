import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { WishlistDetailPageClient } from "@/components/wishlist/wishlist-detail-page-client";

type WishlistDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function WishlistDetailPage({
  params,
}: WishlistDetailPageProps) {
  const { id } = await params;

  return (
    <DashboardLayout activeNavId="wishlist">
      <WishlistDetailPageClient id={id} />
    </DashboardLayout>
  );
}
