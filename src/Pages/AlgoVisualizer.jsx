"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Algovisualizer/sidebar"
import { SortingVisualizer } from "@/components/Algovisualizer/sorting-visualizer"
import { TreeVisualizer } from "@/components/Algovisualizer/tree-visualizer"
import { RecursionVisualizer } from "@/components/Algovisualizer/recursion-visualizer"
import { GraphVisualizer } from "@/components/Algovisualizer/graph-visualizer"
import { ArrowLeft, Menu, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, Link } from "react-router-dom"
import { useAppContext } from "@/context/AppContext"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("sorting")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const { isJwtExist, userDetails, username } = useAppContext()

  return (
    <div className="flex flex-col h-screen bg-[#fafafa]">
      {/* Top bar */}
      <header className="h-14 border-b border-slate-200 bg-white/90 backdrop-blur-xl flex items-center justify-between px-4 gap-4 shrink-0 z-30">
        {/* Left: back + logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
            title="Go back"
          >
            <ArrowLeft size={16} className="text-slate-600" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <Code2 size={15} className="text-white" />
            </div>
            <span className="font-bold text-base bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              Code Arena
            </span>
          </Link>
          <span className="text-slate-300">|</span>
          <h1 className="text-sm font-semibold text-slate-700">Algorithm Visualizer</h1>
        </div>

        {/* Right: mobile sidebar toggle + auth */}
        <div className="flex items-center gap-2.5">
          {isJwtExist ? (
            <div className="flex items-center gap-2">
              <Link to={`/profile/${username}`}>
                <img
                  src={userDetails?.avatar || "https://i.pravatar.cc/150"}
                  alt="Avatar"
                  className="w-7 h-7 rounded-full border border-slate-200 object-cover hover:shadow-md transition-shadow duration-200"
                />
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm shadow-indigo-200/50"
            >
              Login
            </Link>
          )}
          <Button variant="ghost" size="icon" className="lg:hidden text-slate-500 hover:bg-slate-100" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main content: sidebar + visualizer */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 flex flex-col overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 to-purple-50/10 pointer-events-none" />
          <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 relative z-10">
            <div className="card-elevated h-full w-full max-w-7xl mx-auto overflow-hidden bg-white flex flex-col">
              <div className="flex-1 overflow-auto">
                {activeCategory === "sorting" && <SortingVisualizer />}
                {activeCategory === "graph" && <GraphVisualizer />}
                {activeCategory === "tree" && <TreeVisualizer />}
                {activeCategory === "recursion" && <RecursionVisualizer />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
