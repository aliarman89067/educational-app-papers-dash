"use client";

import { useEditorCount, useEditorStore, useTargetNode } from "@/store/zustand";
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
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";
import { Circle } from "@/extensions/node-wrapper";
import { SingleInput } from "@/extensions/input-single";
import { Minus } from "lucide-react";

interface Props {
  id: number;
}

const Tiptap = ({ id }: Props) => {
  const { setEditor, editor: editorContent } = useEditorStore();
  const { updateHtml, decreaseCount } = useEditorCount();

  const editorContainer = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
      updateHtml(id, editor.getHTML());
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
      console.log(editor.getHTML());
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
      SingleInput,
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
    ],
    editorProps: {
      attributes: {
        id: "white-board",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col h-auto w-[800px] pr-2 pl-7 py-1 cursor-text rounded-sm",
      },
    },
  });
  const handleRmoveEditor = () => {
    decreaseCount(id);
  };
  return (
    <div className="flex items-center gap-2 w-fit mx-auto">
      <div className="relative min-w-max flex justify-center w-[800px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <div className="absolute top-5 left-2 z-10">
          <span>{id}</span>
        </div>
        <EditorContent editor={editorContainer} draggable />
      </div>
      <Minus
        onClick={handleRmoveEditor}
        className="text-red-400 cursor-pointer"
      />
    </div>
  );
};

export default Tiptap;
