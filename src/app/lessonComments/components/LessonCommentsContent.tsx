import clsxm from "~/utils/clsxm";

type Props = {
  isOpen: boolean;
};

const LessonCommentsContent = ({ isOpen }: Props) => {
  return (
    <div
      className={clsxm(
        "rounded-lg bg-white p-4 transition-all",
        isOpen ? "visible" : "hidden "
      )}
    >
      LessonTasksContent
    </div>
  );
};

export default LessonCommentsContent;
