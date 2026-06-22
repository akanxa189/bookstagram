import { BookOpen } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ProgressCardProps = {
  title: string;
  author: string;
  progress: number;
  className?: string;
};

export function ProgressCard({
  title,
  author,
  progress,
  className,
}: ProgressCardProps) {
  return (
    <Card className={cn("py-0", className)}>
      <CardContent className="flex gap-4 p-4 sm:gap-5 sm:p-5">
        <div className="flex size-24 shrink-0 items-center justify-center rounded-xl bg-secondary sm:size-28">
          <BookOpen className="size-8 text-primary/60" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
          <div>
            <h3 className="truncate font-semibold text-foreground">{title}</h3>
            <p className="truncate text-sm text-muted-foreground">{author}</p>
          </div>

          <div className="space-y-1.5">
            <Progress value={progress} className="gap-0" />
            <p className="text-xs text-muted-foreground">{progress}% complete</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
