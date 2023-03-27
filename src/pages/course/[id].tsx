import { useRouter } from "next/router";

const CourseMain = () => {
  console.log("Hello world");
  const router = useRouter();
  const { id } = router.query;
  return <div>Hello world {id} </div>;
};

export default CourseMain;
