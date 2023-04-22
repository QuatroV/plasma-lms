import useSearchStore from "~/stores/searchStore";
import SearchSidebarEnd from "./SearchSidebarEnd";
import SearchSidebarItem from "./SearchSidebarItem";

const SearchSidebarItems = () => {
  const searchResult = useSearchStore((state) => state.searchResult);
  return (
    <div className="p-2 text-sm">
      {searchResult.map((item, idx) => (
        <SearchSidebarItem
          key={item.id}
          item={item}
          isFirst={idx === 0}
          isLast={idx === searchResult.length - 1}
        />
      ))}
      {searchResult.length > 0 && <SearchSidebarEnd />}
    </div>
  );
};

export default SearchSidebarItems;
