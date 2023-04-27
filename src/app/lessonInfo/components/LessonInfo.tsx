import LessonEditor from "./LessonEditor";
import LessonInfoHeader from "./LessonInfoHeader";

const LessonInfo = () => {
  return (
    <main className="flex h-full flex-auto flex-col gap-2 p-2">
      <LessonInfoHeader />
      <LessonEditor />
    </main>
  );
};

export default LessonInfo;
