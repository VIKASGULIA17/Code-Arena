"use client"

import { cn } from "@/lib/utils"
import { BarChart3, GitBranch, TreeDeciduous, Repeat, X, Cpu, Box, ListTree } from "lucide-react"

const categories = [
  {
    id: "sorting",
    label: "Sorting",
    icon: BarChart3,
    description: "Bubble · Quick · Merge · Heap",
    color: "#6366f1",
    badge: "5 algos",
  },
  {
    id: "graph",
    label: "Graph",
    icon: GitBranch,
    description: "Dijkstra · BFS · DFS · A*",
    color: "#10b981",
    badge: "4 algos",
  },
  {
    id: "tree",
    label: "Trees",
    icon: TreeDeciduous,
    description: "BST · Inorder · Preorder · AVL",
    color: "#f59e0b",
    badge: "3 algos",
  },
  {
    id: "recursion",
    label: "Recursion",
    icon: Repeat,
    description: "Fibonacci · Factorial · Hanoi",
    color: "#ec4899",
    badge: "3 algos",
  },
  {
    id: "tree_builder",
    label: "Tree Builder",
    icon: Box,
    description: "Interactive BST Construction",
    color: "#10b981",
    badge: "New",
  },
  {
    id: "traversal_converter",
    label: "Traversal Converter",
    icon: ListTree,
    description: "Binary Tree to Array Trace",
    color: "#a855f7",
    badge: "New",
  },
]

export function Sidebar({ activeCategory, setActiveCategory, isOpen, onClose, theme = "dark" }) {
  const isDark = theme === "dark"
  const c = {
    bg:     isDark ? "#0f172a" : "#ffffff", // Slate 900 / White
    border: isDark ? "#1e293b" : "#e2e8f0", // Slate 800 / Slate 200
    text:   isDark ? "#f1f5f9" : "#0f172a", // Slate 100 / Slate 900
    muted:  isDark ? "#94a3b8" : "#64748b", // Slate 400 / Slate 500
    hover:  isDark ? "#1e293b" : "#f1f5f9", // Slate 800 / Slate 100
    active: isDark ? "#1e293b" : "#f1f5f9", // Slate 800 / Slate 100
    tip:    isDark ? "#020617" : "#f8fafc", // Slate 950 / Slate 50
    kbd:    isDark ? "#1e293b" : "#e2e8f0", // Slate 800 / Slate 200
  }
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed lg:relative z-50 h-full flex flex-col transition-transform duration-250",
          "w-64 border-r",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
        style={{ background: c.bg, borderColor: c.border }}
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 flex-shrink-0 border-b" style={{ borderColor: c.border }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm block leading-none" style={{ color: c.text }}>AlgoViz</span>
              <span className="text-[10px]" style={{ color: c.muted }}>Interactive Visualizer</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg transition-colors"
              style={{ color: c.muted }}
              onMouseOver={e => e.currentTarget.style.background = c.hover}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
            >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest px-2 pb-1" style={{ color: c.muted }}>Categories</p>
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); onClose() }}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 group",
                  isActive ? "" : "",
                )}
                style={isActive ? { background: c.active } : {}}
                onMouseOver={e => { if (!isActive) e.currentTarget.style.background = c.hover }}
                onMouseOut={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                {/* Icon box */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                  style={{
                    background: isActive ? cat.color : (isDark ? "#1e293b" : "#f1f5f9"),
                    boxShadow: isActive ? `0 4px 12px ${cat.color}40` : "none",
                  }}
                >
                  <Icon size={16} style={{ color: isActive ? "#fff" : cat.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className="text-sm font-semibold truncate"
                      style={{ color: isActive ? (isDark ? "#fff" : "#0f172a") : c.muted }}
                    >
                      {cat.label}
                    </span>
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: isActive ? `${cat.color}25` : (isDark ? "#1e293b" : "#f1f5f9"),
                        color: isActive ? cat.color : c.muted,
                      }}
                    >
                      {cat.badge}
                    </span>
                  </div>
                   <p className="text-[10px] mt-0.5 truncate" style={{ color: c.muted }}>{cat.description}</p>
                </div>
              </button>
            )
          })}
        </nav>

        {/* Footer tip */}
        <div className="p-4 flex-shrink-0 border-t" style={{ borderColor: c.border }}>
          <div className="bg-tip rounded-xl p-3" style={{ background: c.tip }}>
            <p className="text-[10px] leading-relaxed" style={{ color: c.muted }}>
              💡 <span className="font-semibold" style={{ color: c.text }}>Tip:</span> Click on nodes or bars to interact.
              Use <kbd className="px-1 py-0.5 rounded text-[9px]" style={{ background: c.kbd, color: c.text }}>Set Start</kbd> /
              <kbd className="px-1 py-0.5 rounded text-[9px]" style={{ background: c.kbd, color: c.text }}> Set End</kbd> to pick source & target.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
