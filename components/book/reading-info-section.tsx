"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ReadingInfo = {
  startedReading?: string;
  finishedReading?: string;
  thoughts?: string;
};

type ReadingInfoSectionProps = {
  readingInfo: ReadingInfo;
  onReadingInfoChange: (info: ReadingInfo) => void;
};

export function ReadingInfoSection({
  readingInfo,
  onReadingInfoChange,
}: ReadingInfoSectionProps) {
  const [open, setOpen] = useState(false);
  const [startedReading, setStartedReading] = useState(
    readingInfo.startedReading ?? ""
  );
  const [finishedReading, setFinishedReading] = useState(
    readingInfo.finishedReading ?? ""
  );
  const [thoughts, setThoughts] = useState(readingInfo.thoughts ?? "");

  const hasInfo = Boolean(
    readingInfo.startedReading ||
      readingInfo.finishedReading ||
      readingInfo.thoughts
  );

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setStartedReading(readingInfo.startedReading ?? "");
      setFinishedReading(readingInfo.finishedReading ?? "");
      setThoughts(readingInfo.thoughts ?? "");
    }
    setOpen(nextOpen);
  }

  function handleSave() {
    onReadingInfoChange({
      startedReading: startedReading.trim() || undefined,
      finishedReading: finishedReading.trim() || undefined,
      thoughts: thoughts.trim() || undefined,
    });
    setOpen(false);
  }

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Reading journal
        </p>

        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger
            render={
              <Button variant="outline" size="sm" className="rounded-xl" />
            }
          >
            {hasInfo ? "Edit" : "Add info"}
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {hasInfo ? "Edit reading info" : "Add reading info"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="started-reading">Started reading</Label>
                  <Input
                    id="started-reading"
                    value={startedReading}
                    onChange={(event) => setStartedReading(event.target.value)}
                    placeholder="e.g. 10 Jan 2024"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="finished-reading">Finished reading</Label>
                  <Input
                    id="finished-reading"
                    value={finishedReading}
                    onChange={(event) => setFinishedReading(event.target.value)}
                    placeholder="e.g. 28 Jan 2024"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thoughts">My thoughts</Label>
                <Textarea
                  id="thoughts"
                  value={thoughts}
                  onChange={(event) => setThoughts(event.target.value)}
                  placeholder="Share your thoughts about this book..."
                  className="min-h-32 rounded-xl"
                />
              </div>
            </div>

            <DialogFooter className="mt-2 border-0 bg-transparent p-0 sm:justify-end">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {hasInfo ? (
        <div className="space-y-6 rounded-2xl border border-border bg-card p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {readingInfo.startedReading && (
              <div>
                <p className="mb-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  Started reading
                </p>
                <p className="text-foreground">{readingInfo.startedReading}</p>
              </div>
            )}

            {readingInfo.finishedReading && (
              <div>
                <p className="mb-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  Finished reading
                </p>
                <p className="text-foreground">{readingInfo.finishedReading}</p>
              </div>
            )}
          </div>

          {readingInfo.thoughts && (
            <div>
              <p className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                My thoughts
              </p>
              <p className="leading-relaxed text-foreground">
                {readingInfo.thoughts}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No reading dates or thoughts yet.
        </p>
      )}
    </section>
  );
}
