import { useRouter } from "next/router";

const CourseMain = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>Hello world {id} </div>;
};

export default CourseMain;
