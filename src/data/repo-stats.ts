// Static repository statistics
// Last updated: 2025-12-15
// Calculations based on industry standard: 5-10 LOC/hour
// - hoursMin = lines / 10 (optimistic: faster development)
// - hoursMax = lines / 5 (conservative: slower development)

export interface Release {
  version: string;
  name: string;
  publishedAt: string;
  notes: string;
}

export interface RepoStat {
  repo: string;
  lines: number;
  hoursMin: number;
  hoursMax: number;
  releases?: Release[];
}

export const REPO_STATS: RepoStat[] = [
  {
    repo: "willem4130/SSO_WarehouseSuite_Frontend_v1",
    lines: 3245,
    hoursMin: 325,
    hoursMax: 649,
    releases: [],
  },
  {
    repo: "willem4130/SSO-RACI",
    lines: 2890,
    hoursMin: 289,
    hoursMax: 578,
    releases: [],
  },
  {
    repo: "willem4130/sso-trucktypecalculator-2.0",
    lines: 2156,
    hoursMin: 216,
    hoursMax: 431,
    releases: [],
  },
  {
    repo: "willem4130/impactmatrix",
    lines: 3421,
    hoursMin: 342,
    hoursMax: 684,
    releases: [],
  },
  {
    repo: "willem4130/sc-simulator",
    lines: 2987,
    hoursMin: 299,
    hoursMax: 597,
    releases: [],
  },
  {
    repo: "willem4130/SSO_Webscraper",
    lines: 1876,
    hoursMin: 188,
    hoursMax: 375,
    releases: [],
  },
  {
    repo: "willem4130/SSO-linkedin-bot",
    lines: 1543,
    hoursMin: 154,
    hoursMax: 309,
    releases: [],
  },
  {
    repo: "willem4130/PickOptimizerClone",
    lines: 2678,
    hoursMin: 268,
    hoursMax: 536,
    releases: [],
  },
  {
    repo: "willem4130/raci-v2",
    lines: 2234,
    hoursMin: 223,
    hoursMax: 447,
    releases: [],
  },
];

export const TOTAL_STATS = {
  totalRepos: REPO_STATS.length,
  totalLines: REPO_STATS.reduce((sum, stat) => sum + stat.lines, 0),
  totalHoursMin: REPO_STATS.reduce((sum, stat) => sum + stat.hoursMin, 0),
  totalHoursMax: REPO_STATS.reduce((sum, stat) => sum + stat.hoursMax, 0),
};
