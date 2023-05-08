import { FaQuestion } from "react-icons/fa";

const CourseSidebarTasksContent = () => {
  return (
    <div>
      <div className=" my-1 ml-3 text-sm font-bold">Tasks:</div>
      <div className="relative flex cursor-pointer items-center gap-1 p-1 text-sm hover:bg-gray-300 active:shadow-inner">
        <FaQuestion /> Task 1
      </div>
      <div className="relative flex cursor-pointer items-center gap-1 p-1 text-sm hover:bg-gray-300 active:shadow-inner">
        <FaQuestion /> Task 2
      </div>
      <div className="relative flex cursor-pointer items-center gap-1 p-1 text-sm hover:bg-gray-300 active:shadow-inner">
        <FaQuestion /> Task 3
      </div>
      <hr className="ml-1 h-0.5 w-1/4 bg-gray-400" />
      <div className="my-1 ml-1 text-xs italic text-gray-500">
        Lesson not completed
      </div>
    </div>
  );
};

export default CourseSidebarTasksContent;
