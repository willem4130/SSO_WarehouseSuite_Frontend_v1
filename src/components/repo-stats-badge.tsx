"use client";

import { Code2, Clock } from "lucide-react";
import { useRepoStat } from "@/hooks/use-repo-stats";

interface RepoStatsBadgeProps {
  githubRepo?: string;
}

export function RepoStatsBadge({ githubRepo }: RepoStatsBadgeProps) {
  const { stat, loading } = useRepoStat(githubRepo || "");

  if (!githubRepo || loading || !stat) return null;

  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">
      <div className="flex items-center gap-1">
        <Code2 className="h-3 w-3" />
        <span className="font-medium">{stat.lines.toLocaleString()}</span>
        <span>lines</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        <span className="font-medium">
          {stat.hoursMin}-{stat.hoursMax}
        </span>
        <span>hrs</span>
      </div>
    </div>
  );
}
