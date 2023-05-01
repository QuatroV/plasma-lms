import { type NextPage } from "next";
import { useEffect } from "react";
import CourseInfo from "~/app/courseInfo/components/CourseInfo";
import usePagesStore from "~/stores/pageStore";

const Home: NextPage = () => {
  const setCurrentPage = usePagesStore((state) => state.setCurrentPage);

  useEffect(() => setCurrentPage("search"), []);
  return <CourseInfo />;
};

export default Home;
