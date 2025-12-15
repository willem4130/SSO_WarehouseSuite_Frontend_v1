import { NextResponse } from "next/server";

// Cache configuration
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
let cachedData: RepoStats[] | null = null;
let lastFetchTime = 0;

interface Release {
  version: string;
  name: string;
  publishedAt: string;
  notes: string;
}

interface RepoStats {
  repo: string;
  lines: number;
  hoursMin: number;
  hoursMax: number;
  releases?: Release[];
}

const LINES_PER_HOUR_OPTIMISTIC = 5.0;
const LINES_PER_HOUR_CONSERVATIVE = 2.5;

const REPOS = [
  "willem4130/SSO_WarehouseSuite_Frontend_v1",
  "willem4130/SSO-RACI",
  "willem4130/sso-trucktypecalculator-2.0",
  "willem4130/impactmatrix",
  "willem4130/sc-simulator",
  "willem4130/SSO_Webscraper",
  "willem4130/SSO-linkedin-bot",
  "willem4130/PickOptimizerClone",
  "willem4130/raci-v2",
];

export async function GET() {
  try {
    // Workaround for Next.js edge runtime env access
    const githubToken = process.env["GITHUB_TOKEN"] || "";
    console.log("githubToken loaded:", githubToken ? "YES" : "NO");

    // Return cached data if still valid
    const now = Date.now();
    if (cachedData && now - lastFetchTime < CACHE_DURATION) {
      return NextResponse.json({ stats: cachedData, cached: true });
    }

    // Fetch fresh data
    const stats: RepoStats[] = [];

    for (const repo of REPOS) {
      try {
        const headers = githubToken
          ? { Authorization: `Bearer ${githubToken}` }
          : {};

        // Fetch language stats
        const langResponse = await fetch(
          `https://api.github.com/repos/${repo}/languages`,
          {
            headers,
            next: { revalidate: 3600 }, // Cache for 1 hour
          }
        );

        // Fetch releases
        const releasesResponse = await fetch(
          `https://api.github.com/repos/${repo}/releases?per_page=5`,
          {
            headers,
            next: { revalidate: 3600 }, // Cache for 1 hour
          }
        );

        if (langResponse.ok) {
          const languages = await langResponse.json();
          const bytesTotal = Object.values(languages).reduce(
            (sum: number, bytes) => sum + (bytes as number),
            0
          );
          const lines = Math.round(bytesTotal / 50);
          const hoursMin = Math.round(lines / LINES_PER_HOUR_OPTIMISTIC);
          const hoursMax = Math.round(lines / LINES_PER_HOUR_CONSERVATIVE);

          // Parse releases
          let releases: Release[] = [];
          if (releasesResponse.ok) {
            const releasesData = (await releasesResponse.json()) as Array<{
              tag_name: string;
              name: string;
              published_at: string;
              body: string;
            }>;
            releases = releasesData.slice(0, 5).map((release) => ({
              version: release.tag_name,
              name: release.name || release.tag_name,
              publishedAt: release.published_at,
              notes: release.body || "No release notes provided.",
            }));
          }

          stats.push({
            repo,
            lines,
            hoursMin,
            hoursMax,
            releases,
          });
        } else {
          console.error(`Failed to fetch ${repo}: ${langResponse.status}`);
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
