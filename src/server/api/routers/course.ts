import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  search: protectedProcedure
    .input(z.object({ phrase: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.course.findMany({
        where: { name: { contains: input.phrase } },
      });
    }),

  shortInfo: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.course.findMany({
        where: { name: { contains: input.id } },
        include: {
          lessons: true,
          CourseUser: true,
        },
      });
    }),

  join: protectedProcedure
    .input(z.object({ courseId: z.string(), userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      await ctx.prisma.course.update({
        where: { id: input.courseId },
        data: {
          CourseUser: { connect: { id: input.userId } },
        },
      });
    }),
});
