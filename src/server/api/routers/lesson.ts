import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const lessonRouter = createTRPCRouter({
  show: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.lesson.findFirst({ where: { id: input.lessonId } });
    }),
  editContent: protectedProcedure
    .input(z.object({ lessonId: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.lesson.update({
        where: {
          id: input.lessonId,
        },
        data: {
          content: input.content,
        },
      });
    }),
});
