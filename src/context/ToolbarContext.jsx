import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const ToolbarContext = createContext({
  targetNode: null,
  setTargetNode: () => {},
  activeAlgorithm: "",
  setActiveAlgorithm: () => {},
  progress: 0,
  setProgress: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
});

export function ToolbarProvider({ children }) {
  const [targetNode, setTargetNode] = useState(null);
  const [activeAlgorithm, setActiveAlgorithm] = useState("");
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <ToolbarContext.Provider
      value={{
        targetNode,
        setTargetNode,
        activeAlgorithm,
        setActiveAlgorithm,
        progress,
        setProgress,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
}

export function useToolbar() {
  return useContext(ToolbarContext);
}

export function ToolbarPortal({ children }) {
  const { targetNode } = useToolbar();
  if (!targetNode) return null;
  return createPortal(children, targetNode);
}
