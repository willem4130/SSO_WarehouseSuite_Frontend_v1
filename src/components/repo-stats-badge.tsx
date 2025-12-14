"use client";

import { useEffect, useState } from "react";
import { Code2, Clock } from "lucide-react";

interface RepoStatsBadgeProps {
  githubRepo?: string;
}

// Industry benchmarks for production code
const LINES_PER_HOUR_OPTIMISTIC = 5.0; // Faster, more experienced workflow
const LINES_PER_HOUR_CONSERVATIVE = 2.5; // Slower, more careful approach

export function RepoStatsBadge({ githubRepo }: RepoStatsBadgeProps) {
  const [stats, setStats] = useState<{
    lines: number;
    hoursMin: number;
    hoursMax: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepoStats() {
      if (!githubRepo) {
        setLoading(false);
        return;
      }

      try {
        // Extract owner/repo from GitHub URL
        const match = githubRepo.match(/github\.com\/(.+?)\/(.+?)(?:\/|$)/);
        if (!match) {
          setLoading(false);
          return;
        }

        const [, owner, repo] = match;
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/languages`
        );

        if (response.ok) {
          const languages = await response.json();
          const bytesTotal = Object.values(languages).reduce(
            (sum: number, bytes) => sum + (bytes as number),
            0
          );
          const lines = Math.round(bytesTotal / 50);

          // Calculate range: optimistic = fewer hours, conservative = more hours
          const hoursMin = Math.round(lines / LINES_PER_HOUR_OPTIMISTIC);
          const hoursMax = Math.round(lines / LINES_PER_HOUR_CONSERVATIVE);

          setStats({ lines, hoursMin, hoursMax });
        }
      } catch (error) {
        console.error("Error fetching repo stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepoStats();
  }, [githubRepo]);

  if (!githubRepo || loading || !stats) return null;

  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">
      <div className="flex items-center gap-1">
        <Code2 className="h-3 w-3" />
        <span className="font-medium">{stats.lines.toLocaleString()}</span>
        <span>lines</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        <span className="font-medium">
          {stats.hoursMin}-{stats.hoursMax}
        </span>
        <span>hrs</span>
      </div>
    </div>
  );
}
