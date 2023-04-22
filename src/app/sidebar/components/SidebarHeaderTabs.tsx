import { BsFillPeopleFill } from "react-icons/bs";
import { ImBook } from "react-icons/im";
import { HiBookmark } from "react-icons/hi";
import SidebarHeaderTab from "./SidebarHeaderTab";

import { IoArrowBackOutline } from "react-icons/io5";
import usePagesStore from "~/stores/pageStore";

const tabs = [
  { name: "Main", icon: <HiBookmark /> },
  { name: "Classwork", icon: <ImBook /> },
  { name: "People", icon: <BsFillPeopleFill /> },
];

const SidebarHeaderTabs = () => {
  const setCurrentPage = usePagesStore((state) => state.setCurrentPage);

  const handleClick = () => {
    setCurrentPage("search");
  };

  return (
    <div className="flex items-center">
      <IoArrowBackOutline
        className="cursor-pointer"
        size={18}
        onClick={handleClick}
      />
      {tabs.map((tab, idx) => (
        <SidebarHeaderTab {...tab} key={idx} />
      ))}
    </div>
  );
};

export default SidebarHeaderTabs;
