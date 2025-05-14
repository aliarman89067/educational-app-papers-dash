import { cn } from "@/lib/utils";
import { useTargetNode } from "@/store/zustand";
import { NodeViewWrapper } from "@tiptap/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CSSProperties } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

export const SingleInputNodeView = ({
  node,
  updateAttributes,
  selected,
}: any) => {
  const { setNodeId } = useTargetNode();

  const getAlign = (): CSSProperties => {
    if (node.attrs.align === "center") {
      return { marginInline: "auto" };
    } else if (node.attrs.align === "left") {
      return { marginRight: "auto" };
    }
    return { marginLeft: "auto" };
  };

  const handleOptionLeftChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateAttributes({ optionLeftText: e.target.value });
  };

  const handleChangeLeftOption = () => {
    updateAttributes({ optionLeft: !node.attrs.optionLeft });
  };
  const handleOptionRightChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateAttributes({ optionRightText: e.target.value });
  };

  const handleChangeRightOption = () => {
    updateAttributes({ optionRight: !node.attrs.optionRight });
  };

  return (
    <NodeViewWrapper className="block w-full" data-type="input">
      <div
        onClick={() => setNodeId(node.attrs.id)}
        style={getAlign()}
        className={`relative w-fit flex items-end gap-2 ${
          selected ? "outline-wrapper" : ""
        }`}
      >
        {selected && (
          <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 flex items-center justify-center gap-5 z-50">
            <div
              onClick={handleChangeLeftOption}
              className={cn(
                "relative w-7 h-7 rounded-full flex items-center justify-center bg-gray-200 cursor-pointer z-50",
                node.attrs.optionLeft && "bg-gray-800"
              )}
            >
              <ArrowLeft
                className={cn(
                  "size-4 text-gray-800",
                  node.attrs.optionLeft && "text-white"
                )}
              />
            </div>
            <div
              onClick={handleChangeRightOption}
              className={cn(
                "relative w-7 h-7 rounded-full flex items-center justify-center bg-gray-200 cursor-pointer z-50",
                node.attrs.optionRight && "bg-gray-800"
              )}
            >
              <ArrowRight
                className={cn(
                  "size-4 text-gray-800",
                  node.attrs.optionRight && "text-white"
                )}
              />
            </div>
          </div>
        )}
        {selected && node.attrs.optionLeft ? (
          <textarea
            value={node.attrs.optionLeftText || ""}
            onChange={handleOptionLeftChange}
            className="text-sm border rounded px-2 py-1 w-[80px] h-[30px] resize-none"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <>
            {node.attrs.optionLeft && (
              <span className="text-sm">{node.attrs.optionLeftText}</span>
            )}
          </>
        )}

        <div
          style={{
            width: node.attrs.width,
            height: node.attrs.height,
            borderWidth: 1,
            borderStyle: "dashed",
            borderTopColor: "transparent",
            borderBottomColor: "#333",
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
          }}
        />

        {selected && node.attrs.optionRight ? (
          <textarea
            value={node.attrs.optionRightText || ""}
            onChange={handleOptionRightChange}
            className="text-sm border rounded px-2 py-1 w-[80px] h-[30px] resize-none"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <>
            {node.attrs.optionRight && (
              <span className="text-sm">{node.attrs.optionRightText}</span>
            )}
          </>
        )}

        {/* {selected && (
          <input
            type="text"
            placeholder="Add label..."
            value={node.attrs.label || ""}
            onChange={handleLabelChange}
            className="text-sm border rounded px-2 py-1"
            onClick={(e) => e.stopPropagation()}
          />
        )} */}
      </div>
    </NodeViewWrapper>
  );
};
