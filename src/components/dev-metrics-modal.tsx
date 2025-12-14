"use client";

import { useState, useEffect } from "react";
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

// Industry benchmarks
const LINES_PER_HOUR_OPTIMISTIC = 5.0;
const LINES_PER_HOUR_CONSERVATIVE = 2.5;

export function DevMetricsModal() {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState<{
    lines: string;
    hoursMin: string;
    hoursMax: string;
  } | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
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

        await Promise.all(
          repos.map(async (repo) => {
            try {
              const response = await fetch(
                `https://api.github.com/repos/${repo}/languages`
              );
              if (response.ok) {
                const languages = await response.json();
                const bytesTotal = Object.values(languages).reduce(
                  (sum: number, bytes) => sum + (bytes as number),
                  0
                );
                totalLines += Math.round(bytesTotal / 50);
              }
            } catch (error) {
              console.error(`Error fetching ${repo}:`, error);
            }
          })
        );

        const hoursMin = Math.round(totalLines / LINES_PER_HOUR_OPTIMISTIC);
        const hoursMax = Math.round(totalLines / LINES_PER_HOUR_CONSERVATIVE);

        // Format for display
        const linesFormatted =
          totalLines >= 1000
            ? `${Math.round(totalLines / 1000)}K+`
            : totalLines.toString();
        const hoursMinFormatted =
          hoursMin >= 1000
            ? `${Math.round(hoursMin / 100) / 10}K`
            : hoursMin.toString();
        const hoursMaxFormatted =
          hoursMax >= 1000
            ? `${Math.round(hoursMax / 100) / 10}K`
            : hoursMax.toString();

        setSummary({
          lines: linesFormatted,
          hoursMin: hoursMinFormatted,
          hoursMax: hoursMaxFormatted,
        });
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    }

    fetchSummary();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 h-9 px-3 border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/30 transition-all"
        >
          <Zap className="h-3.5 w-3.5 text-primary" />
          {summary ? (
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="text-foreground">
                {summary.lines}{" "}
                <span className="text-muted-foreground">lines</span>
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-foreground">
                {summary.hoursMin}-{summary.hoursMax}
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
