import { ReactNode } from "react";

type Props = {
  name: string;
  icon: ReactNode;
  key: number;
};

const SidebarHeaderTab = ({ name, icon, key }: Props) => {
  return (
    <div
      className="flex cursor-pointer flex-row items-center gap-1 rounded-full px-2 hover:bg-gray-100 active:scale-105"
      key={key}
    >
      {icon}
      {name}
    </div>
  );
};

export default SidebarHeaderTab;
