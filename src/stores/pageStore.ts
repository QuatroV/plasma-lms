import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Page = "search" | "course" | "lesson";

interface pagesState {
  currentPage: Page;
  setCurrentPage: (currentPage: Page) => void;
}

const usePagesStore = create<pagesState>()(
  devtools((set) => ({
    currentPage: "search",
    setCurrentPage(currentPage) {
      set({ currentPage });
    },
  }))
);

export default usePagesStore;
