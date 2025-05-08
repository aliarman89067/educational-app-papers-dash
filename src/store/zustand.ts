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
