import { Transform } from "react-html-parser";
import { FaPlay } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { saveToClipboard } from "~/utils/clipboard";

export const transform: Transform = (domNode) => {
  if (domNode.name === "pre" && domNode.attribs.class === "ql-syntax") {
    const domData = domNode.children[0].data;
    console.log({ domNode, domData });
    const handleCopy = () => saveToClipboard(domData);
    const handleExecute = () => {};
    return (
      <div className="relative w-full rounded-b rounded-tr bg-gray-700 p-2 font-mono text-white before:absolute before:left-0 before:-top-4 before:rounded-t before:bg-gray-600 before:px-2 before:text-xs before:content-['Code_fragment']">
        <pre className="overflow-hidden">{domData}</pre>
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <MdOutlineContentCopy
            onClick={handleCopy}
            className="cursor-pointer hover:scale-95 active:text-gray-400"
            size={20}
          />
          <FaPlay
            onClick={handleExecute}
            className="cursor-pointer hover:scale-95 active:text-gray-400"
            size={16}
          />
        </div>
      </div>
    );
  }
  return undefined;
};
