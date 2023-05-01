import { IoSchool } from "react-icons/io5";
import useCourseStore from "~/stores/courseStore";
import CourseInfoLesson from "./CourseInfoLesson";

const CourseInfoLessons = () => {
  const lessons = useCourseStore((state) => state.currentCourse?.lessons);
  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 rounded-t-xl bg-white p-2 font-bold shadow">
        <IoSchool size={16} />
        Lessons
      </div>
      <div className="bg-glass flex-initial rounded-b-xl p-2">
        {lessons?.length ? (
          lessons.map((lesson, idx) => (
            <CourseInfoLesson
              key={lesson.id}
              index={idx + 1}
              lesson={lesson}
              first={idx === 0}
              last={idx === lessons.length - 1}
            />
          ))
        ) : (
          <div>No lessons added to the course</div>
        )}
      </div>
    </div>
  );
};

export default CourseInfoLessons;
