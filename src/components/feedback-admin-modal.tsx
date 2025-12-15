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
import { MessageSquare, Trash2, Send } from "lucide-react";
import { trpc } from "@/lib/trpc-client";
import { Input } from "@/components/ui/input";

export function FeedbackAdminModal() {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(
    null
  );
  const [responseMessage, setResponseMessage] = useState("");
  const [responseAuthor, setResponseAuthor] = useState("");

  // Grading state
  const [editingGrades, setEditingGrades] = useState<
    Record<
      string,
      {
        complexity?: number;
        estimatedHours?: number;
        businessValue?: number;
        targetDate?: string;
      }
    >
  >({});

  // Filtering and sorting
  const [selectedComplexity, setSelectedComplexity] = useState<
    number | undefined
  >();
  const [selectedBusinessValue, setSelectedBusinessValue] = useState<
    number | undefined
  >();
  const [sortBy, setSortBy] = useState<string>("createdAt"); // createdAt, businessValue, complexity, targetDate

  const { data: feedback, refetch } = trpc.feedback.getAll.useQuery(
    {
      status: selectedStatus,
      type: selectedType,
    },
    { enabled: open }
  );

  const { data: stats } = trpc.feedback.getStats.useQuery(undefined, {
    enabled: open,
  });

  const updateFeedback = trpc.feedback.update.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const addResponse = trpc.feedback.addResponse.useMutation({
    onSuccess: () => {
      setResponseMessage("");
      setResponseAuthor("");
      void refetch();
    },
  });

  const deleteFeedback = trpc.feedback.delete.useMutation({
    onSuccess: () => {
      setSelectedFeedbackId(null);
      void refetch();
    },
  });

  // Filter and sort feedback
  const filteredAndSortedFeedback = feedback
    ? [...feedback]
        .filter((item: any) => {
          // Filter by complexity
          if (
            selectedComplexity !== undefined &&
            item.complexity !== selectedComplexity
          ) {
            return false;
          }
          // Filter by business value
          if (
            selectedBusinessValue !== undefined &&
            item.businessValue !== selectedBusinessValue
          ) {
            return false;
          }
          return true;
        })
        .sort((a: any, b: any) => {
          switch (sortBy) {
            case "createdAt":
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            case "businessValue":
              return (b.businessValue ?? 0) - (a.businessValue ?? 0);
            case "complexity":
              return (b.complexity ?? 0) - (a.complexity ?? 0);
            case "estimatedHours":
              return (b.estimatedHours ?? 0) - (a.estimatedHours ?? 0);
            case "targetDate":
              if (!a.targetDate && !b.targetDate) return 0;
              if (!a.targetDate) return 1;
              if (!b.targetDate) return -1;
              return (
                new Date(a.targetDate).getTime() -
                new Date(b.targetDate).getTime()
              );
            default:
              return 0;
          }
        })
    : [];

  const typeColors = {
    bug: "text-red-700 dark:text-red-400 bg-red-500/15 border-red-500/30",
    feature:
      "text-purple-700 dark:text-purple-400 bg-purple-500/15 border-purple-500/30",
    issue:
      "text-orange-700 dark:text-orange-400 bg-orange-500/15 border-orange-500/30",
    question:
      "text-blue-700 dark:text-blue-400 bg-blue-500/15 border-blue-500/30",
    improvement:
      "text-green-700 dark:text-green-400 bg-green-500/15 border-green-500/30",
  };

  const statusColors = {
    open: "text-blue-700 dark:text-blue-400 bg-blue-500/15 border-blue-500/30",
    in_progress:
      "text-orange-700 dark:text-orange-400 bg-orange-500/15 border-orange-500/30",
    resolved:
      "text-green-700 dark:text-green-400 bg-green-500/15 border-green-500/30",
    closed:
      "text-gray-700 dark:text-gray-400 bg-gray-500/15 border-gray-500/30",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Feedback</span>
          {stats && stats.open > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {stats.open}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="!w-[98vw] !h-[98vh] !max-w-none sm:!max-w-none overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl">Feedback Dashboard</DialogTitle>
          <DialogDescription>
            Manage user feedback, bugs, and feature requests
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1">
          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="px-4 py-3 rounded-lg bg-muted border border-border">
                <div className="text-2xl font-bold text-foreground">
                  {stats.total}
                </div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              <div className="px-4 py-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  {stats.open}
                </div>
                <div className="text-xs text-muted-foreground">Open</div>
              </div>
              <div className="px-4 py-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                  {stats.inProgress}
                </div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
              <div className="px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                  {stats.resolved}
                </div>
                <div className="text-xs text-muted-foreground">Resolved</div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Status:
              </span>
              <Button
                variant={selectedStatus === undefined ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus(undefined)}
              >
                All
              </Button>
              {["open", "in_progress", "resolved", "closed"].map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                >
                  {status.replace("_", " ")}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Type:
              </span>
              <Button
                variant={selectedType === undefined ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(undefined)}
              >
                All
              </Button>
              {["bug", "feature", "issue", "question", "improvement"].map(
                (type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Grading Filters */}
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Complexity:
              </span>
              <Button
                variant={
                  selectedComplexity === undefined ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedComplexity(undefined)}
              >
                All
              </Button>
              {[1, 2, 3, 4, 5].map((level) => (
                <Button
                  key={level}
                  variant={selectedComplexity === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedComplexity(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Business Value:
              </span>
              <Button
                variant={
                  selectedBusinessValue === undefined ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedBusinessValue(undefined)}
              >
                All
              </Button>
              {[1, 2, 3, 4, 5].map((level) => (
                <Button
                  key={level}
                  variant={
                    selectedBusinessValue === level ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedBusinessValue(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Sorting */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Sort by:
              </span>
              <Button
                variant={sortBy === "createdAt" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("createdAt")}
              >
                Date
              </Button>
              <Button
                variant={sortBy === "businessValue" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("businessValue")}
              >
                Business Value
              </Button>
              <Button
                variant={sortBy === "complexity" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("complexity")}
              >
                Complexity
              </Button>
              <Button
                variant={sortBy === "estimatedHours" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("estimatedHours")}
              >
                Est. Hours
              </Button>
              <Button
                variant={sortBy === "targetDate" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("targetDate")}
              >
                Target Date
              </Button>
            </div>
          </div>

          {/* Feedback List */}
          <div className="mt-6 space-y-3">
            {filteredAndSortedFeedback.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No feedback found
              </div>
            ) : (
              filteredAndSortedFeedback.map((item: any) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => setSelectedFeedbackId(item.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3 className="font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-md text-xs font-bold border ${typeColors[item.type as keyof typeof typeColors]}`}
                        >
                          {item.type}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-xs font-bold border ${statusColors[item.status as keyof typeof statusColors]}`}
                        >
                          {item.status.replace("_", " ")}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.appName}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>By: {item.submittedBy}</span>
                        <span>•</span>
                        <span>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        {item.responses.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{item.responses.length} responses</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        className="px-2 py-1 rounded-md text-xs border border-border bg-background"
                        value={item.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateFeedback.mutate({
                            id: item.id,
                            status: e.target.value as
                              | "open"
                              | "in_progress"
                              | "resolved"
                              | "closed",
                          });
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-500/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            confirm(
                              "Are you sure you want to delete this feedback?"
                            )
                          ) {
                            deleteFeedback.mutate({ id: item.id });
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Show responses if this feedback is selected */}
                  {selectedFeedbackId === item.id && (
                    <div className="mt-4 pt-4 border-t border-border space-y-4">
                      {/* Full Description */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-foreground">
                          Full Description
                        </h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {item.description}
                        </p>
                      </div>

                      {/* Screenshots */}
                      {item.screenshots && item.screenshots.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-foreground">
                            Screenshots ({item.screenshots.length})
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {item.screenshots.map(
                              (screenshot: string, index: number) => (
                                <a
                                  key={index}
                                  href={screenshot}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="relative group rounded-lg border border-border overflow-hidden bg-muted hover:border-primary/50 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <img
                                    src={screenshot}
                                    alt={`Screenshot ${index + 1}`}
                                    className="w-full h-32 object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">
                                      Click to enlarge
                                    </span>
                                  </div>
                                </a>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Project Management Grading */}
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                          <span>📊</span> Project Management
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {/* Complexity */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">
                              Complexity
                            </label>
                            <select
                              className="w-full px-2 py-1.5 rounded-md text-sm border border-border bg-background"
                              value={
                                editingGrades[item.id]?.complexity ??
                                item.complexity ??
                                ""
                              }
                              onChange={(e) => {
                                const value = e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined;
                                setEditingGrades((prev) => ({
                                  ...prev,
                                  [item.id]: {
                                    ...prev[item.id],
                                    complexity: value,
                                  },
                                }));
                                if (value) {
                                  updateFeedback.mutate({
                                    id: item.id,
                                    complexity: value,
                                  });
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="">Not set</option>
                              <option value="1">1 - Trivial</option>
                              <option value="2">2 - Simple</option>
                              <option value="3">3 - Moderate</option>
                              <option value="4">4 - Complex</option>
                              <option value="5">5 - Very Complex</option>
                            </select>
                          </div>

                          {/* Estimated Hours */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">
                              Est. Hours
                            </label>
                            <Input
                              type="number"
                              step="0.5"
                              min="0"
                              placeholder="0"
                              className="h-9 text-sm"
                              value={
                                editingGrades[item.id]?.estimatedHours ??
                                item.estimatedHours ??
                                ""
                              }
                              onChange={(e) => {
                                const value = e.target.value
                                  ? parseFloat(e.target.value)
                                  : undefined;
                                setEditingGrades((prev) => ({
                                  ...prev,
                                  [item.id]: {
                                    ...prev[item.id],
                                    estimatedHours: value,
                                  },
                                }));
                              }}
                              onBlur={(e) => {
                                const value = e.target.value
                                  ? parseFloat(e.target.value)
                                  : undefined;
                                if (value !== undefined) {
                                  updateFeedback.mutate({
                                    id: item.id,
                                    estimatedHours: value,
                                  });
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>

                          {/* Business Value */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">
                              Business Value
                            </label>
                            <select
                              className="w-full px-2 py-1.5 rounded-md text-sm border border-border bg-background"
                              value={
                                editingGrades[item.id]?.businessValue ??
                                item.businessValue ??
                                ""
                              }
                              onChange={(e) => {
                                const value = e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined;
                                setEditingGrades((prev) => ({
                                  ...prev,
                                  [item.id]: {
                                    ...prev[item.id],
                                    businessValue: value,
                                  },
                                }));
                                if (value) {
                                  updateFeedback.mutate({
                                    id: item.id,
                                    businessValue: value,
                                  });
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="">Not set</option>
                              <option value="1">1 - Nice to have</option>
                              <option value="2">2 - Low</option>
                              <option value="3">3 - Medium</option>
                              <option value="4">4 - High</option>
                              <option value="5">5 - Critical</option>
                            </select>
                          </div>

                          {/* Target Date */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">
                              Target Date
                            </label>
                            <Input
                              type="date"
                              className="h-9 text-sm"
                              value={
                                editingGrades[item.id]?.targetDate ??
                                (item.targetDate
                                  ? new Date(item.targetDate)
                                      .toISOString()
                                      .split("T")[0]
                                  : "")
                              }
                              onChange={(e) => {
                                const value = e.target.value || undefined;
                                setEditingGrades((prev) => ({
                                  ...prev,
                                  [item.id]: {
                                    ...prev[item.id],
                                    targetDate: value,
                                  },
                                }));
                                if (value) {
                                  updateFeedback.mutate({
                                    id: item.id,
                                    targetDate: new Date(value),
                                  });
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>

                        {/* Show completion date if resolved/closed */}
                        {item.completedDate && (
                          <div className="mt-3 text-xs text-muted-foreground">
                            Completed:{" "}
                            {new Date(item.completedDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      <h4 className="font-semibold text-sm text-foreground">
                        Responses
                      </h4>
                      {item.responses.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No responses yet
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {item.responses.map((response: any) => (
                            <div
                              key={response.id}
                              className={`p-3 rounded-md ${response.isInternal ? "bg-yellow-500/10 border border-yellow-500/20" : "bg-muted"}`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-semibold text-foreground">
                                  {response.author}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(
                                    response.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-foreground">
                                {response.message}
                              </p>
                              {response.isInternal && (
                                <span className="text-xs text-yellow-700 dark:text-yellow-400">
                                  Internal note
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Response Form */}
                      <div className="space-y-2 pt-3">
                        <Input
                          placeholder="Your name"
                          value={responseAuthor}
                          onChange={(e) => setResponseAuthor(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <textarea
                          placeholder="Add a response..."
                          value={responseMessage}
                          onChange={(e) => setResponseMessage(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          rows={3}
                          className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (responseMessage && responseAuthor) {
                                addResponse.mutate({
                                  feedbackId: item.id,
                                  message: responseMessage,
                                  author: responseAuthor,
                                  isInternal: false,
                                });
                              }
                            }}
                            disabled={!responseMessage || !responseAuthor}
                          >
                            <Send className="h-3 w-3" />
                            Send Response
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (responseMessage && responseAuthor) {
                                addResponse.mutate({
                                  feedbackId: item.id,
                                  message: responseMessage,
                                  author: responseAuthor,
                                  isInternal: true,
                                });
                              }
                            }}
                            disabled={!responseMessage || !responseAuthor}
                          >
                            Add Internal Note
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
