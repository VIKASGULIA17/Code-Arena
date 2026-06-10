"use client"

import { useState, useEffect, useRef } from "react"
import { Sidebar } from "@/components/Algovisualizer/sidebar"
import { SortingVisualizer } from "@/components/Algovisualizer/sorting-visualizer"
import { TreeVisualizer } from "@/components/Algovisualizer/tree-visualizer"
import { RecursionVisualizer } from "@/components/Algovisualizer/recursion-visualizer"
import { GraphVisualizer } from "@/components/Algovisualizer/graph-visualizer"
import { InteractiveTreeBuilder } from "@/components/Algovisualizer/tree/InteractiveTreeBuilder"
import { TraversalConverter } from "@/components/Algovisualizer/tree/TraversalConverter"
import { Menu, Maximize, Minimize } from "lucide-react"
import { Link } from "react-router-dom"
import { useTheme } from "@/context/ThemeContext"
import { EnhancedNavbar } from "@/components/Navbar"
import { ToolbarProvider, useToolbar } from "@/context/ToolbarContext"

function AlgoVisualizerPage() {
  const [activeCategory, setActiveCategory] = useState("graph")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const workspaceRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const { setTargetNode, activeAlgorithm, progress, isPlaying } = useToolbar()

  const isDark = resolvedTheme === "dark"
  const bgClass = isDark ? "bg-[#020617] text-[#f1f5f9]" : "bg-[#f8fafc] text-[#0f172a]"

  const toggleFullscreen = () => {
    if (!workspaceRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      workspaceRef.current.requestFullscreen().catch((err) => {
        console.error("Error enabling fullscreen:", err)
      })
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div className={`flex flex-col h-screen ${bgClass}`}>
      <style>{`
        @keyframes shimmer-bar {
          0% { left: -33%; }
          100% { left: 100%; }
        }
        .animate-shimmer-bar {
          animation: shimmer-bar 1.5s infinite linear;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ── Global Navbar ── */}
      <EnhancedNavbar />

      {/* ── Main Layout Container ── */}
      <div className="pt-16 flex flex-1 overflow-hidden bg-slate-50 dark:bg-slate-950">
        
        {/* ── Sidebar (Left) ── */}
        <Sidebar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          theme={resolvedTheme}
        />

        {/* ── Workspace Area (Right) ── */}
        <div
          ref={workspaceRef}
          className="flex-1 flex flex-col overflow-hidden relative"
        >
          {/* ── Sticky Workspace Toolbar ── */}
          <div className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shrink-0 min-h-14 flex items-center py-2 md:py-0">
            <div className="px-4 flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
              {/* Left: Breadcrumbs / Active states */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 flex-shrink-0">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mr-2"
                  title="Categories"
                >
                  <Menu size={13} />
                  <span>Categories</span>
                </button>

                <span className="text-slate-500 dark:text-slate-400 font-medium text-xs">Visualizer</span>
                <span className="text-slate-300 dark:text-slate-700">/</span>
                <span className="text-slate-900 dark:text-white capitalize font-bold text-sm">
                  {activeCategory.replace("_", " ")}
                </span>
              </div>

              {/* Right: Controls & Fullscreen */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none justify-start md:ml-auto max-w-full min-w-0">
                {/* Target for Portal */}
                <div
                  ref={setTargetNode}
                  className="flex items-center gap-2 flex-shrink-0"
                />

                {/* Fullscreen button */}
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300 flex-shrink-0"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize size={13} /> : <Maximize size={13} />}
                  <span className="hidden md:inline">{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
                </button>
              </div>
            </div>

            {/* Global Progress Bar */}
            {progress > 0 ? (
              <div className="h-[2px] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden absolute bottom-0 left-0">
                <div
                  className="h-full bg-gradient-to-r from-indigo-50 to-purple-600 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            ) : isPlaying ? (
              <div className="h-[2px] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative absolute bottom-0 left-0">
                <div className="h-full w-1/3 bg-gradient-to-r from-indigo-50 to-purple-600 absolute animate-shimmer-bar" />
              </div>
            ) : null}
          </div>

          {/* ── Main Canvas (Right-Bottom) ── */}
          <main className="flex-1 overflow-auto relative">
            {activeCategory === "sorting" && <SortingVisualizer theme={resolvedTheme} />}
            {activeCategory === "graph" && <GraphVisualizer theme={resolvedTheme} />}
            {activeCategory === "tree" && <TreeVisualizer theme={resolvedTheme} />}
            {activeCategory === "recursion" && <RecursionVisualizer theme={resolvedTheme} />}
            {activeCategory === "tree_builder" && <InteractiveTreeBuilder theme={resolvedTheme} />}
            {activeCategory === "traversal_converter" && <TraversalConverter theme={resolvedTheme} />}
          </main>
        </div>
      </div>
    </div>
  )
}

export default function AlgoVisualizerPageWrapper() {
  return (
    <ToolbarProvider>
      <AlgoVisualizerPage />
    </ToolbarProvider>
  )
}
