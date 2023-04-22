import useCourseStore from "~/stores/courseStore";
import CourseInfoHeader from "./CourseInfoHeader";
import CourseInfoShortInfo from "./CourseInfoShortInfo";
import CourseInfoLessons from "./CourseInfoLessons";
import CourseInfoPeople from "./CourseInfoPeople";

const CourseInfo = () => {
  const currentCourse = useCourseStore((state) => state.currentCourse);

  if (!currentCourse) {
    return null;
  }

  return (
    <main className="flex h-full flex-auto flex-col gap-2 p-2">
      <CourseInfoHeader item={currentCourse} />
      <CourseInfoShortInfo />
      <div className="flex flex-initial gap-2">
        <CourseInfoLessons />
        <CourseInfoPeople />
      </div>
    </main>
  );
};

export default CourseInfo;
