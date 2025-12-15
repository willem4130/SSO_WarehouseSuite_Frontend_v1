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
import { Input } from "@/components/ui/input";
import { MessageSquarePlus, Send } from "lucide-react";
import { trpc } from "@/lib/trpc-client";

interface FeedbackModalProps {
  appId: string;
  appName: string;
}

export function FeedbackModal({ appId, appName }: FeedbackModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "issue" as "bug" | "feature" | "issue" | "question" | "improvement",
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high" | "critical",
    submittedBy: "",
  });

  const createFeedback = trpc.feedback.create.useMutation({
    onSuccess: () => {
      setOpen(false);
      setFormData({
        type: "issue",
        title: "",
        description: "",
        priority: "medium",
        submittedBy: "",
      });
      alert("Thank you! Your feedback has been submitted.");
    },
    onError: (error: { message: string }) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createFeedback.mutate({
      appId,
      appName,
      ...formData,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={(e) => e.stopPropagation()}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"
            title="Send Feedback"
          >
            <MessageSquarePlus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent
        className="max-w-2xl"
        onClick={(e) => e.stopPropagation()}
        onPointerDownOutside={(e) => e.stopPropagation()}
        onInteractOutside={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Send Feedback</DialogTitle>
          <DialogDescription>
            Report a bug, request a feature, or share your ideas for{" "}
            <span className="font-semibold text-foreground">{appName}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Feedback Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              What type of feedback is this? *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { value: "bug", label: "Bug" },
                { value: "feature", label: "Feature" },
                { value: "issue", label: "Issue" },
                { value: "question", label: "Question" },
                { value: "improvement", label: "Idea" },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      type: type.value as typeof formData.type,
                    }))
                  }
                  className={`px-3 py-2 rounded-md text-sm font-medium border transition-colors ${
                    formData.type === type.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/50 hover:bg-accent"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              Title *
            </label>
            <Input
              id="title"
              placeholder="Brief summary of your feedback"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
              maxLength={200}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-foreground"
            >
              Description *
            </label>
            <textarea
              id="description"
              placeholder="Please provide details... (Steps to reproduce, expected behavior, etc.)"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
              rows={6}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Priority (optional)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: "low", label: "Low", color: "gray" },
                { value: "medium", label: "Medium", color: "blue" },
                { value: "high", label: "High", color: "orange" },
                { value: "critical", label: "Critical", color: "red" },
              ].map((priority) => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      priority: priority.value as typeof formData.priority,
                    }))
                  }
                  className={`px-3 py-2 rounded-md text-sm font-medium border transition-all ${
                    formData.priority === priority.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/50"
                  }`}
                >
                  {priority.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submitted By */}
          <div className="space-y-2">
            <label
              htmlFor="submittedBy"
              className="text-sm font-medium text-foreground"
            >
              Your Name or Email *
            </label>
            <Input
              id="submittedBy"
              placeholder="So we can follow up with you"
              value={formData.submittedBy}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  submittedBy: e.target.value,
                }))
              }
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 gap-2"
              disabled={createFeedback.isPending}
            >
              {createFeedback.isPending ? (
                "Sending..."
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Feedback
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
