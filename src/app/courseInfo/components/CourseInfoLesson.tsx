import { Prisma } from "@prisma/client";
import Link from "next/link";
import clsxm from "~/utils/clsxm";

type Props = {
  index: number;
  first: boolean;
  last: boolean;
  lesson: Prisma.LessonGetPayload<{
    select: {
      id: true;
      name: true;
      content: true;
    };
  }>;
};

const CourseInfoLesson = ({ lesson, first, last, index }: Props) => {
  return (
    <Link
      href={`/lessons/${lesson.id}`}
      className={clsxm(
        "flex cursor-pointer gap-2 bg-white p-2 active:bg-gray-100 active:shadow-inner",
        last && "rounded-b-lg",
        first && "rounded-t-lg",
        !last && "border-b border-gray-300"
      )}
    >
      <div>{index}</div>
      <div className="flex items-center text-sm">{lesson.name}</div>
    </Link>
  );
};

export default CourseInfoLesson;
