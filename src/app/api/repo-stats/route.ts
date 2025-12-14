import { NextResponse } from "next/server";

// Cache configuration
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
let cachedData: RepoStats[] | null = null;
let lastFetchTime = 0;

interface RepoStats {
  repo: string;
  lines: number;
  hoursMin: number;
  hoursMax: number;
}

const LINES_PER_HOUR_OPTIMISTIC = 5.0;
const LINES_PER_HOUR_CONSERVATIVE = 2.5;

const REPOS = [
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

export async function GET() {
  try {
    // Return cached data if still valid
    const now = Date.now();
    if (cachedData && now - lastFetchTime < CACHE_DURATION) {
      return NextResponse.json({ stats: cachedData, cached: true });
    }

    // Fetch fresh data
    const stats: RepoStats[] = [];

    for (const repo of REPOS) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repo}/languages`,
          {
            headers: process.env["GITHUB_TOKEN"]
              ? {
                  Authorization: `Bearer ${process.env["GITHUB_TOKEN"]}`,
                }
              : {},
            // Add cache control
            next: { revalidate: 3600 }, // Cache for 1 hour
          }
        );

        if (response.ok) {
          const languages = await response.json();
          const bytesTotal = Object.values(languages).reduce(
            (sum: number, bytes) => sum + (bytes as number),
            0
          );
          const lines = Math.round(bytesTotal / 50);
          const hoursMin = Math.round(lines / LINES_PER_HOUR_OPTIMISTIC);
          const hoursMax = Math.round(lines / LINES_PER_HOUR_CONSERVATIVE);

          stats.push({
            repo,
            lines,
            hoursMin,
            hoursMax,
          });
        } else {
          console.error(`Failed to fetch ${repo}: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error fetching ${repo}:`, error);
      }
    }

    // Update cache
    cachedData = stats;
    lastFetchTime = now;

    return NextResponse.json({ stats, cached: false });
  } catch (error) {
    console.error("Error fetching repo stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch repository statistics" },
      { status: 500 }
    );
  }
}
