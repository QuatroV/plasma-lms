import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import "react-quill/dist/quill.snow.css";
import { api } from "~/utils/api";
import useLessonStore from "~/stores/lessonStore";
import QuillJSModules from "../quilljs-modules";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const LessonEdit = () => {
  const [markup, setMarkup] = useState("");

  const currentLesson = useLessonStore((state) => state.lesson);
  const setLesson = useLessonStore((state) => state.setLesson);

  useEffect(() => {
    setMarkup(currentLesson?.content || "");
  }, [currentLesson?.content]);

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

  return (
    <div className="">
      <ReactQuill
        value={markup}
        modules={QuillJSModules}
        onChange={setMarkup}
        theme="snow"
      />
      <Button onClick={handleSave} className="mt-2 border border-gray-300 py-1">
        Save changes
      </Button>
    </div>
  );
};

export default LessonEdit;
