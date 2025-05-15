import { cn } from "@/lib/utils";
import { useEditorStore, useTargetNode } from "@/store/zustand";
import { NodeViewWrapper, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CSSProperties } from "react";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import HighLight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

export const SingleInputNodeView = ({
  node,
  updateAttributes,
  selected,
}: any) => {
  const { setNodeId } = useTargetNode();
  const { setEditor } = useEditorStore();

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

  const innerEditor1 = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
      updateAttributes({ optionLeftHtml: editor.getHTML() });
      // updateHtml(id, editor.getHTML());
      // setGetHtml((prev) => {
      //   if (!prev || !prev[id]) {
      //     return [...(prev || []), { id, html: editor.getHTML() }];
      //   }

      //   return prev.map((item) => {
      //     if (item.id === id) {
      //       return { id: item.id, html: editor.getHTML() };
      //     } else {
      //       return item;
      //     }
      //   });
      // });
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    extensions: [
      StarterKit,
      Underline,
      FontFamily,
      TextStyle,
      Color,
      HighLight,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Subscript.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
      Superscript.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ["paragraph", "heading"],
        defaultLineHeight: "normal",
      }),
    ],
    content: node.attrs.optionLeftHtml,
    editable: true,
    editorProps: {
      attributes: {
        class: "text-sm border rounded px-2 py-1 w-[80px] h-[30px]",
      },
    },
  });
  const innerEditor2 = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
      updateAttributes({ optionRightHtml: editor.getHTML() });
      // updateHtml(id, editor.getHTML());
      // setGetHtml((prev) => {
      //   if (!prev || !prev[id]) {
      //     return [...(prev || []), { id, html: editor.getHTML() }];
      //   }

      //   return prev.map((item) => {
      //     if (item.id === id) {
      //       return { id: item.id, html: editor.getHTML() };
      //     } else {
      //       return item;
      //     }
      //   });
      // });
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    extensions: [
      StarterKit,
      Underline,
      FontFamily,
      TextStyle,
      Color,
      HighLight,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Subscript.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
      Superscript.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ["paragraph", "heading"],
        defaultLineHeight: "normal",
      }),
    ],
    content: node.attrs.optionRightHtml,
    editable: true,
    editorProps: {
      attributes: {
        class: "text-sm border rounded px-2 py-1 w-[80px] h-[30px]",
      },
    },
  });

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
        {selected && node.attrs.optionLeftHtml ? (
          // <textarea
          //   value={node.attrs.optionLeftText || ""}
          //   onChange={handleOptionLeftChange}
          //   className="text-sm border rounded px-2 py-1 w-[80px] h-[30px] resize-none"
          //   onClick={(e) => e.stopPropagation()}
          // />
          <EditorContent editor={innerEditor1} />
        ) : (
          <>
            {node.attrs.optionLeftHtml && (
              // <span className="text-sm">{}</span>
              <div
                dangerouslySetInnerHTML={{
                  __html: innerEditor1?.getHTML() ?? "",
                }}
                className="text-sm"
              />
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

        {selected && node.attrs.optionRightHtml ? (
          // <textarea
          //   value={node.attrs.optionRightText || ""}
          //   onChange={handleOptionRightChange}
          //   className="text-sm border rounded px-2 py-1 w-[80px] h-[30px] resize-none"
          //   onClick={(e) => e.stopPropagation()}
          // />
          <EditorContent editor={innerEditor2} />
        ) : (
          <>
            {node.attrs.optionRightHtml && (
              // <span className="text-sm">{node.attrs.optionRightText}</span>
              <div
                dangerouslySetInnerHTML={{
                  __html: innerEditor2?.getHTML() ?? "",
                }}
                className="text-sm"
              />
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
