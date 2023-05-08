import SidebarHeader from "./CourseSidebarHeader";
import CourseSidebarLessonContents from "./CourseSidebarLessonContents";
import CourseSidebarTasksContent from "./CourseSidebarTasksContent";

const CourseSidebarContent = () => {
  return (
    <div>
      <SidebarHeader />
      <div>
        <CourseSidebarLessonContents />
        <CourseSidebarTasksContent />
      </div>
    </div>
  );
};

export default CourseSidebarContent;
