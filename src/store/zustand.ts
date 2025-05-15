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

// interface UseEditorCount {
//   editorArr: {
//     id: number;
//     html: string;
//   }[];
//   increaseCount: () => void;
//   decreaseCount: (id: number) => void;
//   updateHtml: (id: number, html: string) => void;
// }

// export const useEditorCount = create<UseEditorCount>((set, get) => ({
//   editorArr: [
//     {
//       id: 1,
//       html: "",
//     },
//   ],
//   increaseCount: () => {
//     const currentEditors = get().editorArr;
//     const newEditor = {
//       id: get().editorArr.length + 1,
//       html: "",
//     };

//     set({
//       editorArr: [...currentEditors, newEditor],
//     });
//   },
//   decreaseCount: (id) => {
//     const filteredCounts = get().editorArr.filter((item) => item.id !== id);
//     set({
//       editorArr: filteredCounts,
//     });
//   },
//   updateHtml: (id, html) => {
//     const updatedEditors = get().editorArr.map((item) => {
//       if (item.id === id) {
//         return { ...item, html };
//       } else {
//         return item;
//       }
//     });
//     set({
//       editorArr: updatedEditors,
//     });
//   },
// }));

interface UseEditorUpdate {
  editorContentArr: {
    id: number;
    content: any[];
  }[];
  increaseCount: () => void;
  decreaseCount: (id: number) => void;
  updateContent: (id: number, content: any[]) => void;
}

export const useEditorUpdateStore = create<UseEditorUpdate>((set, get) => ({
  editorContentArr: [
    {
      id: 1,
      content: [],
    },
  ],
  increaseCount: () => {
    const currentEditors = get().editorContentArr;
    const newEditor = {
      id: get().editorContentArr.length + 1,
      content: [],
    };

    set({
      editorContentArr: [...currentEditors, newEditor],
    });
  },
  decreaseCount: (id) => {
    const filteredEditorContent = get().editorContentArr.filter(
      (item) => item.id !== id
    );
    set({
      editorContentArr: filteredEditorContent,
    });
  },
  updateContent: (id, content) => {
    const updatedEditors = get().editorContentArr.map((item) => {
      if (item.id === id) {
        return { ...item, content };
      } else {
        return item;
      }
    });
    set({
      editorContentArr: updatedEditors,
    });
  },
}));
