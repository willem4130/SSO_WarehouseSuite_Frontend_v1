import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { feedbackRouter } from "@/server/api/routers/feedback";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  feedback: feedbackRouter,
});

export type AppRouter = typeof appRouter;
