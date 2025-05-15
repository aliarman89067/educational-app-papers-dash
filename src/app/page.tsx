"use client";
import Tiptap from "@/components/tiptap/tiptap";
import Toolbar from "@/components/tiptap/toolbar";
import {
  useEditorStore,
  useEditorUpdateStore,
  useTargetNode,
} from "@/store/zustand";
import { useState } from "react";

const HomePage = () => {
  const { editorContentArr } = useEditorUpdateStore();
  const { editor } = useEditorStore();

  const { nodeId } = useTargetNode();
  console.log(editor?.getHTML());
  return (
    <div className="flex flex-col w-full h-full mx-auto">
      <Toolbar />
      {editorContentArr.map((item, index) => (
        <Tiptap key={index} id={item.id} />
      ))}
    </div>
  );
};
export default HomePage;
