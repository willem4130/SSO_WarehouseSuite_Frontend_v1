// Static repository statistics
// Update these manually when needed

export const REPO_STATS = [
  {
    repo: "willem4130/SSO_WarehouseSuite_Frontend_v1",
    lines: 3245,
    hoursMin: 649,
    hoursMax: 1298,
  },
  {
    repo: "willem4130/SSO-RACI",
    lines: 2890,
    hoursMin: 578,
    hoursMax: 1156,
  },
  {
    repo: "willem4130/sso-trucktypecalculator-2.0",
    lines: 2156,
    hoursMin: 431,
    hoursMax: 862,
  },
  {
    repo: "willem4130/impactmatrix",
    lines: 3421,
    hoursMin: 684,
    hoursMax: 1368,
  },
  {
    repo: "willem4130/sc-simulator",
    lines: 2987,
    hoursMin: 597,
    hoursMax: 1195,
  },
  {
    repo: "willem4130/SSO_Webscraper",
    lines: 1876,
    hoursMin: 375,
    hoursMax: 750,
  },
  {
    repo: "willem4130/SSO-linkedin-bot",
    lines: 1543,
    hoursMin: 309,
    hoursMax: 617,
  },
  {
    repo: "willem4130/PickOptimizerClone",
    lines: 2678,
    hoursMin: 536,
    hoursMax: 1071,
  },
  {
    repo: "willem4130/raci-v2",
    lines: 2234,
    hoursMin: 447,
    hoursMax: 894,
  },
];

export const TOTAL_STATS = {
  totalRepos: REPO_STATS.length,
  totalLines: REPO_STATS.reduce((sum, stat) => sum + stat.lines, 0),
  totalHoursMin: REPO_STATS.reduce((sum, stat) => sum + stat.hoursMin, 0),
  totalHoursMax: REPO_STATS.reduce((sum, stat) => sum + stat.hoursMax, 0),
};
