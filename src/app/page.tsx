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
import { RepoStatsBadge } from "@/components/repo-stats-badge";
import { DevMetricsModal } from "@/components/dev-metrics-modal";
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
  Info,
  ExternalLink,
  BookOpen,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AppStatus = "production" | "in-progress" | "beta";
type AppCategory =
  | "optimization"
  | "analytics"
  | "collaboration"
  | "automation"
  | "tools";

interface TechDetails {
  stack: string[];
  databases?: string[];
  entities?: number;
  calculations?: string[];
  highlights?: string[];
}

interface AppInfo {
  overview: string;
  keyFeatures: string[];
  howToUse: string[];
  tips: string[];
  githubRepo?: string;
  techDetails?: TechDetails;
}

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
  info?: AppInfo;
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
    info: {
      overview:
        "A powerful sales forecasting tool designed for LinkedIn and other platforms. Features interactive BI dashboards, advanced filtering, and professional data visualization. Built with Next.js 16 and includes demo mode for presentations.",
      keyFeatures: [
        "Interactive sales forecasting dashboard with real-time updates",
        "Advanced filtering by product, region, and time period",
        "Professional BI-style visualizations and charts",
        "Demo mode with sample data for presentations",
        "Export capabilities for reports and analysis",
        "Responsive design for desktop and mobile use",
      ],
      howToUse: [
        "Navigate to the dashboard to view current forecasts",
        "Use the filters (product, region, date range) to customize your view",
        "Toggle between actual data and forecast projections",
        "Click on charts for detailed breakdowns and insights",
        "Export data using the export button in the top-right",
        "Use Demo Mode (toggle in settings) for client presentations",
      ],
      tips: [
        "Start with the demo mode if you're new to the tool",
        "Use the date range picker to focus on specific quarters",
        "Combine multiple filters for granular analysis",
        "Export forecasts before important meetings for offline review",
        "Check the 'What-If' scenarios tab for strategic planning",
      ],
      githubRepo: "https://github.com/willem4130/sso-forecaster",
      techDetails: {
        stack: [
          "Next.js 16",
          "React 19",
          "TypeScript",
          "Tailwind CSS",
          "Recharts",
        ],
        databases: ["PostgreSQL (Supabase)"],
        entities: 8,
        calculations: [
          "Time-series forecasting algorithms",
          "Weighted moving averages",
          "Seasonal trend decomposition",
          "YoY growth projections",
        ],
        highlights: [
          "Real-time dashboard with interactive charts",
          "Advanced filtering (product, region, date range)",
          "Demo mode with realistic sample data",
          "Export to Excel/PDF functionality",
        ],
      },
    },
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
    info: {
      overview:
        "Truck Type Calculator and Total Cost of Ownership (TCO) analysis tool. Helps determine optimal trailer types and calculate comprehensive ownership costs for warehouse and logistics operations.",
      keyFeatures: [
        "Trailer type recommendations based on load requirements",
        "Comprehensive TCO calculations (purchase, maintenance, fuel, etc.)",
        "Side-by-side comparison of different truck/trailer options",
        "Cost breakdown by category (capital, operational, maintenance)",
        "Customizable parameters for accurate cost modeling",
        "Export reports for budget planning and presentations",
      ],
      howToUse: [
        "Navigate to the calculator page",
        "Enter your load requirements (weight, volume, frequency)",
        "Select trailer types to compare",
        "Input cost parameters (purchase price, fuel costs, maintenance)",
        "Review the calculated TCO for each option",
        "Export the comparison report for decision-making",
      ],
      tips: [
        "Include all costs (insurance, licensing, storage) for accurate TCO",
        "Use historical data from similar operations if available",
        "Factor in depreciation over your expected ownership period",
        "Compare at least 3 options to ensure you're finding the best value",
        "Update fuel costs regularly as they fluctuate significantly",
      ],
      githubRepo: "https://github.com/willem4130/sso-trucktypecalculator-2.0",
    },
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
    info: {
      overview:
        "Visual prioritization tool for organizational improvement ideas using an effort vs. business value matrix. Helps teams make data-driven decisions about which initiatives to pursue first.",
      keyFeatures: [
        "2x2 matrix visualization (Effort vs. Business Value)",
        "Drag-and-drop idea positioning for easy prioritization",
        "Organization and team-level categorization",
        "Color-coded quadrants for quick decision making",
        "Export capabilities for presentations and reports",
        "Collaborative mode for team workshops",
      ],
      howToUse: [
        "Create an organization or select an existing one",
        "Add improvement ideas using the '+ New Idea' button",
        "Drag ideas onto the matrix (low/high effort, low/high value)",
        "Use the quadrants to identify 'Quick Wins' and 'Strategic Bets'",
        "Export the matrix for stakeholder presentations",
        "Invite team members to collaborate on prioritization",
      ],
      tips: [
        "Start with 'Quick Wins' (high value, low effort) for momentum",
        "Avoid 'Time Wasters' (low value, low effort) unless very easy",
        "Debate 'Strategic Bets' carefully - they're high effort but high reward",
        "Use this in quarterly planning sessions for maximum impact",
        "Revisit and update the matrix monthly as priorities shift",
      ],
      githubRepo: "https://github.com/willem4130/impactmatrix",
    },
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
    info: {
      overview:
        "Automated company research tool that scrapes company information and syncs it directly with HubSpot CRM. Integrates with N8N workflows for automated lead enrichment and contact management.",
      keyFeatures: [
        "Automated company data scraping from multiple sources",
        "Direct HubSpot CRM integration via webhooks",
        "N8N workflow automation for data processing",
        "Batch processing for multiple companies",
        "Real-time data enrichment and updates",
        "Custom field mapping for HubSpot properties",
      ],
      howToUse: [
        "Enter a company name or domain in the search field",
        "Click 'Research' to start the automated scraping process",
        "Review the scraped data before syncing to HubSpot",
        "Click 'Sync to HubSpot' to create/update the company record",
        "Use batch mode to process multiple companies at once",
        "Check the webhook logs to verify successful syncing",
      ],
      tips: [
        "Use company domains (e.g., 'scex.nl') for more accurate results",
        "Review data before syncing to avoid duplicate records",
        "Set up N8N workflows for automatic nightly sync",
        "Use tags to categorize companies during research",
        "Check HubSpot after syncing to verify all fields mapped correctly",
      ],
      githubRepo:
        "https://github.com/willem4130/Hubspot-CompanyScrape-Hubspot_v1",
    },
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
    info: {
      overview:
        "Production-ready automation system for Simplicate project management. Handles contract distribution, hours reminders, and automated invoice generation. Reduces manual work and ensures timely project tracking.",
      keyFeatures: [
        "Automated contract distribution to team members",
        "Smart hours reminder system with customizable schedules",
        "Automated invoice generation from project data",
        "Custom dashboards for project health monitoring",
        "Integration with Simplicate API for real-time sync",
        "Email notifications and Slack alerts",
      ],
      howToUse: [
        "Access the admin dashboard to view automation status",
        "Configure reminder schedules in the Settings tab",
        "Set up contract distribution rules by project type",
        "Review automated invoices before sending to clients",
        "Monitor the activity log for automation history",
        "Use the manual trigger button for one-off tasks",
      ],
      tips: [
        "Set reminders for Friday afternoon to ensure weekend hour logging",
        "Review contract distributions weekly to catch any misalignments",
        "Check the dashboard Monday morning for week-over-week insights",
        "Use Slack notifications for urgent items only to avoid alert fatigue",
        "Keep backup manual processes for critical invoice periods",
      ],
      githubRepo: "https://github.com/willem4130/simplicate-workspace",
    },
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
    info: {
      overview:
        "RACI Matrix tool for defining project roles and responsibilities. RACI stands for Responsible, Accountable, Consulted, and Informed - helping teams clarify who does what in projects and avoid confusion.",
      keyFeatures: [
        "Visual RACI matrix grid with drag-and-drop assignment",
        "Project and task management integration",
        "Team member role assignment (R, A, C, I)",
        "Export matrices for project documentation",
        "Multi-project support with templates",
        "Collaboration mode for team workshops",
      ],
      howToUse: [
        "Create a new project or select an existing one",
        "Add team members and define their roles",
        "List all project tasks or deliverables",
        "Assign RACI designations (R/A/C/I) for each task/person combination",
        "Review the matrix to ensure each task has exactly one 'A' (Accountable)",
        "Export the matrix for stakeholder review and project kickoff",
      ],
      tips: [
        "Each task should have exactly ONE person Accountable (A)",
        "Multiple people can be Responsible (R) but keep it focused",
        "Use Consulted (C) sparingly to avoid decision bottlenecks",
        "Keep Informed (I) lists short to prevent information overload",
        "Review and update the matrix at project milestones",
      ],
      githubRepo: "https://github.com/willem4130/SSO-RACI",
    },
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
    info: {
      overview:
        "PowerPoint Office Add-in for managing placeholders in presentation templates. Streamlines the process of creating and maintaining consistent branded presentations with dynamic content replacement.",
      keyFeatures: [
        "Manage placeholders in PowerPoint slides programmatically",
        "Bulk find and replace across all slides",
        "Template creation with standardized placeholders",
        "Preview changes before applying",
        "Export placeholder inventory for documentation",
        "Integration with PowerPoint's Office.js API",
      ],
      howToUse: [
        "Install the add-in in PowerPoint (via manifest file)",
        "Open your presentation template in PowerPoint",
        "Click the add-in icon in the ribbon to launch",
        "Scan slides to identify all placeholders",
        "Replace placeholders with actual content or new placeholders",
        "Apply changes and save your presentation",
      ],
      tips: [
        "Use consistent placeholder naming conventions (e.g., {{CLIENT_NAME}})",
        "Test the add-in on a copy of your presentation first",
        "Create a placeholder reference document for team members",
        "Use the bulk replace feature to update recurring elements",
        "Keep a master template with all standard placeholders",
      ],
      githubRepo: "https://github.com/willem4130/powerpoint-placeholder-addin",
    },
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

// App Info Modal Component
function AppInfoModal({ app }: { app: App }) {
  const [open, setOpen] = useState(false);

  if (!app.info) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={(e) => e.stopPropagation()}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
          >
            <Info className="h-4 w-4" />
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent
        className="max-w-3xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onPointerDownOutside={(e) => e.stopPropagation()}
        onInteractOutside={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {app.icon}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{app.name}</DialogTitle>
              <DialogDescription className="text-sm mt-1">
                {app.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Overview */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Overview</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {app.info.overview}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Key Features</h3>
            </div>
            <ul className="space-y-2">
              {app.info.keyFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to Use */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">How to Use</h3>
            </div>
            <ol className="space-y-2">
              {app.info.howToUse.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-semibold text-xs shrink-0">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Tips & Best Practices</h3>
            </div>
            <ul className="space-y-2">
              {app.info.tips.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Lightbulb className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Details */}
          {app.info.techDetails && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Database className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Technical Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tech Stack */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-muted-foreground">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {app.info.techDetails.stack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Databases */}
                {app.info.techDetails.databases &&
                  app.info.techDetails.databases.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Databases
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {app.info.techDetails.databases.map((db, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium"
                          >
                            {db}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Entities */}
                {app.info.techDetails.entities !== undefined && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      Data Models
                    </h4>
                    <div className="text-2xl font-bold text-primary">
                      {app.info.techDetails.entities} entities
                    </div>
                  </div>
                )}

                {/* Calculations */}
                {app.info.techDetails.calculations &&
                  app.info.techDetails.calculations.length > 0 && (
                    <div className="space-y-2 md:col-span-2">
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Key Calculations
                      </h4>
                      <ul className="space-y-1">
                        {app.info.techDetails.calculations.map(
                          (calc, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                              <span>{calc}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* Highlights */}
                {app.info.techDetails.highlights &&
                  app.info.techDetails.highlights.length > 0 && (
                    <div className="space-y-2 md:col-span-2">
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Technical Highlights
                      </h4>
                      <ul className="space-y-1">
                        {app.info.techDetails.highlights.map(
                          (highlight, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* GitHub Repo Link & Stats */}
          {app.info.githubRepo && (
            <div className="pt-4 border-t space-y-3">
              <a
                href={app.info.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                View on GitHub
              </a>
              <RepoStatsBadge githubRepo={app.info.githubRepo} />
            </div>
          )}

          {/* Open App Button */}
          <div className="flex gap-3">
            <Button asChild className="flex-1">
              <a href={app.url} target="_blank" rel="noopener noreferrer">
                Open {app.name}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// App Card Component
function AppCard({ app }: { app: App }) {
  const handleCardClick = () => {
    window.open(app.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="group transition-all duration-300 hover:scale-[1.02]">
      <Card
        className="h-full cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden"
        onClick={handleCardClick}
      >
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="relative">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
              {app.icon}
            </div>
            <div className="flex flex-col gap-2 items-end">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 ${statusColors[app.status]}`}
                >
                  {statusLabels[app.status]}
                </span>
                {app.info && <AppInfoModal app={app} />}
              </div>
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
    </div>
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
              <DevMetricsModal />
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
