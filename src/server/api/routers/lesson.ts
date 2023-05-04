import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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

  create: protectedProcedure
    .input(z.object({ name: z.string(), courseId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const createdLesson = await ctx.prisma.lesson.create({
        data: {
          name: input.name,
        },
      });

      const updatedCourse = await ctx.prisma.course.update({
        where: {
          id: input.courseId,
        },
        data: {
          lessons: {
            connect: {
              id: createdLesson.id,
            },
          },
        },
        include: {
          lessons: true,
        },
      });

      return updatedCourse;
    }),

  delete: protectedProcedure
    .input(z.object({ courseId: z.string(), lessonId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.lesson.delete({
        where: {
          id: input.lessonId,
        },
      });

      const updatedCourse = await ctx.prisma.course.findFirst({
        where: {
          id: input.courseId,
        },
        include: {
          lessons: true,
        },
      });

      return updatedCourse;
    }),
});
