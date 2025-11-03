import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Calculator } from "lucide-react";

export default function PickLocationCalculator() {
  return (
    <div className="flex min-h-screen flex-col bg-background p-8">
      <ThemeToggle />
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Main content */}
      <main className="mx-auto w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Pick Location Calculator
              </h1>
              <p className="text-lg text-muted-foreground">
                Calculate optimal pick locations based on product dimensions
              </p>
            </div>
          </div>
        </div>

        {/* Placeholder card */}
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              This tool is currently under development
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The Pick Location Calculator will help you:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                Calculate optimal pick locations based on product dimensions
              </li>
              <li>Determine storage capacity and volume utilization</li>
              <li>Optimize warehouse layout efficiency</li>
              <li>Generate location recommendations</li>
            </ul>
            <div className="mt-6 rounded-lg bg-muted p-4">
              <p className="text-sm font-medium">Database Required</p>
              <p className="text-sm text-muted-foreground">
                This feature requires database integration for storing and
                retrieving location data.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
