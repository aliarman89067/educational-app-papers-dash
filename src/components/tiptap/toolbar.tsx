"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  useEditorStore,
  useEditorUpdateStore,
  useTargetNode,
} from "@/store/zustand";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDown,
  CircleIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageCircleQuestionIcon,
  MessageSquarePlus,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheck,
  Subscript,
  Superscript,
  TextIcon,
  UnderlineIcon,
  Undo2,
  UploadIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { type Level } from "@tiptap/extension-heading";
import { type ColorResult, SketchPicker } from "react-color";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeight = [
    {
      label: "Default",
      value: "normal",
    },
    {
      label: "Single",
      value: "1",
    },
    {
      label: "1.15",
      value: "1.15",
    },
    {
      label: "1.5",
      value: "1.5",
    },
    {
      label: "Double",
      value: "2",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <ListCollapseIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lineHeight.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-100/80",
              editor?.getAttributes("paragraph").lineHeight === value &&
                "bg-neutral-200/80"
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increament = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };
  const decreament = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decreament}
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 text-sm rounded-sm border border-neutral-400 text-center bg-transparent focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-7 w-10 text-sm rounded-sm bg-transparent cursor-text border border-neutral-400 text-center"
        >
          {currentFontSize}
        </button>
      )}
      <button
        onClick={increament}
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      Icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      Icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lists.map(({ label, Icon, onClick, isActive }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-100/80",
              isActive() && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const AlignButton = () => {
  const { editor } = useEditorStore();
  const { nodeId } = useTargetNode();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      Icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      Icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      Icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      Icon: AlignJustifyIcon,
    },
  ];

  const handleUpdateNode = (value: string) => {
    if (nodeId) {
      const getMargin = () => {
        if (value === "left") {
          return `margin-right: auto`;
        } else if (value === "right") {
          return `margin-left: auto`;
        } else if (value === "center") {
          return `margin-inline: auto`;
        }
      };

      editor?.state.doc.descendants((node, pos) => {
        if (node.attrs.id && node.attrs.id === nodeId) {
          console.log("Matched Node", node);
          editor
            .chain()
            .focus()
            .command(({ tr }) => {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                align: value,
                style: `background-color: black; width: 200px; height: 200px; border-radius: 50%; ${getMargin()}`,
              });
              return true;
            })
            .run();
        }
      });
    } else {
      editor?.chain().focus().setTextAlign(value).run();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignments.map(({ label, value, Icon }) => (
          <button
            disabled={nodeId && value === "justify" ? true : false}
            key={value}
            onClick={() => handleUpdateNode(value)}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-100/80",
              editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };
  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };
    input.click();
  };
  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className="size-4 mr-2" />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <Link2 className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://example.com"
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#ffffff";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="text-sm">A</span>
          <div style={{ backgroundColor: value }} className="h-0.5 w-full" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    {
      label: "Normal text",
      value: 0,
      fontSize: "16px",
    },
    {
      label: "Heading 1",
      value: 1,
      fontSize: "32px",
    },
    {
      label: "Heading 2",
      value: 2,
      fontSize: "24px",
    },
    {
      label: "Heading 3",
      value: 3,
      fontSize: "20px",
    },
    {
      label: "Heading 4",
      value: 4,
      fontSize: "18px",
    },
    {
      label: "Heading 5",
      value: 5,
      fontSize: "16px",
    },
  ];
  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDown className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            style={{ fontSize }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-neutral-200/80")
            )}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// const AlgebraSignButton = () => {
//   const signs = [
//     {
//       Label:"Sin",
//       value:
//     }
//   ]
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
//           <span className="truncate">Algebra Sign</span>
//           <ChevronDown className="ml-2 size-4 shrink-0" />
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
//         {signs.map(({ label, value, fontSize }) => (
//           <button
//             key={value}
//             onClick={() => {
//               if (value === 0) {
//                 editor?.chain().focus().setParagraph().run();
//               } else {
//                 editor
//                   ?.chain()
//                   .focus()
//                   .toggleHeading({ level: value as Level })
//                   .run();
//               }
//             }}
//             style={{ fontSize }}
//             className={cn(
//               "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
//               (value === 0 && !editor?.isActive("heading")) ||
//                 (editor?.isActive("heading", { level: value }) &&
//                   "bg-neutral-200/80")
//             )}
//           >
//             {label}
//           </button>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDown className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-200/80"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  Icon: LucideIcon;
}

const ToolbarButton = ({ onClick, isActive, Icon }: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export default function Toolbar() {
  const { editor } = useEditorStore();
  const { increaseCount } = useEditorUpdateStore();
  const { setNodeId } = useTargetNode();

  const uuid = uuidv4();

  const sections: {
    label: string;
    Icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    setId?: (id: string) => void;
  }[][] = [
    [
      {
        label: "Undo",
        Icon: Undo2,
        onClick: () => editor?.commands.undo(),
      },
      {
        label: "Redo",
        Icon: Redo2,
        onClick: () => editor?.commands.redo(),
      },
      {
        label: "Print",
        Icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        Icon: SpellCheck,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        Icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        Icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        Icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "List Todo",
        Icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        Icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
    [
      {
        label: "Sub Script",
        Icon: Subscript,
        onClick: () => {
          if (editor?.isActive("superscript")) {
            console.log("Unactive Sup Script and run Sub Script");
            editor?.commands.unsetSuperscript();
            editor?.commands.setSubscript();
          } else if (editor?.isActive("subscript")) {
            editor?.commands.unsetSubscript();
          } else {
            editor?.commands.setSubscript();
          }
        },
        isActive: editor?.isActive("subscript"),
      },
      {
        label: "Sup Script",
        Icon: Superscript,
        onClick: () => {
          if (editor?.isActive("subscript")) {
            console.log("Unactive Sub Script and run Sup Script");
            editor?.commands.unsetSubscript();
            editor?.commands.setSuperscript();
          } else if (editor?.isActive("superscript")) {
            editor?.commands.unsetSuperscript();
          } else {
            editor?.commands.setSuperscript();
          }
        },
        isActive: editor?.isActive("superscript"),
      },
      {
        label: "Input",
        Icon: MessageCircleQuestionIcon,
        onClick: () => {
          editor
            ?.chain()
            .focus()
            .insertInput({
              id: uuid,
              align: "right",
              height: 40,
              width: 100,
              optionLeftHtml: "",
              optionRightHtml: "",
            })
            .run();
          setNodeId(uuid);
        },
      },
    ],
  ];

  const handleIncreaseEditor = () => {
    increaseCount();
  };

  return (
    <div className="flex items-center w-full justify-between bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px]">
      <div className="flex items-center gap-0.5 overflow-x-auto">
        {sections[0].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        <div className="w-[1px] h-6 bg-gray-600" />
        <FontFamilyButton />
        <div className="w-[1px] h-6 bg-gray-600" />
        <HeadingLevelButton />
        <div className="w-[1px] h-6 bg-gray-600" />
        <FontSizeButton />
        <div className="w-[1px] h-6 bg-gray-600" />
        {sections[1].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        <div className="w-[1px] h-6 bg-gray-600" />
        {sections[3].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        <div className="w-[1px] h-6 bg-gray-600" />
        <TextColorButton />
        <HighlightColorButton />
        <div className="w-[1px] h-6 bg-gray-600" />
        <LinkButton />
        <ImageButton />
        <AlignButton />
        <LineHeightButton />
        <ListButton />
        {sections[2].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        <Button variant="outline" onClick={handleIncreaseEditor}>
          Add Question +
        </Button>
        <Button onClick={() => editor?.commands.splitBlock()}>Line</Button>
      </div>
    </div>
  );
}
