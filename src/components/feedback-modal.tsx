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
import { MessageSquarePlus, Send, X, Upload } from "lucide-react";
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
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string>("");

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
      setScreenshots([]);
      setUploadError("");
      alert("Thank you! Your feedback has been submitted.");
    },
    onError: (error: { message: string }) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadError("");

    // Validate file count
    if (files.length + screenshots.length > 5) {
      setUploadError("Maximum 5 images allowed");
      return;
    }

    // Validate and convert each file to base64
    Array.from(files).forEach((file) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setUploadError("Only image files are allowed");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Image size must be less than 5MB");
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setScreenshots((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = "";
  };

  const removeScreenshot = (index: number) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createFeedback.mutate({
      appId,
      appName,
      ...formData,
      screenshots,
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

          {/* Screenshots */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Screenshots (optional, max 5 images)
            </label>
            <div className="space-y-3">
              {/* Upload button */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() =>
                    document.getElementById("screenshot-upload")?.click()
                  }
                  disabled={screenshots.length >= 5}
                >
                  <Upload className="h-4 w-4" />
                  {screenshots.length === 0
                    ? "Add Screenshots"
                    : `Add More (${screenshots.length}/5)`}
                </Button>
                <input
                  id="screenshot-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
                {uploadError && (
                  <span className="text-xs text-red-600 dark:text-red-400">
                    {uploadError}
                  </span>
                )}
              </div>

              {/* Screenshot previews */}
              {screenshots.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {screenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg border border-border overflow-hidden bg-muted"
                    >
                      <img
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeScreenshot(index)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
