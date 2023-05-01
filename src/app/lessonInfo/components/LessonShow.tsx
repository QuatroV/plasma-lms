import useLessonStore from "~/stores/lessonStore";

const LessonShow = () => {
  const currentContent = useLessonStore((state) => state.lesson?.content);
  if (!currentContent) return null;
  return <div dangerouslySetInnerHTML={{ __html: currentContent }} />;
};

export default LessonShow;
