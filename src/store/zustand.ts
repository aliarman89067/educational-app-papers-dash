import { create } from "zustand";
import { type Editor } from "@tiptap/react";

interface EditorProps {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<EditorProps>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));

interface TargetNodeProps {
  nodeId: string | null;
  setNodeId: (id: string | null) => void;
}

export const useTargetNode = create<TargetNodeProps>((set) => ({
  nodeId: null,
  setNodeId: (id) => set({ nodeId: id }),
}));

interface UseEditorCount {
  editorArr: {
    id: number;
    html: string;
  }[];
  increaseCount: () => void;
  decreaseCount: (id: number) => void;
  updateHtml: (id: number, html: string) => void;
}

export const useEditorCount = create<UseEditorCount>((set, get) => ({
  editorArr: [
    {
      id: 1,
      html: "",
    },
  ],
  increaseCount: () => {
    const currentEditors = get().editorArr;
    const newEditor = {
      id: get().editorArr.length + 1,
      html: "",
    };

    set({
      editorArr: [...currentEditors, newEditor],
    });
  },
  decreaseCount: (id) => {
    const filteredCounts = get().editorArr.filter((item) => item.id !== id);
    set({
      editorArr: filteredCounts,
    });
  },
  updateHtml: (id, html) => {
    const updatedEditors = get().editorArr.map((item) => {
      if (item.id === id) {
        return { ...item, html };
      } else {
        return item;
      }
    });
    set({
      editorArr: updatedEditors,
    });
  },
}));
