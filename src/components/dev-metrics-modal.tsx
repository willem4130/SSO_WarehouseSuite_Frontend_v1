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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Development Metrics</DialogTitle>
          <DialogDescription className="text-base">
            Real-time insights from SCEX custom application development
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-6">
          <CodeStatsKPI />

          {/* Industry Research Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">
              Industry Research: Developer Productivity
            </h3>

            <div className="space-y-4 text-sm">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">
                  Average Developer Output
                </h4>
                <p className="text-muted-foreground mb-3">
                  <strong>5-10 lines of production-ready code per hour</strong>{" "}
                  (averaged across the full development cycle)
                </p>
                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                  <li>50-80 LOC/day for typical professional development</li>
                  <li>Only ~52 minutes per day spent actually coding</li>
                  <li>10-125 LOC/day depending on project complexity</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">
                    Developer Time Breakdown
                  </h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 32% - Writing/improving code</li>
                    <li>• 19% - Code maintenance</li>
                    <li>• 12% - Testing</li>
                    <li>• 11% - Documentation</li>
                    <li>• 23% - Meetings/management</li>
                    <li>• 4% - Security responses</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">
                    Impact of Quality Practices
                  </h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Testing adds 25-50% time overhead initially</li>
                    <li>• But reduces debugging time by 75%</li>
                    <li>• TDD slows development by 15-35%</li>
                    <li>• But reduces bugs by 40-90%</li>
                    <li>• Documentation: ~11% of work hours</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
                  ⚠️ Critical Context: LOC is a Terrible Metric
                </h4>
                <p className="text-muted-foreground text-xs mb-2">
                  Lines of code should NOT be used to measure productivity:
                </p>
                <ul className="space-y-1 text-xs text-muted-foreground ml-4 list-disc">
                  <li>
                    <strong>Quality paradox:</strong> Good developers often
                    write LESS code (refactoring, elegance)
                  </li>
                  <li>
                    <strong>Language differences:</strong> 100 lines in C++ = 10
                    lines in Python
                  </li>
                  <li>
                    <strong>Easy to game:</strong> Incentivizes verbose, bloated
                    code
                  </li>
                  <li>
                    <strong>Ignores value:</strong> 10 lines solving a critical
                    problem {">"} 100 lines of boilerplate
                  </li>
                </ul>
                <p className="text-xs italic text-muted-foreground mt-3 border-l-2 border-amber-500/30 pl-3">
                  "Measuring programming progress by lines of code is like
                  measuring aircraft building progress by weight." - Bill Gates
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">
                  What Companies Actually Measure
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-medium mb-1">DORA Metrics:</p>
                    <ul className="space-y-0.5 text-xs text-muted-foreground ml-3 list-disc">
                      <li>Deployment frequency</li>
                      <li>Lead time for changes</li>
                      <li>Change failure rate</li>
                      <li>Mean time to recovery</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1">
                      SPACE Framework (GitHub/Microsoft):
                    </p>
                    <ul className="space-y-0.5 text-xs text-muted-foreground ml-3 list-disc">
                      <li>Satisfaction</li>
                      <li>Performance</li>
                      <li>Activity</li>
                      <li>Communication</li>
                      <li>Efficiency</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">
                  Our Approach
                </h4>
                <p className="text-xs text-muted-foreground">
                  We use the industry standard range of{" "}
                  <strong>5-10 LOC/hour</strong> for estimation purposes only.
                  Our hour ranges represent conservative (10 LOC/hour) to
                  optimistic (5 LOC/hour) scenarios. The actual value delivered
                  is measured by features shipped, code quality, and business
                  outcomes - not lines of code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
