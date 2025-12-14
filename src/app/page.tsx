"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Search,
  HelpCircle,
  BarChart3,
  Calculator,
  FileText,
  Users,
  Briefcase,
  TrendingUp,
  Database,
  Globe,
  Zap,
  Target,
  ChevronRight,
  Filter,
  X,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type AppStatus = "production" | "in-progress" | "beta";
type AppCategory =
  | "optimization"
  | "analytics"
  | "collaboration"
  | "automation"
  | "tools";

interface App {
  id: string;
  name: string;
  description: string;
  url: string;
  category: AppCategory;
  status: AppStatus;
  icon: React.ReactNode;
  isExternal: boolean;
  isCustomBuild: boolean; // true for SCEX custom builds, false for 3rd party platforms
  progress?: number;
}

const apps: App[] = [
  // Core Optimization & Analytics
  {
    id: "more-optimal",
    name: "More Optimal Platform",
    description:
      "Pick Optimizer and Trailer Type Calculator for warehouse optimization",
    url: "https://scex.moreoptimal.com/app/index",
    category: "optimization",
    status: "production",
    icon: <Target className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: false,
  },
  {
    id: "powerbi",
    name: "PowerBI Dashboards",
    description: "Published dashboards for business intelligence and analytics",
    url: "https://app.powerbi.com/groups/cfa5821e-7fcb-41dc-9705-2276a3bb6583/list?experience=power-bi",
    category: "analytics",
    status: "production",
    icon: <BarChart3 className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: false,
  },
  {
    id: "forecaster",
    name: "Forecasting Tool",
    description:
      "Advanced forecasting for LinkedIn and other platforms (Demo Mode available)",
    url: "https://sso-forecaster.vercel.app/",
    category: "analytics",
    status: "production",
    icon: <TrendingUp className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: true,
  },
  {
    id: "tco-calculator",
    name: "TCO Calculator",
    description:
      "Total Cost of Ownership calculator (in progress but functional)",
    url: "https://sso-tco-calculator.vercel.app/calculator",
    category: "analytics",
    status: "in-progress",
    icon: <Calculator className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: true,
  },
  {
    id: "scenario-simulator",
    name: "Scenario Simulator",
    description:
      "Business scenario modeling and simulation tool (Early Development)",
    url: "https://sc-sim.vercel.app/admin/dashboard",
    category: "analytics",
    status: "in-progress",
    icon: <TrendingUp className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: true,
    progress: 15,
  },
  {
    id: "impact-matrix",
    name: "Impact Matrix",
    description: "Organizational impact assessment and analysis",
    url: "https://impactmatrix.vercel.app/organizations",
    category: "analytics",
    status: "beta",
    icon: <Target className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: true,
    progress: 70,
  },

  // HubSpot Ecosystem
  {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM and marketing automation platform",
    url: "https://app-eu1.hubspot.com/user-guide/146233913?via=home",
    category: "collaboration",
    status: "production",
    icon: <Users className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: false,
  },
  {
    id: "company-scraper",
    name: "HubSpot Company Research",
    description: "Company scraper and HubSpot automation integration",
    url: "https://hubspot-company-research.vercel.app/",
    category: "automation",
    status: "production",
    icon: <Globe className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: true,
  },

  // Simplicate Ecosystem
  {
    id: "simplicate",
    name: "Simplicate",
    description: "Project management and business operations dashboard",
    url: "https://scex.simplicate.nl/dashboard/overview",
    category: "collaboration",
    status: "production",
    icon: <Briefcase className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: false,
  },
  {
    id: "simplicate-automations",
    name: "Simplicate Automations",
    description: "Custom dashboards and workflow automations",
    url: "https://simplicate-automations.vercel.app/admin/dashboard",
    category: "automation",
    status: "production",
    icon: <Zap className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: true,
  },

  // Company Resources
  {
    id: "scex-website",
    name: "SCEX Website",
    description: "Official SCEX company website and information portal",
    url: "https://www.scex.nl",
    category: "collaboration",
    status: "production",
    icon: <Globe className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: false,
  },
  {
    id: "linkedin-business",
    name: "LinkedIn Business Page",
    description: "SCEX LinkedIn company page admin dashboard",
    url: "https://www.linkedin.com/company/18216856/admin/dashboard/",
    category: "collaboration",
    status: "production",
    icon: <Linkedin className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: false,
  },
  {
    id: "scex-connect",
    name: "SCEX Connect",
    description: "Backend portal and system connections",
    url: "https://scex.nl/connect",
    category: "tools",
    status: "production",
    icon: <Database className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: false,
  },
  {
    id: "sharepoint",
    name: "SharePoint",
    description: "SCEX Software Optimization collaboration hub",
    url: "https://scexonline.sharepoint.com/sites/SCEXSoftwareOptimization/SitePages/CollabHome.aspx",
    category: "collaboration",
    status: "production",
    icon: <FileText className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: false,
  },
  {
    id: "vision-planner",
    name: "Vision Planner",
    description: "Financial planning and analytics dashboard",
    url: "https://cloud.visionplanner.nl/presentation",
    category: "analytics",
    status: "production",
    icon: <BarChart3 className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: false,
  },
  {
    id: "raci-matrix",
    name: "RACI Matrix",
    description: "Responsibility assignment matrix for project clarity",
    url: "https://raci-matrix.vercel.app/dashboard",
    category: "tools",
    status: "in-progress",
    icon: <Database className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: true,
    progress: 30,
  },
  {
    id: "powerpoint-addin",
    name: "PowerPoint Add-in",
    description: "Placeholder management tool for presentations",
    url: "https://powerpoint-placeholder-addin.vercel.app/",
    category: "tools",
    status: "production",
    icon: <FileText className="h-5 w-5" />,
    isExternal: true,
    isCustomBuild: true,
  },
];

const categoryLabels: Record<AppCategory, string> = {
  optimization: "Optimization",
  analytics: "Analytics",
  collaboration: "Collaboration",
  automation: "Automation",
  tools: "Tools",
};

const statusColors: Record<AppStatus, string> = {
  production:
    "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  "in-progress":
    "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  beta: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
};

const statusLabels: Record<AppStatus, string> = {
  production: "Production",
  "in-progress": "In Progress",
  beta: "Beta",
};

// App Card Component
function AppCard({ app }: { app: App }) {
  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group transition-all duration-300 hover:scale-[1.02]"
    >
      <Card className="h-full cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden">
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="relative">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
              {app.icon}
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 ${statusColors[app.status]}`}
              >
                {statusLabels[app.status]}
              </span>
              {app.progress !== undefined && (
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-12 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-500"
                      style={{ width: `${app.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {app.progress}%
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-start gap-2 mb-2">
            <CardTitle className="group-hover:text-primary transition-colors duration-300 flex-1">
              {app.name}
            </CardTitle>
            {app.isCustomBuild && (
              <span className="shrink-0 rounded-md bg-accent/20 px-2 py-1 text-[10px] font-bold text-accent border border-accent/30 group-hover:bg-accent/30 transition-all duration-300">
                SCEX BUILD
              </span>
            )}
          </div>
          <CardDescription className="line-clamp-2">
            {app.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {app.isCustomBuild ? "Custom Build" : "External Platform"} •{" "}
              {categoryLabels[app.category]}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<AppCategory | "all">(
    "all"
  );
  const [selectedStatus, setSelectedStatus] = useState<AppStatus | "all">(
    "all"
  );
  const [selectedBuildType, setSelectedBuildType] = useState<
    "all" | "custom" | "external"
  >("all");

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || app.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "all" || app.status === selectedStatus;
      const matchesBuildType =
        selectedBuildType === "all" ||
        (selectedBuildType === "custom" && app.isCustomBuild) ||
        (selectedBuildType === "external" && !app.isCustomBuild);
      return (
        matchesSearch && matchesCategory && matchesStatus && matchesBuildType
      );
    });
  }, [searchQuery, selectedCategory, selectedStatus, selectedBuildType]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedStatus !== "all" ? 1 : 0) +
    (selectedBuildType !== "all" ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Company Logo - Desktop */}
              <div className="relative h-10 w-24 sm:h-12 sm:w-32 hidden md:block">
                <Image
                  src="/branding/scex-logo.jpg"
                  alt="SCEX"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden md:block h-10 sm:h-12 w-px bg-border" />
              {/* Mascot */}
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                <Image
                  src="/branding/scexie-mascot.png"
                  alt="Scexie"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-bold text-foreground truncate">
                  Application Suite
                </h1>
                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                  <Link
                    href="/"
                    className="hover:text-foreground transition-colors"
                  >
                    Home
                  </Link>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-foreground">Dashboard</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
                onClick={() =>
                  window.open(
                    "https://github.com/willem4130/SSO_WarehouseSuite_Frontend_v1",
                    "_blank"
                  )
                }
              >
                <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Hero Section */}
        <div className="mb-6 sm:mb-8 flex items-center gap-4 sm:gap-6 px-2 sm:px-4 py-4 sm:py-6">
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 flex-shrink-0 animate-[float_6s_ease-in-out_infinite]">
            <Image
              src="/branding/scexie-mascot.png"
              alt="Scexie"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Welcome to SCEX
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Your comprehensive application ecosystem
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 sm:h-10 text-base sm:text-sm"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-8 w-8 sm:h-7 sm:w-7 -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant={
                  selectedCategory !== "all" || selectedStatus !== "all"
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="gap-2 h-11 sm:h-9 flex-1 sm:flex-none"
              >
                <Filter className="h-4 w-4" />
                <span className="sm:inline">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="ml-1 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap items-center gap-2 w-full">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap">
                Category:
              </span>
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="h-8 sm:h-8 text-xs sm:text-sm px-3"
              >
                All
              </Button>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(key as AppCategory)}
                  className="h-8 sm:h-8 text-xs sm:text-sm px-3"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap items-center gap-2 w-full">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap">
                Status:
              </span>
              <Button
                variant={selectedStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("all")}
                className="h-8 sm:h-8 text-xs sm:text-sm px-3"
              >
                All
              </Button>
              {Object.entries(statusLabels).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedStatus === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(key as AppStatus)}
                  className="h-8 sm:h-8 text-xs sm:text-sm px-3"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap items-center gap-2 w-full">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap">
                Build Type:
              </span>
              <Button
                variant={selectedBuildType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedBuildType("all")}
                className="h-8 sm:h-8 text-xs sm:text-sm px-3"
              >
                All
              </Button>
              <Button
                variant={selectedBuildType === "custom" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedBuildType("custom")}
                className="h-8 sm:h-8 text-xs sm:text-sm px-3 gap-1.5"
              >
                <span className="hidden sm:inline">🔧</span>
                SCEX Build
              </Button>
              <Button
                variant={
                  selectedBuildType === "external" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedBuildType("external")}
                className="h-8 sm:h-8 text-xs sm:text-sm px-3 gap-1.5"
              >
                <span className="hidden sm:inline">📦</span>
                External Platform
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-4 sm:mb-6 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                    Total Apps
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">{apps.length}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 sm:p-3">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                    SCEX Build
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {apps.filter((a) => a.isCustomBuild).length}
                  </p>
                </div>
                <div className="rounded-full bg-accent/10 p-2 sm:p-3">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                    In Production
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {apps.filter((a) => a.status === "production").length}
                  </p>
                </div>
                <div className="rounded-full bg-green-500/10 p-2 sm:p-3">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                    In Progress
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {apps.filter((a) => a.status === "in-progress").length}
                  </p>
                </div>
                <div className="rounded-full bg-yellow-500/10 p-2 sm:p-3">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                    Categories
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {Object.keys(categoryLabels).length}
                  </p>
                </div>
                <div className="rounded-full bg-accent/10 p-2 sm:p-3">
                  <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredApps.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{apps.length}</span>{" "}
            applications
          </p>
        </div>

        {/* Apps Grid - Grouped by Ecosystem */}
        {filteredApps.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              No applications found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </Card>
        ) : (
          <div className="space-y-8 sm:space-y-12">
            {/* Core Analytics & Optimization */}
            {filteredApps.some((app) =>
              [
                "more-optimal",
                "powerbi",
                "forecaster",
                "tco-calculator",
                "scenario-simulator",
                "impact-matrix",
                "vision-planner",
              ].includes(app.id)
            ) && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-6 sm:h-8 w-1 bg-primary rounded-full" />
                  <h3 className="text-lg sm:text-2xl font-bold text-foreground">
                    Analytics & Optimization
                  </h3>
                  <div className="flex-1 h-px bg-border ml-2 sm:ml-4" />
                </div>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredApps
                    .filter((app) =>
                      [
                        "more-optimal",
                        "powerbi",
                        "forecaster",
                        "tco-calculator",
                        "scenario-simulator",
                        "impact-matrix",
                        "vision-planner",
                      ].includes(app.id)
                    )
                    .map((app) => (
                      <AppCard key={app.id} app={app} />
                    ))}
                </div>
              </div>
            )}

            {/* HubSpot Ecosystem */}
            {filteredApps.some((app) =>
              ["hubspot", "company-scraper"].includes(app.id)
            ) && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-6 sm:h-8 w-1 bg-accent rounded-full" />
                  <h3 className="text-lg sm:text-2xl font-bold text-foreground">
                    HubSpot Ecosystem
                  </h3>
                  <div className="flex-1 h-px bg-border ml-2 sm:ml-4" />
                </div>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredApps
                    .filter((app) =>
                      ["hubspot", "company-scraper"].includes(app.id)
                    )
                    .map((app) => (
                      <AppCard key={app.id} app={app} />
                    ))}
                </div>
              </div>
            )}

            {/* Simplicate Ecosystem */}
            {filteredApps.some((app) =>
              ["simplicate", "simplicate-automations"].includes(app.id)
            ) && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-6 sm:h-8 w-1 bg-accent rounded-full" />
                  <h3 className="text-lg sm:text-2xl font-bold text-foreground">
                    Simplicate Ecosystem
                  </h3>
                  <div className="flex-1 h-px bg-border ml-2 sm:ml-4" />
                </div>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredApps
                    .filter((app) =>
                      ["simplicate", "simplicate-automations"].includes(app.id)
                    )
                    .map((app) => (
                      <AppCard key={app.id} app={app} />
                    ))}
                </div>
              </div>
            )}

            {/* Company Resources */}
            {filteredApps.some((app) =>
              ["scex-website", "scex-connect", "sharepoint"].includes(app.id)
            ) && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-6 sm:h-8 w-1 bg-primary rounded-full" />
                  <h3 className="text-lg sm:text-2xl font-bold text-foreground">
                    Company Resources
                  </h3>
                  <div className="flex-1 h-px bg-border ml-2 sm:ml-4" />
                </div>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredApps
                    .filter((app) =>
                      ["scex-website", "scex-connect", "sharepoint"].includes(
                        app.id
                      )
                    )
                    .map((app) => (
                      <AppCard key={app.id} app={app} />
                    ))}
                </div>
              </div>
            )}

            {/* Development & Utility Tools */}
            {filteredApps.some((app) =>
              ["raci-matrix", "powerpoint-addin"].includes(app.id)
            ) && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-6 sm:h-8 w-1 bg-primary rounded-full" />
                  <h3 className="text-lg sm:text-2xl font-bold text-foreground">
                    Development & Utility Tools
                  </h3>
                  <div className="flex-1 h-px bg-border ml-2 sm:ml-4" />
                </div>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredApps
                    .filter((app) =>
                      ["raci-matrix", "powerpoint-addin"].includes(app.id)
                    )
                    .map((app) => (
                      <AppCard key={app.id} app={app} />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-10">
                <Image
                  src="/branding/scexie-mascot.png"
                  alt="Scexie"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block h-10 w-px bg-border" />
              <div className="relative h-8 w-24">
                <Image
                  src="/branding/scex-logo.jpg"
                  alt="SCEX"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                © 2024 SCEX. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                Software Optimization & Analytics Suite
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/willem4130/SSO_WarehouseSuite_Frontend_v1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentation
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
