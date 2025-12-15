"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Clock, Zap } from "lucide-react";
import { useRepoStats } from "@/hooks/use-repo-stats";

export function CodeStatsKPI() {
  const { data, loading } = useRepoStats();

  const kpiData = data
    ? {
        totalRepos: data.stats.length,
        totalLinesOfCode: data.stats.reduce((sum, stat) => sum + stat.lines, 0),
        estimatedHoursMin: data.stats.reduce(
          (sum, stat) => sum + stat.hoursMin,
          0
        ),
        estimatedHoursMax: data.stats.reduce(
          (sum, stat) => sum + stat.hoursMax,
          0
        ),
      }
    : null;

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">
              Loading development metrics...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!kpiData) return null;

  return (
    <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Zap className="h-5 w-5 text-accent" />
          Development Impact Metrics
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Real-time analytics from {kpiData.totalRepos} SCEX custom applications
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Lines of Code */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Code2 className="h-4 w-4" />
              <span className="text-xs font-medium">Lines of Code</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">
              {kpiData.totalLinesOfCode.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              Production-ready code
            </div>
          </div>

          {/* Estimated Hours */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium">Est. Dev Hours</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-accent">
              {kpiData.estimatedHoursMin.toLocaleString()}-
              {kpiData.estimatedHoursMax.toLocaleString()}h
            </div>
            <div className="text-xs text-muted-foreground">
              2.5-5.0 lines/hour
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-medium">Active Projects</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-accent">
              {kpiData.totalRepos}
            </div>
            <div className="text-xs text-muted-foreground">
              Custom applications
            </div>
          </div>
        </div>

        {/* Benchmark Info */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            <strong>Benchmark:</strong> Industry range of 2.5-5.0 lines/hour
            (conservative to optimistic) includes design, implementation,
            testing, documentation, and debugging. Metrics auto-update from
            GitHub repositories.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
