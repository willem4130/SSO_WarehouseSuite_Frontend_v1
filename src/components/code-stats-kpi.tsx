"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Clock, Zap, TrendingUp } from "lucide-react";

interface RepoStats {
  name: string;
  linesOfCode: number;
  languages: Record<string, number>;
}

interface KPIData {
  totalRepos: number;
  totalLinesOfCode: number;
  estimatedHoursMin: number;
  estimatedHoursMax: number;
  estimatedWeeksMin: number;
  estimatedWeeksMax: number;
}

// Industry benchmarks for professional developers
const LINES_PER_HOUR_OPTIMISTIC = 5.0; // Faster, more experienced workflow
const LINES_PER_HOUR_CONSERVATIVE = 2.5; // Slower, more careful approach
const HOURS_PER_WEEK = 40;

export function CodeStatsKPI() {
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        // List of SCEX custom build repositories
        const repos = [
          "willem4130/sso-forecaster",
          "willem4130/Hubspot-CompanyScrape-Hubspot_v1",
          "willem4130/simplicate-workspace",
          "willem4130/impactmatrix",
          "willem4130/sso-trucktypecalculator-2.0",
          "willem4130/sc-simulator",
          "willem4130/SSO-RACI",
          "willem4130/powerpoint-placeholder-addin",
          "willem4130/SSO_WarehouseSuite_Frontend_v1",
        ];

        let totalLines = 0;
        const repoStats: RepoStats[] = [];

        // Fetch language stats for each repo
        await Promise.all(
          repos.map(async (repo) => {
            try {
              const response = await fetch(
                `https://api.github.com/repos/${repo}/languages`
              );
              if (response.ok) {
                const languages = await response.json();
                // Approximate lines of code: bytes ÷ average bytes per line (~50)
                const bytesTotal = Object.values(languages).reduce(
                  (sum: number, bytes) => sum + (bytes as number),
                  0
                );
                const linesOfCode = Math.round(bytesTotal / 50);
                totalLines += linesOfCode;

                const repoName = repo.split("/")[1] || repo;
                repoStats.push({
                  name: repoName,
                  linesOfCode,
                  languages,
                });
              }
            } catch (error) {
              console.error(`Error fetching stats for ${repo}:`, error);
            }
          })
        );

        // Calculate range: optimistic = fewer hours, conservative = more hours
        const estimatedHoursMin = Math.round(
          totalLines / LINES_PER_HOUR_OPTIMISTIC
        );
        const estimatedHoursMax = Math.round(
          totalLines / LINES_PER_HOUR_CONSERVATIVE
        );
        const estimatedWeeksMin = Math.round(
          estimatedHoursMin / HOURS_PER_WEEK
        );
        const estimatedWeeksMax = Math.round(
          estimatedHoursMax / HOURS_PER_WEEK
        );

        setKpiData({
          totalRepos: repos.length,
          totalLinesOfCode: totalLines,
          estimatedHoursMin,
          estimatedHoursMax,
          estimatedWeeksMin,
          estimatedWeeksMax,
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubStats();
  }, []);

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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* Estimated Weeks */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">Est. Dev Time</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">
              {kpiData.estimatedWeeksMin}-{kpiData.estimatedWeeksMax}
            </div>
            <div className="text-xs text-muted-foreground">
              weeks (40h/week)
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
