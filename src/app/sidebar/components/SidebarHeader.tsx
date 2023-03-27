import SidebarHeaderTabs from "./SidebarHeaderTabs";
import SidebarHeaderTitle from "./SidebarHeaderTitle";

const SidebarHeader = () => {
  return (
    <div className="flex flex-col items-start gap-1 bg-gray-300 py-1 px-1">
      <SidebarHeaderTabs />
      <SidebarHeaderTitle />
    </div>
  );
};

export default SidebarHeader;
