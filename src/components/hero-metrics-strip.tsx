"use client";

import { Code2, Clock, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRepoStats } from "@/hooks/use-repo-stats";

export function HeroMetricsStrip() {
  const { data, loading } = useRepoStats();

  const metrics = data
    ? {
        totalLines: data.stats.reduce((sum, stat) => sum + stat.lines, 0),
        hoursMin: data.stats.reduce((sum, stat) => sum + stat.hoursMin, 0),
        hoursMax: data.stats.reduce((sum, stat) => sum + stat.hoursMax, 0),
        totalRepos: data.stats.length,
      }
    : null;

  if (loading) {
    return (
      <div className="mb-6 sm:mb-8">
        <Card className="p-4 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <div className="animate-pulse">Loading development metrics...</div>
          </div>
        </Card>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="mb-6">
      <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Lines of Code */}
            <div className="flex items-center gap-3 justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {metrics.totalLines.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  Lines of code
                </div>
              </div>
            </div>

            {/* Dev Hours */}
            <div className="flex items-center gap-3 justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">
                  {metrics.hoursMin.toLocaleString()}-
                  {metrics.hoursMax.toLocaleString()}h
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  Development hours
                </div>
              </div>
            </div>

            {/* Active Projects */}
            <div className="flex items-center gap-3 justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {metrics.totalRepos}
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  Custom applications
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
