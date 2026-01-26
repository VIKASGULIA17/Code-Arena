"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Algovisualizer/sidebar"
import { SortingVisualizer } from "@/components/Algovisualizer/sorting-visualizer"
import { TreeVisualizer } from "@/components/Algovisualizer/tree-visualizer"
import { RecursionVisualizer } from "@/components/Algovisualizer/recursion-visualizer"
import { GraphVisualizer } from "@/components/Algovisualizer/graph-visualizer"
import { ArrowRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("sorting")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-border flex items-center px-4 gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <ArrowRight
            onClick={() =>navigate(-1)}
            className="rotate-180 bg-gray-200 p-2 rounded-full border-2 border-white cursor-pointer"
            size={40}

          />

          <h1 className="text-xl font-semibold text-foreground">Algorithm Visualizer</h1>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-6">
          {activeCategory === "sorting" && <SortingVisualizer />}
          {activeCategory === "graph" && <GraphVisualizer />}
          {activeCategory === "tree" && <TreeVisualizer />}
          {activeCategory === "recursion" && <RecursionVisualizer />}
        </div>
      </main>
    </div>
  )
}
