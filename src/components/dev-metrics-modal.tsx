"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CodeStatsKPI } from "@/components/code-stats-kpi";
import { BarChart3 } from "lucide-react";

export function DevMetricsModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <BarChart3 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Metrics</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Development Metrics</DialogTitle>
          <DialogDescription>
            Real-time insights from SCEX custom application development
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <CodeStatsKPI />
        </div>
      </DialogContent>
    </Dialog>
  );
}
