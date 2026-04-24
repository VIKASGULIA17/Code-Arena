"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Algovisualizer/sidebar"
import { SortingVisualizer } from "@/components/Algovisualizer/sorting-visualizer"
import { TreeVisualizer } from "@/components/Algovisualizer/tree-visualizer"
import { RecursionVisualizer } from "@/components/Algovisualizer/recursion-visualizer"
import { GraphVisualizer } from "@/components/Algovisualizer/graph-visualizer"
import { InteractiveTreeBuilder } from "@/components/Algovisualizer/tree/InteractiveTreeBuilder"
import { TraversalConverter } from "@/components/Algovisualizer/tree/TraversalConverter"
import { ArrowLeft, Menu, Code2, Cpu, Sun, Moon } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import { useAppContext } from "@/context/AppContext"
import { useTheme } from "@/context/ThemeContext"

export default function AlgoVisualizerPage() {
  const [activeCategory, setActiveCategory] = useState("graph")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const { isJwtExist, userDetails, username } = useAppContext()
  const { resolvedTheme, cycleTheme } = useTheme()

  // Derive theme string for child components that still use the "light"/"dark" prop
  const theme = resolvedTheme
  const isDark = resolvedTheme === "dark"

  const bgClass   = isDark ? "bg-[#020617] text-[#f1f5f9]" : "bg-[#f8fafc] text-[#0f172a]"
  const headerBg  = isDark ? "bg-[#0f172a]/90 border-[#1e293b]" : "bg-[#ffffff]/90 border-[#e2e8f0]"
  const btnClass  = isDark ? "bg-[#1e293b] hover:bg-[#334155] text-[#94a3b8]" : "bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#64748b]"

  return (
    <div className={`flex flex-col h-screen ${bgClass}`}>

      {/* ── Top bar ── */}
      <header className={`h-14 border-b ${headerBg} backdrop-blur-xl flex items-center justify-between px-4 gap-4 shrink-0 z-30`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${btnClass}`}
            title="Go back"
          >
            <ArrowLeft size={15} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/30">
              <Code2 size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hidden sm:block">
              Code Arena
            </span>
          </Link>
          <span className={isDark ? "text-slate-700" : "text-slate-300"}>|</span>
          <div className="flex items-center gap-1.5">
            <Cpu size={14} className="text-indigo-400" />
            <h1 className={`text-sm font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>Algorithm Visualizer</h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Theme toggle — now uses global ThemeContext */}
          <button
            onClick={cycleTheme}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${btnClass}`}
            title="Toggle theme"
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
            {isDark ? "Light" : "Dark"}
          </button>

          {isJwtExist ? (
            <Link to={`/profile/${username}`}>
              <img
                src={userDetails?.avatar || "https://i.pravatar.cc/150"}
                alt="Avatar"
                className={`w-7 h-7 rounded-full border object-cover hover:ring-2 ring-indigo-500 transition-all ${isDark ? "border-slate-700" : "border-slate-200"}`}
              />
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-sm"
            >
              Login
            </Link>
          )}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${btnClass}`}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          theme={theme}
        />

        <main className={`flex-1 overflow-auto ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
          {activeCategory === "sorting"   && <SortingVisualizer theme={theme} />}
          {activeCategory === "graph"     && <GraphVisualizer   theme={theme} />}
          {activeCategory === "tree"      && <TreeVisualizer theme={theme} />}
          {activeCategory === "recursion" && <RecursionVisualizer theme={theme} />}
          {activeCategory === "tree_builder" && <InteractiveTreeBuilder theme={theme} />}
          {activeCategory === "traversal_converter" && <TraversalConverter theme={theme} />}
        </main>
      </div>
    </div>
  )
}
