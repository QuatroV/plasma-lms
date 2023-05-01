import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { courseRouter } from "./routers/course";
import { lessonRouter } from "./routers/lesson";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  course: courseRouter,
  lesson: lessonRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
