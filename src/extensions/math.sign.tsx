// extensions/Math.ts
import { Node, mergeAttributes } from "@tiptap/core";
import katex from "katex";

export const Math = Node.create({
  name: "math",

  group: "inline",

  inline: true,

  atom: true,

  addAttributes() {
    return {
      formula: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-math]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      { ...HTMLAttributes, "data-math": "true" },
      HTMLAttributes.formula,
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const span = document.createElement("span");
      span.setAttribute("data-math", "true");

      try {
        katex.render(node.attrs.formula, span, {
          throwOnError: false,
        });
      } catch (err) {
        span.innerHTML = node.attrs.formula;
      }

      return {
        dom: span,
      };
    };
  },
});
