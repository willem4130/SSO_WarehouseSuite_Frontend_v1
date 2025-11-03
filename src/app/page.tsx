import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, BarChart3, Calculator, Package } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <main className="w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Warehouse Management Suite
          </h1>
          <p className="text-xl text-muted-foreground">
            Select a tool to get started
          </p>
        </div>

        {/* Tiles Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Pick Optimizer */}
          <a
            href="https://scex.moreoptimal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-transform hover:scale-105"
          >
            <Card className="h-full cursor-pointer transition-colors hover:border-primary">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  Pick Optimizer
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardTitle>
                <CardDescription>
                  Optimize your warehouse picking operations with advanced
                  algorithms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  External tool • Opens in new tab
                </div>
              </CardContent>
            </Card>
          </a>

          {/* PowerBI Dashboard */}
          <div className="group cursor-not-allowed opacity-60">
            <Card className="h-full">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <BarChart3 className="h-6 w-6 text-muted-foreground" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  PowerBI Dashboard
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>
                  Real-time analytics and insights for your warehouse operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Coming soon • URL to be configured
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pick Location Calculator */}
          <Link
            href="/pick-location-calculator"
            className="group transition-transform hover:scale-105"
          >
            <Card className="h-full cursor-pointer transition-colors hover:border-primary">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  Pick Location Calculator
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardTitle>
                <CardDescription>
                  Calculate optimal pick locations based on product dimensions
                  and volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Web app • Built-in tool
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
