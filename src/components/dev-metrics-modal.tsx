"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CodeStatsKPI } from "@/components/code-stats-kpi";
import { Zap } from "lucide-react";
import { useRepoStats } from "@/hooks/use-repo-stats";

export function DevMetricsModal() {
  const [open, setOpen] = useState(false);
  const { data } = useRepoStats();

  const summary = data
    ? {
        totalLines: data.stats.reduce((sum, stat) => sum + stat.lines, 0),
        hoursMin: data.stats.reduce((sum, stat) => sum + stat.hoursMin, 0),
        hoursMax: data.stats.reduce((sum, stat) => sum + stat.hoursMax, 0),
      }
    : null;

  // Format for display
  const formatted = summary
    ? {
        lines:
          summary.totalLines >= 1000
            ? `${Math.round(summary.totalLines / 1000)}K+`
            : summary.totalLines.toString(),
        hoursMin:
          summary.hoursMin >= 1000
            ? `${Math.round(summary.hoursMin / 100) / 10}K`
            : summary.hoursMin.toString(),
        hoursMax:
          summary.hoursMax >= 1000
            ? `${Math.round(summary.hoursMax / 100) / 10}K`
            : summary.hoursMax.toString(),
      }
    : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 h-9 px-3 border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/30 transition-all"
        >
          <Zap className="h-3.5 w-3.5 text-primary" />
          {formatted ? (
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="text-foreground">
                {formatted.lines}{" "}
                <span className="text-muted-foreground">lines</span>
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-foreground">
                {formatted.hoursMin}-{formatted.hoursMax}
                <span className="text-muted-foreground"> hrs</span>
              </span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">Loading...</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Development Metrics</DialogTitle>
          <DialogDescription className="text-base">
            Real-time insights from SCEX custom application development
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <CodeStatsKPI />
        </div>
      </DialogContent>
    </Dialog>
  );
}
