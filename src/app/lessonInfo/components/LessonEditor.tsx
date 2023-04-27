import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Button from "~/components/Button";
import Toggle from "~/components/Toggle";
import LessonInfoMenubar from "./LessonInfoMenubar";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const LessonEditor = () => {
  const handleChange = (value: any, delta: any, source: any) => {
    console.log({ value, delta, source });
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <LessonInfoMenubar />
      <ReactQuill onChange={handleChange} theme="snow" />
      <Button className="mt-2 border border-gray-300 py-1">Save changes</Button>
    </div>
  );
};

export default LessonEditor;
