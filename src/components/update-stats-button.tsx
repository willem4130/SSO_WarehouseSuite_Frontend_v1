"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function UpdateStatsButton() {
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [updatedCode, setUpdatedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchAndUpdateStats = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/repo-stats");
      const data = await response.json();

      if (!data.stats || data.stats.length === 0) {
        alert(
          "Failed to fetch stats. Make sure GITHUB_TOKEN is set in Vercel environment variables."
        );
        return;
      }

      // Generate the TypeScript file content
      const fileContent = `// Static repository statistics
// Last updated: ${new Date().toISOString().split("T")[0]}
// Update these by clicking the "Update Stats" button in the admin panel

export const REPO_STATS = ${JSON.stringify(data.stats, null, 2)};

export const TOTAL_STATS = {
  totalRepos: REPO_STATS.length,
  totalLines: REPO_STATS.reduce((sum, stat) => sum + stat.lines, 0),
  totalHoursMin: REPO_STATS.reduce((sum, stat) => sum + stat.hoursMin, 0),
  totalHoursMax: REPO_STATS.reduce((sum, stat) => sum + stat.hoursMax, 0),
};
`;

      setUpdatedCode(fileContent);
      setShowDialog(true);
    } catch (error) {
      console.error("Error fetching stats:", error);
      alert(
        "Failed to fetch repository statistics. Check console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    const blob = new Blob([updatedCode], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "repo-stats.ts";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(updatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Button
        onClick={fetchAndUpdateStats}
        disabled={loading}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        {loading ? "Fetching..." : "Update Stats"}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Updated Repository Statistics</DialogTitle>
            <DialogDescription>
              Copy the code below and replace the contents of{" "}
              <code className="bg-muted px-1 py-0.5 rounded">
                src/data/repo-stats.ts
              </code>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={downloadFile} size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download File
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </div>

            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[400px] text-xs">
                <code>{updatedCode}</code>
              </pre>
            </div>

            <p className="text-sm text-muted-foreground">
              💡 <strong>Instructions:</strong>
              <br />
              1. Download or copy the code above
              <br />
              2. Replace the contents of{" "}
              <code className="bg-muted px-1 py-0.5 rounded">
                src/data/repo-stats.ts
              </code>
              <br />
              3. Commit and push the changes
              <br />
              4. Vercel will automatically redeploy with updated stats
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
