import { BsFillPeopleFill } from "react-icons/bs";
import { ImBook } from "react-icons/im";
import { HiBookmark } from "react-icons/hi";
import SidebarHeaderTab from "./SidebarHeaderTab";

const tabs = [
  { name: "Main", icon: <HiBookmark /> },
  { name: "Classwork", icon: <ImBook /> },
  { name: "People", icon: <BsFillPeopleFill /> },
];

const SidebarHeaderTabs = () => {
  return (
    <div className="flex">
      {tabs.map((tab, idx) => (
        <SidebarHeaderTab {...tab} key={idx} />
      ))}
    </div>
  );
};

export default SidebarHeaderTabs;
