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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Feedback Dashboard</DialogTitle>
          <DialogDescription>
            Manage user feedback, bugs, and feature requests
          </DialogDescription>
        </DialogHeader>

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

        {/* Feedback List */}
        <div className="mt-6 space-y-3">
          {!feedback || feedback.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No feedback found
            </div>
          ) : (
            feedback.map((item: any) => (
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
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
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
      </DialogContent>
    </Dialog>
  );
}
