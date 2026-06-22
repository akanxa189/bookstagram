import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
  activeNavId?: string;
};

export function DashboardLayout({
  children,
  activeNavId = "home",
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeId={activeNavId} />

      <div className="flex min-h-screen flex-1 flex-col">
        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:px-10 lg:pb-8">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>

      <MobileNav activeId={activeNavId} />
    </div>
  );
}
