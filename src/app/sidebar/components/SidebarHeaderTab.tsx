import { ReactNode } from "react";

type Props = {
  name: string;
  icon: ReactNode;
};

const SidebarHeaderTab = ({ name, icon }: Props) => {
  return (
    <div className="flex cursor-pointer flex-row items-center gap-1 rounded-full  px-2 hover:bg-gray-100 active:scale-105">
      {icon}
      {name}
    </div>
  );
};

export default SidebarHeaderTab;
