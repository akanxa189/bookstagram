import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  className?: string;
};

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <Card className={cn("py-5", className)}>
      <CardContent className="flex flex-col gap-1 px-5">
        <span className="font-serif text-4xl font-semibold text-foreground">
          {value}
        </span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </CardContent>
    </Card>
  );
}
