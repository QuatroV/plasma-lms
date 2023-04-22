import useCourseStore from "~/stores/courseStore";
import usePagesStore from "~/stores/pageStore";
import { CourseInfo } from "~/stores/searchStore";
import clsxm from "~/utils/clsxm";

type Props = {
  isFirst?: boolean;
  isLast?: boolean;
  item: CourseInfo;
};

const SearchSidebarItem = ({ isFirst, isLast, item }: Props) => {
  const { name, private: isPrivate } = item;

  const setCurrentCourse = useCourseStore((state) => state.setCurrentCourse);

  const setCurrentPage = usePagesStore((state) => state.setCurrentPage);

  const handleClick = () => {
    setCurrentCourse(item);
    setCurrentPage("course");
  };

  return (
    <div
      className={clsxm(
        " flex h-14 cursor-pointer items-center gap-2 border-2 border-b bg-gray-100 p-1 transition-all active:bg-gray-300 active:shadow-inner",
        isFirst && "rounded-t-xl",
        isLast && "rounded-b-xl"
      )}
      onClick={handleClick}
    >
      <div className="h-12 w-12 rounded-full bg-gray-200" />
      <div>
        <p className="flex items-center text-sm">
          <span>{name}</span>
          {isPrivate ? (
            <span className="ml-2 rounded border px-1 text-xs text-gray-500">
              Private
            </span>
          ) : null}
        </p>
        <p className="text-xs text-gray-500">Creator: John Snow</p>
      </div>
    </div>
  );
};

export default SearchSidebarItem;
