import { BsFillPeopleFill } from "react-icons/bs";
import { ImBook } from "react-icons/im";
import { HiBookmark } from "react-icons/hi";
import SidebarHeaderTab from "./CourseSidebarHeaderTab";

import { AiOutlineSearch } from "react-icons/ai";
import usePagesStore from "~/stores/pageStore";

const tabs = [
  { name: "Lesson", icon: <HiBookmark /> },
  { name: "Course", icon: <ImBook /> },
  { name: "People", icon: <BsFillPeopleFill /> },
];

const SidebarHeaderTabs = () => {
  return (
    <div className="flex items-center">
      {tabs.map((tab, idx) => (
        <SidebarHeaderTab {...tab} key={idx} />
      ))}
    </div>
  );
};

export default SidebarHeaderTabs;
