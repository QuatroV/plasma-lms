import { Prisma } from "@prisma/client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type CourseInfo = Prisma.CourseGetPayload<{
  select: {
    id: true;
    name: true;
    shortInfo: true;
    private: true;
  };
}>;

interface searchState {
  searchResult: CourseInfo[];
  setSearchResult: (searchResult: CourseInfo[]) => void;
}

const useSearchStore = create<searchState>()(
  devtools((set) => ({
    searchResult: [],
    setSearchResult(searchResult) {
      set({ searchResult });
    },
  }))
);

export default useSearchStore;
