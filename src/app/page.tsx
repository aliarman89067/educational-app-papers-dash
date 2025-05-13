"use client";
import Tiptap from "@/components/tiptap/tiptap";
import Toolbar from "@/components/tiptap/toolbar";
import { useEditorCount } from "@/store/zustand";
import { useState } from "react";

const HomePage = () => {
  const { editorArr } = useEditorCount();

  console.log(editorArr);
  return (
    <div className="flex flex-col w-full h-full mx-auto">
      <Toolbar />
      {editorArr.map((item) => (
        <Tiptap key={item.id} id={item.id} />
      ))}
    </div>
  );
};
export default HomePage;
