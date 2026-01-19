"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, GitBranch, TreeDeciduous, Repeat, X } from "lucide-react"

const categories = [
  {
    id: "sorting",
    label: "Sorting",
    icon: BarChart3,
    description: "Bubble, Quick, Merge, Selection, Insertion",
  },
  { id: "graph", label: "Graph", icon: GitBranch, description: "Dijkstra, BFS, DFS" },
  { id: "tree", label: "Tree", icon: TreeDeciduous, description: "BST, Traversals" },
  { id: "recursion", label: "Recursion", icon: Repeat, description: "Fibonacci, Factorial, Tower of Hanoi" },
]

export function Sidebar({ activeCategory, setActiveCategory, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          "fixed lg:relative z-50 h-full w-72 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="h-14 border-b border-sidebar-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">AlgoViz</span>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden text-sidebar-foreground" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id

            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  onClose()
                }}
                className={cn(
                  "w-full flex items-start gap-3 p-3 rounded-lg transition-colors text-left",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <Icon
                  className={cn("w-5 h-5 mt-0.5 shrink-0", isActive ? "text-sidebar-primary" : "text-muted-foreground")}
                />
                <div>
                  <div className="font-medium">{category.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{category.description}</div>
                </div>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground">Click on bars/nodes to interact</div>
        </div>
      </aside>
    </>
  )
}
