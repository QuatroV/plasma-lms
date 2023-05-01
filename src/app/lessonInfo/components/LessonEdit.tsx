import dynamic from "next/dynamic";
import { useState } from "react";
import Button from "~/components/Button";
import "react-quill/dist/quill.snow.css";
import { api } from "~/utils/api";
import useLessonStore from "~/stores/lessonStore";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const LessonEdit = () => {
  const [markup, setMarkup] = useState("");

  const currentLesson = useLessonStore((state) => state.lesson);
  const setLesson = useLessonStore((state) => state.setLesson);

  const editContentMutation = api.lesson.editContent.useMutation();

  const handleSave = () => {
    if (currentLesson?.id) {
      editContentMutation.mutate({
        lessonId: currentLesson.id,
        content: markup,
      });
      setLesson({ ...currentLesson, content: markup });
    }
  };

  console.log({ markup });

  return (
    <div>
      <ReactQuill value={markup} onChange={setMarkup} theme="snow" />
      <Button onClick={handleSave} className="mt-2 border border-gray-300 py-1">
        Save changes
      </Button>
    </div>
  );
};

export default LessonEdit;
