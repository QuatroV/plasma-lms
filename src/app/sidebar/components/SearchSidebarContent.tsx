import Button from "~/components/Button";
import SearchSidebarHeader from "./SearchSidebarHeader";
import SearchSidebarItems from "./SearchSidebarItems";

const SearchSidebarContent = () => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <SearchSidebarHeader />
        <SearchSidebarItems />
      </div>
      <div className="p-2 text-sm">
        <Button className="w-full rounded-lg bg-gray-100 py-3 active:bg-white">
          Create new course
        </Button>
      </div>
    </div>
  );
};

export default SearchSidebarContent;
