import { type NextPage } from "next";
import CourseInfo from "~/app/courseInfo/components/CourseInfo";
import useCourseStore from "~/stores/courseStore";

const Home: NextPage = () => {
  return <CourseInfo />;
};

export default Home;
