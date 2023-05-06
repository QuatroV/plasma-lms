import clsxm from "~/utils/clsxm";
import LessonTasksMenubar from "./LessonTasksMenubar";

type Props = {
  isOpen: boolean;
};

const LessonTasksContent = ({ isOpen }: Props) => {
  return (
    <div
      className={clsxm(
        "bg-glass rounded-lg transition-all",
        isOpen ? "visible" : "hidden "
      )}
    >
      <LessonTasksMenubar />
      <div className="rounded-b-lg bg-white p-4">Contetn</div>
    </div>
  );
};

export default LessonTasksContent;
