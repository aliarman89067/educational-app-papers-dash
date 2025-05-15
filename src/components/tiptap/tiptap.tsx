"use client";

import {
  useEditorUpdateStore,
  useEditorStore,
  useTargetNode,
} from "@/store/zustand";
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
import { SingleInput } from "@/extensions/input-single";
import { Math } from "@/extensions/math.sign";
import { Minus } from "lucide-react";

interface Props {
  id: number;
}

const Tiptap = ({ id }: Props) => {
  const { setEditor, editor: editorContent } = useEditorStore();
  const { updateContent, decreaseCount } = useEditorUpdateStore();

  const getInitialHtml = () => {
    const data = {
      questionNumber: "1",
      paperCode: "0580_w24_qp_43",
      year: 2024,
      paperType: "Theory",
      topic: ["Ratios", "Profit & Loss", "Percentages"],
      isQuestion: true,
      questionText: "Dinari sells fruit and vegetables.",
      isQuestionAnswer: false,
      isDiagram: false,
      diagramLocation: null,
      options: {
        a: {
          isOptionA: true,
          optionText:
            "One day the mass of fruit and vegetables he sells is in the ratio fruit : vegetables = 9 : 8. He sells 48 kg of vegetables. Find the mass of the fruit he sells.",
          isOptionAnswer: true,
          unit: "kg",
          isUnitLeft: false,
          correctAnswer: "54",
          explanation:
            "8 parts = 48 kg, so 1 part = 6 kg. Fruit = 9 × 6 = 54 kg.",
        },
        b: {
          isOptionB: true,
          optionText:
            "On another day he receives $280 for the fruit and vegetables he sells. The $280 is in the ratio (c + 3) : (c - 1). Find the amount he receives from selling the fruit.",
          isOptionAnswer: true,
          unit: "USD",
          isUnitLeft: true,
          correctAnswer: "280 × (c + 3) / [(c + 3) + (c - 1)]",
          explanation:
            "Total parts = (c + 3) + (c - 1) = 2c + 2. Fruit part = (c + 3)/(2c + 2) of $280 ⇒ 280 × (c + 3)/(2c + 2)",
        },
        c: {
          isOptionC: true,
          optionText:
            "In one week Dinari buys fruit and vegetables for $1620. He sells the fruit and vegetables for $1750. Calculate his percentage profit.",
          isOptionAnswer: true,
          unit: "%",
          isUnitLeft: false,
          correctAnswer: "8.02",
          explanation:
            "Profit = 1750 - 1620 = 130. Percentage profit = (130 / 1620) × 100 = 8.02%",
        },
        d: {
          isOptionD: true,
          optionText:
            "In another week Dinari sells fruit and vegetables for $1738. He makes a profit of 10%. Calculate the amount he paid for the fruit and vegetables.",
          isOptionAnswer: true,
          unit: "USD",
          isUnitLeft: true,
          correctAnswer: "1580",
          explanation:
            "Let cost price be x. 1.1x = 1738 ⇒ x = 1738 / 1.1 = 1580",
        },
        e: { isOptionE: false },
        f: { isOptionF: false },
        g: { isOptionG: false },
        h: { isOptionH: false },
      },
    };
    return `
  ${
    data.isQuestion &&
    `
      <p>${data.questionText}</p>
      <p></p>
    `
  }
  ${
    data.isQuestionAnswer
      ? `
    <div data-id="79383f6d-0091-4363-b932-b87fbdb55cd4" name="input" align="right" width="100" height="40" color="#333" optionleft="false" optionright="false" optionlefthtml="" optionrighthtml="" class="single-input" data-type="input"></div><p style="line-height: normal"></p>
    `
      : ""
  }
    ${
      data.options.a.isOptionA &&
      `
        ${
          data.options.a.optionText &&
          `
          <p><b>(a)</b> ${data.options.a.optionText}</p>
          ${
            data.options.a.isOptionAnswer
              ? `
              <div data-id="79383f6d-0091-4363-b932-b87fbdb55cd4" name="input" align="right" width="100" height="40" color="#333" optionleft='${
                data.options.a.isUnitLeft
              }' optionright='${!data.options.a.isUnitLeft}' optionlefthtml='${
                  data.options.a.isUnitLeft && data.options.a.unit
                }' optionrighthtml='${
                  data.options.a.isUnitLeft === false && data.options.a.unit
                }' class="single-input" data-type="input"></div><p style="line-height: normal"></p>
            `
              : ""
          }
          `
        }
      `
    }
    ${
      data.options.b.isOptionB &&
      `
        ${
          data.options.b.optionText &&
          `
          <p><b>(b)</b> ${data.options.b.optionText}</p>
          ${
            data.options.b.isOptionAnswer
              ? `
              <div data-id="79383f6d-0091-4363-b932-b87fbdb55cd4" name="input" align="right" width="100" height="40" color="#333" optionleft='${
                data.options.b.isUnitLeft
              }' optionright='${!data.options.b.isUnitLeft}' optionlefthtml='${
                  data.options.b.isUnitLeft && data.options.b.unit
                }' optionrighthtml='${
                  data.options.b.isUnitLeft === false && data.options.b.unit
                }' class="single-input" data-type="input"></div><p style="line-height: normal"></p>
            `
              : ""
          }
          `
        }
      `
    }
    ${
      data.options.c.isOptionC &&
      `
        ${
          data.options.c.optionText &&
          `
          <p><b>(c)</b> ${data.options.c.optionText}</p>
          ${
            data.options.c.isOptionAnswer
              ? `
              <div data-id="79383f6d-0091-4363-b932-b87fbdb55cd4" name="input" align="right" width="100" height="40" color="#333" optionleft='${
                data.options.c.isUnitLeft
              }' optionright='${!data.options.c.isUnitLeft}' optionlefthtml='${
                  data.options.c.isUnitLeft && data.options.c.unit
                }' optionrighthtml='${
                  data.options.c.isUnitLeft === false && data.options.c.unit
                }' class="single-input" data-type="input"></div><p style="line-height: normal"></p>
            `
              : ""
          }
          `
        }
      `
    }
    ${
      data.options.d.isOptionD &&
      `
        ${
          data.options.d.optionText &&
          `
          <p><b>(d)</b> ${data.options.d.optionText}</p>
          ${
            data.options.d.isOptionAnswer
              ? `
              <div data-id="79383f6d-0091-4363-b932-b87fbdb55cd4" name="input" align="right" width="100" height="40" color="#333" optionleft='${
                data.options.d.isUnitLeft
              }' optionright='${!data.options.d.isUnitLeft}' optionlefthtml='${
                  data.options.d.isUnitLeft && data.options.d.unit
                }' optionrighthtml='${
                  data.options.d.isUnitLeft === false && data.options.d.unit
                }' class="single-input" data-type="input"></div><p style="line-height: normal"></p>
            `
              : ""
          }
          `
        }
      `
    }
`;
  };

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
      if (editor.getJSON().content) {
        updateContent(id, editor.getJSON().content!!);
      }
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
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    extensions: [
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
      Math,
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
    content: getInitialHtml(),
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
