import { AiOutlineSearch } from "react-icons/ai";
import Input from "~/components/Input";
import SearchSidebarHeader from "./SearchSidebarHeader";
import SearchSidebarItems from "./SearchSidebarItems";

const SearchSidebarContent = () => {
  return (
    <div>
      <SearchSidebarHeader />
      <SearchSidebarItems />
    </div>
  );
};

export default SearchSidebarContent;
