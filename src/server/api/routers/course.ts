import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  search: protectedProcedure
    .input(z.object({ phrase: z.string() }))
    .query(async ({ input, ctx }) => {
      const courses = await ctx.prisma.course.findMany({
        select: {
          id: true,
          name: true,
          private: true,
          CourseUser: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
            where: {
              courseRole: { equals: "OWNER" },
            },
          },
        },
        where: { name: { contains: input.phrase } },
      });

      return courses;
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
          lessons: true,
          CourseUser: {
            select: {
              courseRole: true,
              user: {
                select: {
                  image: true,
                  email: true,
                  name: true,
                  surname: true,
                  role: true,
                },
              },
            },
          },
        },
      });

      const courseUser = await ctx.prisma.courseUser.findFirst({
        where: {
          courseId: input.courseId,
          userId: input.userId,
        },
      });

      return { courseInfo, courseUser };
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

  mainPage: publicProcedure.query(async ({ input, ctx }) => {
    return ctx.prisma.course.findMany({
      where: { private: false },
      take: 4,
    });
  }),

  create: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session.user.id) {
      throw new Error("No user id obtained from the context");
    }

    const newCourse = await ctx.prisma.course.create({
      data: {
        name: `${ctx.session.user.name}'s course`,
      },
    });

    const courseOwner = await ctx.prisma.courseUser.create({
      data: {
        courseId: newCourse.id,
        userId: ctx.session.user.id,
        courseRole: "OWNER",
      },
    });

    const courseWithOwner = await ctx.prisma.course.update({
      where: {
        id: newCourse.id,
      },
      data: {
        CourseUser: { set: { id: courseOwner.id } },
      },
    });

    return courseWithOwner;
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        shortInfo: z.string(),
        private: z.union([z.boolean(), z.null()]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updatedCourse = await ctx.prisma.course.update({
        where: { id: input.id },
        data: {
          name: input.name,
          shortInfo: input.shortInfo,
          private: input.private,
        },
        include: {
          lessons: true,
        },
      });

      return updatedCourse;
    }),
});
