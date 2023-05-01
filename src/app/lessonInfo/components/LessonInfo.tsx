import { BiArrowBack } from "react-icons/bi";
import LessonContent from "./LessonContent";
import LessonInfoHeader from "./LessonInfoHeader";

const LessonInfo = () => {
  return (
    <main className="flex h-full flex-auto flex-col gap-2 p-2">
      <LessonInfoHeader />
      <LessonContent />
    </main>
  );
};

export default LessonInfo;
