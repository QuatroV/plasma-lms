import usePagesStore from "~/stores/pageStore";
import SearchSidebarContent from "./SearchSidebarContent";
import CourseSidebarContent from "./CourseSidebarContent";

const sidebarContent = {
  search: <SearchSidebarContent />,
  course: <CourseSidebarContent />,
};

const Sidebar = () => {
  const currentPage = usePagesStore((state) => state.currentPage);
  return (
    <div className=" h-full w-72 flex-initial bg-gray-200">
      {sidebarContent[currentPage]}
    </div>
  );
};

export default Sidebar;
