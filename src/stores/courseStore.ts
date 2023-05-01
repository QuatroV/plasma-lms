import { Prisma } from "@prisma/client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type CourseInfo = Prisma.CourseGetPayload<{
  select: {
    id: true;
    name: true;
    shortInfo: true;
    private: true;
  };
}>;

interface courseState {
  currentCourse?: CourseInfo;
  setCurrentCourse(course: CourseInfo): void;

  joined?: boolean;
  setJoined(joined: boolean): void;
}

const useCourseStore = create<courseState>()(
  devtools((set) => ({
    currentCourse: undefined,
    setCurrentCourse: (course) => set({ currentCourse: course }),
    joined: false,
    setJoined: (joined) => set({ joined }),
  }))
);

export default useCourseStore;
