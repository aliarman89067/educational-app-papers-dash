// extensions/Circle.ts
import { CircleNodeView } from "@/components/circleNodeView";
import { getNodesPercentage } from "@/lib/utils";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

export interface CircleOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    circle: {
      insertCircle: (attrs: {
        id: string;
        size?: number;
        color?: string;
        align: string;
        style?: string;
      }) => ReturnType;
    };
  }
}
export const Circle = Node.create<CircleOptions>({
  name: "circle",

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
        tag: 'div[data-type="circle"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "circle",
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
        default: "circle",
      },
      size: {
        default: 100,
      },
      color: {
        default: "#3498db",
      },
      class: {
        default: "",
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attrs) => {
          return {
            class: attrs.class || null,
          };
        },
      },
      style: {
        default:
          "background-color: red; width: 200px; height: 200px; border-radius: 50%",
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attrs) => {
          return {
            style: attrs.style || null,
          };
        },
      },
      align: {
        default: "right",
        parseHTML: (element) => element.getAttribute("data-align") || "left",
        renderHTML: (attrs) => {
          return {
            "data-align": attrs.align,
          };
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CircleNodeView);
  },

  addCommands() {
    return {
      insertCircle:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },
});
