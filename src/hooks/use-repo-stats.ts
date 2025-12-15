import { REPO_STATS, type Release, type RepoStat } from "@/data/repo-stats";

interface RepoStatsResponse {
  stats: RepoStat[];
  cached: boolean;
}

export function useRepoStats() {
  const data: RepoStatsResponse = {
    stats: REPO_STATS,
    cached: true,
  };

  const getRepoStats = (githubRepo: string): RepoStat | null => {
    return (
      data.stats.find((s) => githubRepo.includes(s.repo.split("/")[1] || "")) ||
      null
    );
  };

  return { data, loading: false, error: null, getRepoStats };
}

export function useRepoStat(githubRepo: string) {
  const { loading, error, getRepoStats } = useRepoStats();

  const stat = getRepoStats(githubRepo);

  return { stat, loading, error };
}

export type { Release, RepoStat };
