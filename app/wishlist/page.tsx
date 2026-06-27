import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { WishlistClient } from "@/components/wishlist/wishlist-client";

export default function WishlistPage() {
  return (
    <DashboardLayout activeNavId="wishlist">
      <WishlistClient />
    </DashboardLayout>
  );
}
