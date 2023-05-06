import { GetServerSidePropsContext, type NextPage } from "next";
import { useEffect } from "react";
import LessonInfo from "~/app/lessonInfo/components/LessonInfo";
import useLessonStore from "~/stores/lessonStore";
import usePagesStore from "~/stores/pageStore";
import { api } from "~/utils/api";

type Props = {
  lessonId: string;
};

const Lesson: NextPage<Props> = ({ lessonId }) => {
  console.log({ lessonId });

  const setLesson = useLessonStore((state) => state.setLesson);

  const setCurrentPage = usePagesStore((state) => state.setCurrentPage);

  useEffect(() => setCurrentPage("course"));

  const lessonQuery = api.lesson.show.useQuery({ lessonId });

  useEffect(() => {
    if (lessonQuery.data) {
      setLesson(lessonQuery.data);
    }
  }, [lessonQuery.data]);

  return <LessonInfo />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const lessonId =
    Array.isArray(params) && params ? params.join("") : params?.id;

  return { props: { lessonId } };
}

export default Lesson;
