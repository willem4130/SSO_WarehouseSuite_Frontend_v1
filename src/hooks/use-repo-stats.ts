import { useEffect, useState } from "react";

interface RepoStat {
  repo: string;
  lines: number;
  hoursMin: number;
  hoursMax: number;
}

interface RepoStatsResponse {
  stats: RepoStat[];
  cached: boolean;
}

export function useRepoStats() {
  const [data, setData] = useState<RepoStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/repo-stats");
        if (!response.ok) {
          throw new Error("Failed to fetch repo stats");
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching repo stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { data, loading, error };
}

export function useRepoStat(githubRepo: string) {
  const { data, loading, error } = useRepoStats();

  const stat = data?.stats.find((s) =>
    githubRepo.includes(s.repo.split("/")[1] || "")
  );

  return { stat, loading, error };
}
