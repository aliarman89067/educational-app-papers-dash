"use client";

import { useEditorStore, useTargetNode } from "@/store/zustand";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import FontFamily from "@tiptap/extension-font-family";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import HighLight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import History from "@tiptap/extension-history";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";
import { Circle } from "@/extensions/node-wrapper";
import { useEffect } from "react";

const Tiptap = () => {
  const { setEditor, editor: editorContent } = useEditorStore();
  const { setNodeId, nodeId } = useTargetNode();

  console.log(editorContent?.getHTML());

  useEffect(() => {
    if (nodeId) {
      editorContent?.state.doc.descendants((node, pos) => {
        if (node.attrs.id && node.attrs.id === nodeId) {
          editorContent
            .chain()
            .focus()
            .command(({ tr }) => {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                class: `outline-wrapper`,
              });
              return true;
            })
            .run();
        } else {
          editorContent
            .chain()
            .focus()
            .command(({ tr }) => {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                class: ``,
              });
              return true;
            })
            .run();
        }
      });
    }
  }, [nodeId]);

  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
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
      Circle,
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ["paragraph", "heading"],
        defaultLineHeight: "normal",
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextStyle,
      FontFamily,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      HighLight.configure({
        multicolor: true,
      }),
      StarterKit.configure({
        history: false,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      History,
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
      Underline,
    ],
    editorProps: {
      handleClickOn(_view, _pos, node, _nodePos, _event, _direct) {
        if (node.attrs.id) {
          setNodeId(node.attrs.id);
        } else {
          setNodeId(null);
        }
      },
      handleClick(view, pos, event) {
        const ev = event.target as HTMLElement;
        if (ev.id === "white-board") {
          setNodeId(null);

          editorContent?.state.doc.descendants((node, pos) => {
            editorContent
              ?.chain()
              .focus()
              .command(({ tr }) => {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  class: ``,
                });
                return true;
              })
              .run();
          });
        }
      },
      attributes: {
        id: "white-board",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[800px] px-2 py-1 cursor-text",
      },
    },
  });
  return (
    <div className="min-w-max flex justify-center w-[800px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
      <EditorContent editor={editor} draggable />
      {/* <div className="w-[200px] h-[200px] rounded-full bg-red-500"></div> */}
    </div>
  );
};

export default Tiptap;
