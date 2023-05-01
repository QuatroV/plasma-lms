import { type NextPage } from "next";
import { useEffect } from "react";
import LessonInfo from "~/app/lessonInfo/components/LessonInfo";
import useLessonStore from "~/stores/lessonStore";
import usePagesStore from "~/stores/pageStore";
import { api } from "~/utils/api";

type Props = {
  lessonId: string;
};

const Lesson: NextPage<Props> = ({ lessonId }) => {
  const setLesson = useLessonStore((state) => state.setLesson);

  const setCurrentPage = usePagesStore((state) => state.setCurrentPage);

  useEffect(() => setCurrentPage("course"));

  const lessonQuery = api.lesson.show.useQuery({ lessonId });
  if (lessonQuery.data) {
    setLesson(lessonQuery.data);
  }

  return <LessonInfo />;
};

Lesson.getInitialProps = async (context) => {
  const { req } = context;

  const url = req ? req.url : "";

  const lessonId = (url || "").split("/").pop();
  return { lessonId: lessonId || "" };
};

export default Lesson;
