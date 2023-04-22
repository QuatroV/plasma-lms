import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CourseInfo } from "./searchStore";

interface courseState {
  currentCourse?: CourseInfo;
  setCurrentCourse(course: CourseInfo): void;
}

const useCourseStore = create<courseState>()(
  devtools((set) => ({
    currentCourse: undefined,
    setCurrentCourse: (course) => set({ currentCourse: course }),
  }))
);

export default useCourseStore;
