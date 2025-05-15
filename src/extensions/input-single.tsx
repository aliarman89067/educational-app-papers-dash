// extensions/Circle.ts
import { CircleNodeView } from "@/components/circleNodeView";
import { SingleInputNodeView } from "@/components/singleInputView";
import { getNodesPercentage } from "@/lib/utils";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

export interface InputOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    input: {
      insertInput: (attrs: {
        id: string;
        style?: string;
        align: string;
        optionLeft?: boolean;
        optionRight?: boolean;
        optionLeftText?: string;
        optionRightText?: string;
        color?: string;
        width: number;
        height: number;
      }) => ReturnType;
    };
  }
}

export const SingleInput = Node.create<InputOptions>({
  name: "input",

  group: "block",

  atom: true,

  draggable: true,

  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="input"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "input",
        style: HTMLAttributes.style,
      }),
      "",
    ];
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => {
          return {
            "data-id": attributes.id,
          };
        },
      },
      name: {
        default: "input",
      },
      align: {
        default: "right",
      },
      width: {
        default: 100,
      },
      height: {
        default: 40,
      },
      color: {
        default: "#333",
      },
      optionLeft: {
        default: false,
      },
      optionRight: {
        default: false,
      },
      optionLeftHtml: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-option-left"),
        renderHTML: (attributes) => {
          return {
            "data-option-left": attributes.optionLeftText,
          };
        },
      },
      optionRightHtml: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-option-right"),
        renderHTML: (attributes) => {
          return {
            "data-option-right": attributes.optionRightText,
          };
        },
      },
      class: {
        default: "single-input",
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attrs) => {
          return {
            class: attrs.class || null,
          };
        },
      },
      style: {
        default: "",
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attrs) => {
          return {
            style: attrs.style || null,
          };
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(SingleInputNodeView);
  },

  addCommands() {
    return {
      insertInput:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent([
            {
              type: this.name,
              attrs: {
                ...attrs,
              },
            },
            {
              type: "paragraph",
              content: [],
            },
          ]);
        },
    };
  },
});
