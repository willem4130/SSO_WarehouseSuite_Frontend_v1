"use client";

import { useEffect, useState } from "react";
import { Code2, Clock, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

// Industry benchmarks
const LINES_PER_HOUR_OPTIMISTIC = 5.0;
const LINES_PER_HOUR_CONSERVATIVE = 2.5;

interface MetricsData {
  totalLines: number;
  hoursMin: number;
  hoursMax: number;
  totalRepos: number;
}

export function HeroMetricsStrip() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
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

        setMetrics({
          totalLines,
          hoursMin,
          hoursMax,
          totalRepos: repos.length,
        });
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);

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
    <div className="mb-6 sm:mb-8">
      <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20 shadow-md hover:shadow-lg transition-shadow">
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Lines of Code */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Code2 className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {metrics.totalLines.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Lines of code
                </div>
              </div>
            </div>

            {/* Dev Hours */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-2xl sm:text-3xl font-bold text-accent">
                  {metrics.hoursMin.toLocaleString()}-
                  {metrics.hoursMax.toLocaleString()}h
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Development hours
                </div>
              </div>
            </div>

            {/* Active Projects */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {metrics.totalRepos}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
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
