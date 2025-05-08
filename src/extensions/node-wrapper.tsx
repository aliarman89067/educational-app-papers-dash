// extensions/Circle.ts
import { getNodesPercentage } from "@/lib/utils";
import { Node, mergeAttributes } from "@tiptap/core";

export interface CircleOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    circle: {
      insertCircle: (attrs: {
        size?: number;
        color?: string;
        align: string;
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
    const alignment = HTMLAttributes.align || "left";
    const marginMap: any = {
      left: "0 auto 0 0",
      center: "0 auto",
      right: "0 0 0 auto",
    };

    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "circle",
        style: `
          width: ${getNodesPercentage(50)}px;
          height: ${getNodesPercentage(50)}px;
          background-color: ${HTMLAttributes.color};
          border-radius: 50%;
          display: block;
          margin-left: auto;
        `,
      }),
      "",
    ];
  },

  addAttributes() {
    return {
      size: {
        default: 100,
      },
      color: {
        default: "#3498db",
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
