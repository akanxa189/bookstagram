function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

type DashboardHeaderProps = {
  name?: string;
};

export function DashboardHeader({ name = "Akanxa" }: DashboardHeaderProps) {
  const today = formatDate(new Date());

  return (
    <header className="mb-8">
      <p className="mb-1 text-sm text-primary">{today}</p>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {getGreeting()}, {name} ✨
      </h1>
    </header>
  );
}
