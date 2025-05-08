"use client";
import Tiptap from "@/components/tiptap/tiptap";
import Toolbar from "@/components/tiptap/toolbar";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { SyntheticEvent, useCallback, useState } from "react";
import TextUpdaterNode from "@/components/textUpdaterNode";
import { Resizable, ResizeHandle } from "react-resizable";
const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const initialNodes = [
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];

const nodeTypes = { textUpdater: TextUpdaterNode };

const HomePage = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState<any>([]);
  const [sizes, setSizes] = useState({
    width: 100,
    height: 100,
  });

  const onNodesChange = useCallback((change: any) => {
    return setNodes((nds) => applyNodeChanges(change, nds));
  }, []);

  const onEdgesChange = useCallback((change: any) => {
    return setEdges((eds: any) => applyEdgeChanges(change, eds));
  }, []);

  const onConnect = useCallback((params: any) => {
    return setEdges((eds: any) => addEdge({ ...params, type: "step" }, eds));
  }, []);
  const handleResize = (
    event: SyntheticEvent<Element, Event>,
    {
      node,
      size,
      handle,
    }: {
      node: HTMLElement;
      size: { width: number; height: number };
      handle: ResizeHandle;
    }
  ) => {
    setSizes({
      width: size.width,
      height: size.height,
    });
  };

  return (
    <div className="flex flex-col w-full h-full mx-auto">
      {/* <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
      >
      <Background />
      <Controls /> */}
      <Toolbar />

      {/* <Resizable
        width={sizes.width}
        height={sizes.height}
        onResize={handleResize}
        axis="x"
        lockAspectRatio
      >
        <div
          style={{
            height: `${sizes.height}px`,
            width: `${sizes.width}px`,
          }}
          className={`h-[${sizes.height}px] w-[${sizes.width}px] bg-red-500 rounded-full`}
        ></div>
      </Resizable> */}

      <Tiptap />
      {/* </ReactFlow> */}
    </div>
  );
};
export default HomePage;
