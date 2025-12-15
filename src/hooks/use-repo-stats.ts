import { REPO_STATS } from "@/data/repo-stats";

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
  const data: RepoStatsResponse = {
    stats: REPO_STATS,
    cached: true,
  };

  return { data, loading: false, error: null };
}

export function useRepoStat(githubRepo: string) {
  const { data, loading, error } = useRepoStats();

  const stat = data?.stats.find((s) =>
    githubRepo.includes(s.repo.split("/")[1] || "")
  );

  return { stat, loading, error };
}
