import useCourseStore from "~/stores/courseStore";
import CourseInfoHeader from "./CourseInfoHeader";
import CourseInfoShortInfo from "./CourseInfoShortInfo";
import CourseInfoLessons from "./CourseInfoLessons";
import CourseInfoPeople from "./CourseInfoPeople";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const CourseInfo = (): JSX.Element | null => {
  const currentCourse = useCourseStore((state) => state.currentCourse);
  const setCurrentCourse = useCourseStore((state) => state.setCurrentCourse);
  const setJoined = useCourseStore((state) => state.setJoined);

  const { data: session } = useSession();

  const courseQuery = api.course.shortInfo.useQuery(
    { userId: session?.user?.id || "", courseId: currentCourse?.id || "" },
    { enabled: !!currentCourse }
  );

  if (courseQuery.data) {
    const { joined, courseInfo } = courseQuery.data;

    if (!courseInfo) return null;

    setCurrentCourse(courseInfo);
    setJoined(joined);
  }

  console.log({ currentCourse });

  if (!currentCourse) {
    return null;
  }

  return (
    <main className="flex h-full flex-auto flex-col gap-2 p-2">
      <CourseInfoHeader item={currentCourse} />
      <CourseInfoShortInfo shortInfo={currentCourse.shortInfo} />
      <div className="flex flex-initial gap-2">
        <CourseInfoLessons />
        <CourseInfoPeople />
      </div>
    </main>
  );
};

export default CourseInfo;
