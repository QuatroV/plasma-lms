import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  search: protectedProcedure
    .input(z.object({ phrase: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.course.findMany({
        where: { name: { contains: input.phrase } },
      });
    }),

  shortInfo: protectedProcedure
    .input(z.object({ courseId: z.string(), userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const courseInfo = await ctx.prisma.course.findFirst({
        where: { id: { equals: input.courseId } },
        select: {
          id: true,
          name: true,
          shortInfo: true,
          private: true,
        },
      });

      const courseUser = await ctx.prisma.courseUser.findFirst({
        where: {
          courseId: input.courseId,
          userId: input.userId,
        },
      });

      return { courseInfo, joined: !!courseUser };
    }),

  join: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        userId: z.string(),
        role: z.enum(["LISTENER", "OWNER", "MODERATOR"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const newCourseUser = await ctx.prisma.courseUser.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          course: {
            connect: { id: input.courseId },
          },
          courseRole: "LISTENER",
        },
      });

      await ctx.prisma.course.update({
        where: { id: input.courseId },
        data: {
          CourseUser: { connect: { id: newCourseUser.id } },
        },
      });
    }),

  leave: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const courseUser = await ctx.prisma.courseUser.findFirst({
        where: {
          courseId: input.courseId,
          userId: input.userId,
        },
      });

      if (!courseUser) {
        throw new Error("User not found");
      }

      await ctx.prisma.courseUser.delete({
        where: {
          id: courseUser.id,
        },
      });

      const oldCourse = await ctx.prisma.course.findFirst({
        where: {
          id: input.courseId,
        },
        select: {
          CourseUser: true,
        },
      });

      if (!oldCourse) {
        throw new Error("Course not found");
      }

      await ctx.prisma.course.update({
        where: { id: input.courseId },
        data: {
          CourseUser: {
            set: oldCourse.CourseUser.filter(
              (user) => user.id !== courseUser.id
            ),
          },
        },
      });
    }),
});
