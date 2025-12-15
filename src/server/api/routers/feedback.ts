import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const feedbackRouter = createTRPCRouter({
  // Create new feedback
  create: publicProcedure
    .input(
      z.object({
        appId: z.string(),
        appName: z.string(),
        type: z.enum(["bug", "feature", "issue", "question", "improvement"]),
        title: z.string().min(1).max(200),
        description: z.string().min(1),
        priority: z
          .enum(["low", "medium", "high", "critical"])
          .default("medium"),
        submittedBy: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.feedback.create({
        data: input,
      });
    }),

  // Get all feedback with optional filters
  getAll: publicProcedure
    .input(
      z
        .object({
          appId: z.string().optional(),
          status: z.string().optional(),
          type: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.feedback.findMany({
        where: {
          ...(input?.appId && { appId: input.appId }),
          ...(input?.status && { status: input.status }),
          ...(input?.type && { type: input.type }),
        },
        include: {
          responses: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  // Get feedback by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.feedback.findUnique({
        where: { id: input.id },
        include: {
          responses: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    }),

  // Update feedback status/priority/grading
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z
          .enum(["open", "in_progress", "resolved", "closed"])
          .optional(),
        priority: z.enum(["low", "medium", "high", "critical"]).optional(),
        complexity: z.number().int().min(1).max(5).optional(),
        estimatedHours: z.number().positive().optional(),
        businessValue: z.number().int().min(1).max(5).optional(),
        targetDate: z.date().optional(),
        completedDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;
      const data: Record<string, unknown> = {};

      // Only include fields that are defined
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
          data[key] = value;
        }
      });

      // Auto-set completedDate when status changes to resolved/closed
      if (updates.status === "resolved" || updates.status === "closed") {
        if (!data["completedDate"]) {
          data["completedDate"] = new Date();
        }
      }

      return ctx.db.feedback.update({
        where: { id },
        data,
      });
    }),

  // Add response to feedback
  addResponse: publicProcedure
    .input(
      z.object({
        feedbackId: z.string(),
        message: z.string().min(1),
        author: z.string(),
        isInternal: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.feedbackResponse.create({
        data: input,
      });
    }),

  // Delete feedback
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.feedback.delete({
        where: { id: input.id },
      });
    }),

  // Get feedback stats
  getStats: publicProcedure.query(async ({ ctx }) => {
    const [total, open, inProgress, resolved] = await Promise.all([
      ctx.db.feedback.count(),
      ctx.db.feedback.count({ where: { status: "open" } }),
      ctx.db.feedback.count({ where: { status: "in_progress" } }),
      ctx.db.feedback.count({ where: { status: "resolved" } }),
    ]);

    return { total, open, inProgress, resolved };
  }),
});
