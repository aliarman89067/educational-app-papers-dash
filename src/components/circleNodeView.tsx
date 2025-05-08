// components/CircleNodeView.tsx
import { NodeViewWrapper } from "@tiptap/react";
import { CSSProperties } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

export const CircleNodeView = ({ node, updateAttributes, selected }: any) => {
  const size = node.attrs.size || 150;

  const getAlign = (): CSSProperties => {
    if (node.attrs.align === "center") {
      return { marginInline: "auto" };
    } else if (node.attrs.align === "left") {
      return { marginRight: "auto" };
    }
    return { marginLeft: "auto" };
  };

  return (
    <NodeViewWrapper className="block w-full" data-type="circle">
      <div
        style={getAlign()}
        className={`w-fit ${selected ? "outline-wrapper" : ""}`}
      >
        <ResizableBox
          width={size}
          height={size}
          axis="both"
          resizeHandles={["se"]}
          onResizeStop={(_, data) => {
            const newSize = Math.max(data.size.width, data.size.height);
            updateAttributes({ size: newSize });
          }}
          minConstraints={[50, 50]}
          maxConstraints={[600, 600]}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundColor: node.attrs.color,
              borderRadius: "50%",
            }}
          />
        </ResizableBox>
      </div>
    </NodeViewWrapper>
  );
};
