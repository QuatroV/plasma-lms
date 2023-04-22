import { useSession } from "next-auth/react";
import Button from "~/components/Button";
import { api } from "~/utils/api";

type Props = {
  courseId: string;
  isPrivate: boolean | null;
};

const CourseInfoButtons = ({ isPrivate, courseId }: Props) => {
  const { data: session } = useSession();

  const joinMutation = api.course.join.useMutation();

  const handleClick = () => {
    if (session?.user.id) {
      joinMutation.mutate({ courseId, userId: session?.user.id });
    } else {
      console.error("User ID not found");
    }
  };

  return (
    <div className="flex justify-center">
      <Button onClick={handleClick}>
        {isPrivate ? "Ask for invitation" : "Join the course"}
      </Button>
    </div>
  );
};

export default CourseInfoButtons;
