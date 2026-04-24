"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts"
import { Play, Pause, RotateCcw, MousePointer2, Info, TrendingUp } from "lucide-react"
import { GlobalMetricsPanel } from "./GlobalMetricsPanel"
import { ComplexityPanel } from "./ComplexityPanel"

/* ─── algorithm metadata ────────────────────────────── */
const ALGO_META = {
  dijkstra: {
    name: "Dijkstra's Algorithm",
    complexity: "O((V+E) log V)",
    space: "O(V)",
    description: "Greedy shortest-path algorithm using a priority queue. Guarantees optimal path for non-negative weights.",
    timeExplanation: "Explores nodes by distance using a priority queue. Each of V nodes is extracted (O(log V)), and each of E edges is relaxed (O(log V)).",
    spaceExplanation: "Stores distances and the priority queue, which can contain up to V nodes.",
    color: "#6366f1",
  },
  bfs: {
    name: "Breadth-First Search",
    complexity: "O(V + E)",
    space: "O(V)",
    description: "Explores all neighbours level-by-level. Finds shortest path in unweighted graphs.",
    timeExplanation: "Visits every vertex V and every edge E exactly once in the worst case.",
    spaceExplanation: "The queue can hold up to V nodes at the widest level of the graph.",
    color: "#10b981",
  },
  dfs: {
    name: "Depth-First Search",
    complexity: "O(V + E)",
    space: "O(V)",
    description: "Explores as deep as possible before backtracking. Does not guarantee shortest path.",
    timeExplanation: "Visits every vertex V and every edge E exactly once in the worst case.",
    spaceExplanation: "The recursion stack can go as deep as V nodes in a highly unbalanced graph.",
    color: "#f59e0b",
  },
  astar: {
    name: "A* Search",
    complexity: "O(E log V)",
    space: "O(V)",
    description: "Heuristic-guided search combining Dijkstra and greedy best-first. Optimal and complete.",
    timeExplanation: "Similar to Dijkstra, but uses a heuristic to guide the search. In the worst case, it still explores E edges and V vertices.",
    spaceExplanation: "Maintains a priority queue and a map of distances, up to V nodes.",
    color: "#ec4899",
  },
}



/* ─── 16-node layout for a richer graph ────────────── */
const GRAPH_POSITIONS = [
  { x: 80,  y: 180 },  // 0
  { x: 180, y: 80  },  // 1
  { x: 300, y: 60  },  // 2
  { x: 430, y: 80  },  // 3
  { x: 540, y: 180 },  // 4
  { x: 160, y: 200 },  // 5
  { x: 280, y: 170 },  // 6
  { x: 400, y: 200 },  // 7
  { x: 520, y: 300 },  // 8
  { x: 80,  y: 320 },  // 9
  { x: 200, y: 340 },  // 10
  { x: 330, y: 310 },  // 11
  { x: 440, y: 340 },  // 12
  { x: 560, y: 420 },  // 13
  { x: 250, y: 430 },  // 14
  { x: 100, y: 430 },  // 15
]

const GRAPH_EDGES = [
  [0,1,4],[0,5,2],[0,9,6],
  [1,2,3],[1,5,1],[1,6,5],
  [2,3,2],[2,6,4],
  [3,4,3],[3,7,2],
  [4,7,1],[4,8,5],
  [5,6,3],[5,10,4],
  [6,7,2],[6,11,3],
  [7,8,2],[7,11,4],[7,12,6],
  [8,12,3],[8,13,4],
  [9,10,2],[9,15,3],
  [10,11,3],[10,14,4],[10,15,2],
  [11,12,2],[11,14,3],
  [12,13,5],
  [13,8,2],
  [14,15,4],
]

/* helper: euclidean heuristic for A* */
const heuristic = (a, b) => {
  const dx = GRAPH_POSITIONS[a].x - GRAPH_POSITIONS[b].x
  const dy = GRAPH_POSITIONS[a].y - GRAPH_POSITIONS[b].y
  return Math.sqrt(dx * dx + dy * dy) * 0.05
}

export function GraphVisualizer({ theme = "dark" }) {
  const isDark = theme === "dark"
  const c = {
    bg:     isDark ? "#020617" : "#f8fafc", // Slate 950 / Slate 50
    panel:  isDark ? "#0f172a" : "#ffffff", // Slate 900 / White
    inner:  isDark ? "#020617" : "#f1f5f9", // Slate 950 / Slate 100
    border: isDark ? "#1e293b" : "#e2e8f0", // Slate 800 / Slate 200
    text:   isDark ? "#f1f5f9" : "#0f172a", // Slate 100 / Slate 900
    muted:  isDark ? "#94a3b8" : "#64748b", // Slate 400 / Slate 500
    node:   isDark ? "#1e293b" : "#cbd5e1", // Slate 800 / Slate 300
    edge:   isDark ? "#1e293b" : "#cbd5e1", // Slate 800 / Slate 300
    grid:   isDark ? "#1e293b" : "#e2e8f0", // Slate 800 / Slate 200
  }

  const [nodes, setNodes]               = useState([])
  const [edges, setEdges]               = useState([])
  const [pathEdges, setPathEdges]       = useState(new Set())
  const [activeEdges, setActiveEdges]   = useState(new Set())
  const [algorithm, setAlgorithm]       = useState("dijkstra")
  const [speed, setSpeed]               = useState(50)
  const [isRunning, setIsRunning]       = useState(false)
  const [isPaused, setIsPaused]         = useState(false)
  const [startNode, setStartNode]       = useState(0)
  const [endNode, setEndNode]           = useState(13)
  const [selectMode, setSelectMode]     = useState(null)
  const [visitedCount, setVisitedCount] = useState(0)
  const [pathLength, setPathLength]     = useState(null)
  const [elapsed, setElapsed]           = useState(0)
  const [visitedHistory, setVisitedHistory] = useState([]) // [{t, visited}]
  const timerRef = useRef(null)
  const stopRef  = useRef(false)
  const pauseRef = useRef(false)
  const visStepRef = useRef(0)

  /* ── init graph ── */
  const buildGraph = useCallback(() => {
    const n = GRAPH_POSITIONS.map((pos, i) => ({
      id: i, ...pos,
      state: i === 0 ? "start" : i === 13 ? "end" : "default",
      distance: Infinity, parent: null,
    }))
    setNodes(n)
    setEdges(GRAPH_EDGES.map(([from, to, weight]) => ({ from, to, weight })))
    setPathEdges(new Set())
    setActiveEdges(new Set())
    setVisitedCount(0)
    setPathLength(null)
    setElapsed(0)
    setVisitedHistory([])
    visStepRef.current = 0
  }, [])

  useEffect(() => { buildGraph() }, [buildGraph])

  /* ── helpers ── */
  const delay = ms => new Promise(r => setTimeout(r, ms))
  const waitPause = async () => { while (pauseRef.current && !stopRef.current) await delay(50) }
  const stepDelay = () => Math.max(20, 300 - speed * 2.5)

  /* track visited history for chart */
  const trackVisit = (count) => {
    visStepRef.current++
    if (visStepRef.current % 2 === 0) {
      setVisitedHistory(prev => [...prev, { step: visStepRef.current, visited: count }])
    }
  }

  const getNeighbors = useCallback((id, currentEdges) => {
    const result = []
    for (const e of currentEdges) {
      if (e.from === id) result.push({ id: e.to, weight: e.weight })
      if (e.to   === id) result.push({ id: e.from, weight: e.weight })
    }
    return result
  }, [])

  const markEdge = (a, b, set, setter) => {
    setter(prev => {
      const next = new Set(prev)
      next.add(`${Math.min(a,b)}-${Math.max(a,b)}`)
      return next
    })
  }

  const reconstructPath = async (parentsMap, endId, startId) => {
    const path = []
    let cur = endId
    while (cur !== null && cur !== undefined) {
      path.unshift(cur)
      cur = parentsMap[cur]
    }
    let dist = 0
    for (let i = 0; i < path.length - 1; i++) {
      const edge = GRAPH_EDGES.find(([a,b]) =>
        (a === path[i] && b === path[i+1]) || (b === path[i] && a === path[i+1])
      )
      if (edge) dist += edge[2]
      if (stopRef.current) return
      await waitPause()
      markEdge(path[i], path[i+1], pathEdges, setPathEdges)
      setNodes(prev => prev.map(n =>
        n.id === path[i+1]
          ? { ...n, state: n.id === endId ? "end" : n.id === startId ? "start" : "path" }
          : n
      ))
      await delay(stepDelay() * 0.6)
    }
    setPathLength(dist)
  }

  /* ── algorithms ── */
  const runDijkstra = async (currentEdges, sNode, eNode) => {
    const dist = {}, par = {}, vis = new Set(), pq = []
    for (const _ of GRAPH_POSITIONS) dist[_.x] = Infinity; // placeholder init
    GRAPH_POSITIONS.forEach((_, i) => { dist[i] = Infinity; par[i] = null })
    dist[sNode] = 0; pq.push({ id: sNode, d: 0 })

    while (pq.length) {
      if (stopRef.current) return
      await waitPause()
      pq.sort((a,b) => a.d - b.d)
      const { id: cur } = pq.shift()
      if (vis.has(cur)) continue
      vis.add(cur); setVisitedCount(vis.size)

      setNodes(prev => prev.map(n => ({
        ...n,
        state: n.id === cur ? "current"
          : n.id === sNode ? "start"
          : n.id === eNode ? "end"
          : vis.has(n.id) ? "visited"
          : n.state,
        distance: dist[n.id],
      })))

      await delay(stepDelay())
      if (cur === eNode) { await reconstructPath(par, eNode, sNode); return }

      for (const { id: nb, weight } of getNeighbors(cur, currentEdges)) {
        if (!vis.has(nb) && dist[cur] + weight < dist[nb]) {
          dist[nb] = dist[cur] + weight
          par[nb] = cur
          pq.push({ id: nb, d: dist[nb] })
          markEdge(cur, nb, activeEdges, setActiveEdges)
        }
      }
    }
  }

  const runBFS = async (currentEdges, sNode, eNode) => {
    const vis = new Set(), par = {}, queue = [sNode]
    vis.add(sNode); par[sNode] = null

    while (queue.length) {
      if (stopRef.current) return
      await waitPause()
      const cur = queue.shift()
      vis.add(cur); setVisitedCount(vis.size); trackVisit(vis.size)

      setNodes(prev => prev.map(n => ({
        ...n,
        state: n.id === cur ? "current"
          : n.id === sNode ? "start"
          : n.id === eNode ? "end"
          : vis.has(n.id) ? "visited"
          : n.state,
      })))

      await delay(stepDelay())
      if (cur === eNode) { await reconstructPath(par, eNode, sNode); return }

      for (const { id: nb } of getNeighbors(cur, currentEdges)) {
        if (!vis.has(nb)) {
          vis.add(nb); par[nb] = cur; queue.push(nb)
          markEdge(cur, nb, activeEdges, setActiveEdges)
        }
      }
    }
  }

  const runDFS = async (currentEdges, sNode, eNode) => {
    const vis = new Set(), par = {}, stack = [sNode]
    par[sNode] = null

    while (stack.length) {
      if (stopRef.current) return
      await waitPause()
      const cur = stack.pop()
      if (vis.has(cur)) continue
      vis.add(cur); setVisitedCount(vis.size)

      setNodes(prev => prev.map(n => ({
        ...n,
        state: n.id === cur ? "current"
          : n.id === sNode ? "start"
          : n.id === eNode ? "end"
          : vis.has(n.id) ? "visited"
          : n.state,
      })))

      await delay(stepDelay())
      if (cur === eNode) { await reconstructPath(par, eNode, sNode); return }

      for (const { id: nb } of getNeighbors(cur, currentEdges)) {
        if (!vis.has(nb)) {
          par[nb] = cur; stack.push(nb)
          markEdge(cur, nb, activeEdges, setActiveEdges)
        }
      }
    }
  }

  const runAstar = async (currentEdges, sNode, eNode) => {
    const g = {}, par = {}, vis = new Set(), open = []
    GRAPH_POSITIONS.forEach((_, i) => { g[i] = Infinity; par[i] = null })
    g[sNode] = 0
    open.push({ id: sNode, f: heuristic(sNode, eNode) })

    while (open.length) {
      if (stopRef.current) return
      await waitPause()
      open.sort((a,b) => a.f - b.f)
      const { id: cur } = open.shift()
      if (vis.has(cur)) continue
      vis.add(cur); setVisitedCount(vis.size)

      setNodes(prev => prev.map(n => ({
        ...n,
        state: n.id === cur ? "current"
          : n.id === sNode ? "start"
          : n.id === eNode ? "end"
          : vis.has(n.id) ? "visited"
          : n.state,
      })))

      await delay(stepDelay())
      if (cur === eNode) { await reconstructPath(par, eNode, sNode); return }

      for (const { id: nb, weight } of getNeighbors(cur, currentEdges)) {
        if (!vis.has(nb)) {
          const newG = g[cur] + weight
          if (newG < g[nb]) {
            g[nb] = newG; par[nb] = cur
            open.push({ id: nb, f: newG + heuristic(nb, eNode) })
            markEdge(cur, nb, activeEdges, setActiveEdges)
          }
        }
      }
    }
  }

  /* ── run ── */
  const runAlgorithm = async () => {
    setIsRunning(true)
    stopRef.current = false; pauseRef.current = false
    setVisitedCount(0); setPathLength(null); setPathEdges(new Set()); setActiveEdges(new Set())
    setVisitedHistory([]); visStepRef.current = 0

    const startTime = Date.now()
    timerRef.current = setInterval(() => setElapsed(Date.now() - startTime), 100)

    setNodes(prev => prev.map(n => ({
      ...n, state: n.id === startNode ? "start" : n.id === endNode ? "end" : "default",
      distance: Infinity, parent: null,
    })))
    await delay(80)

    switch (algorithm) {
      case "dijkstra": await runDijkstra(edges, startNode, endNode); break
      case "bfs":      await runBFS(edges, startNode, endNode); break
      case "dfs":      await runDFS(edges, startNode, endNode); break
      case "astar":    await runAstar(edges, startNode, endNode); break
    }

    clearInterval(timerRef.current)
    setIsRunning(false); setIsPaused(false)
  }

  const togglePause = () => { pauseRef.current = !pauseRef.current; setIsPaused(p => !p) }
  const reset       = () => { stopRef.current = true; clearInterval(timerRef.current); buildGraph() }

  const handleNodeClick = nodeId => {
    if (isRunning) return
    if (selectMode === "start") {
      setStartNode(nodeId)
      setNodes(prev => prev.map(n => ({ ...n, state: n.id === nodeId ? "start" : n.id === endNode ? "end" : "default" })))
      setSelectMode(null)
    } else if (selectMode === "end") {
      setEndNode(nodeId)
      setNodes(prev => prev.map(n => ({ ...n, state: n.id === startNode ? "start" : n.id === nodeId ? "end" : "default" })))
      setSelectMode(null)
    }
  }

  const meta = ALGO_META[algorithm]

  /* ── node style based on theme ── */
  const NODE_STYLE_T = {
    default:  { fill: isDark ? "#334155" : "#94a3b8",  stroke: isDark ? "#475569" : "#cbd5e1", textFill: isDark ? "#94a3b8" : "#fff",    r: 22 },
    start:    { fill: "#064e3b", stroke: "#34d399", textFill: "#fff", r: 24, glow: "rgba(52,211,153,0.5)", glowColor: "#34d399" },
    end:      { fill: "#7f1d1d", stroke: "#f87171", textFill: "#fff", r: 24, glow: "rgba(248,113,113,0.5)", glowColor: "#f87171" },
    visited:  { fill: isDark ? "#312e81" : "#c4b5fd",  stroke: isDark ? "#818cf8" : "#8b5cf6", textFill: "#fff", r: 22, glow: "rgba(129,140,248,0.3)", glowColor: "#818cf8" },
    current:  { fill: "#006064", stroke: "#00e5ff", textFill: "#fff", r: 26, glow: "rgba(0,255,255,0.6)", glowColor: "#00e5ff" },
    path:     { fill: "#78350f", stroke: "#fbbf24", textFill: "#fff", r: 24, glow: "rgba(251,191,36,0.5)", glowColor: "#fbbf24" },
    frontier: { fill: isDark ? "#4a1d96" : "#c4b5fd", stroke: "#bf5af2", textFill: "#fff", r: 22, glow: "rgba(191,90,242,0.3)", glowColor: "#bf5af2" },
  }

  /* ── edge key helper ── */
  const edgeKey = (a, b) => `${Math.min(a,b)}-${Math.max(a,b)}`

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 h-full" style={{ background: c.bg, color: c.text }}>

      {/* ── Top controls bar ── */}
      <div className="flex flex-wrap items-center gap-3">

        {/* Algorithm selector */}
        <div className="flex gap-1 rounded-xl p-1 flex-wrap" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
          {Object.entries(ALGO_META).map(([key, m]) => (
            <button
              key={key}
              onClick={() => !isRunning && setAlgorithm(key)}
              disabled={isRunning}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${algorithm === key ? "text-white shadow-md" : ""}`}
              style={algorithm === key ? { background: m.color } : { color: c.muted }}
              onMouseOver={e => { if (algorithm !== key) e.currentTarget.style.color = c.text }}
              onMouseOut={e => { if (algorithm !== key) e.currentTarget.style.color = c.muted }}
            >
              {m.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Speed slider */}
        <div className="flex items-center gap-2 rounded-xl px-3 py-1.5" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
          <span className="text-[11px]" style={{ color: c.muted }}>Speed</span>
          <input type="range" min={0} max={100} value={speed} onChange={e => setSpeed(+e.target.value)}
            className="w-20" style={{ accentColor: meta.color }} />
          <span className="text-[11px] font-bold w-8" style={{ color: c.text }}>{speed}%</span>
        </div>

        {/* Playback controls */}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => setSelectMode(m => m === "start" ? null : "start")}
            disabled={isRunning}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${selectMode === "start" ? "text-white shadow-sm" : ""}`}
            style={selectMode === "start" ? { background: "#10b981" } : { background: c.panel, border: `1px solid ${c.border}`, color: c.text }}
          >
            <MousePointer2 size={13} />
            {selectMode === "start" ? "Pick start…" : "Set Start"}
          </button>
          <button
            onClick={() => setSelectMode(m => m === "end" ? null : "end")}
            disabled={isRunning}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${selectMode === "end" ? "text-white shadow-sm" : ""}`}
            style={selectMode === "end" ? { background: "#ef4444" } : { background: c.panel, border: `1px solid ${c.border}`, color: c.text }}
          >
            <MousePointer2 size={13} />
            {selectMode === "end" ? "Pick end…" : "Set End"}
          </button>
          <button
            onClick={isRunning ? togglePause : runAlgorithm}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)` }}
          >
            {isRunning ? (isPaused ? <><Play size={14}/> Resume</> : <><Pause size={14}/> Pause</>) : <><Play size={14}/> Run</>}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ background: c.panel, border: `1px solid ${c.border}`, color: c.text }}
          >
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </div>

      {/* ── Main graph SVG ── */}
      <div className="flex-1 rounded-2xl overflow-hidden relative min-h-[420px]"
        style={{ background: c.inner, border: `1px solid ${c.border}` }}>
        <GlobalMetricsPanel 
          metrics={[
            { label: "Nodes visited", value: visitedCount, color: "#0ea5e9" },
            { label: "Path weight", value: pathLength !== null ? pathLength : "—", color: "#f59e0b" }
          ]}
          timeMs={elapsed}
          theme={theme}
        />
        <ComplexityPanel 
          timeComplexity={meta.complexity}
          spaceComplexity={meta.space}
          timeExplanation={meta.timeExplanation}
          spaceExplanation={meta.spaceExplanation}
          theme={theme}
          accentColor={meta.color}
        />
        {/* Algorithm description overlay */}
        <div className="absolute top-3 left-3 z-10 max-w-[260px] backdrop-blur rounded-xl px-3 py-2 border"
          style={{ background: isDark ? "rgba(30, 41, 59, 0.9)" : "rgba(255, 255, 255, 0.9)", borderColor: c.border }}>
          <div className="flex items-center gap-1.5 mb-1">
            <Info size={11} style={{ color: meta.color }} />
            <span className="text-[11px] font-semibold" style={{ color: meta.color }}>{meta.name}</span>
          </div>
          <p className="text-[10px] leading-relaxed" style={{ color: c.muted }}>{meta.description}</p>
        </div>

        <svg viewBox="0 0 640 500" className="w-full h-full" style={{ minHeight: 420 }}>
          <defs>
            {/* glow filters */}
            {["start","end","current","path"].map(s => (
              <filter key={s} id={`glow-${s}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            ))}
            {/* Dijkstra neon cyan glow */}
            <filter id="dijkstra-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feFlood floodColor="#00ffff" floodOpacity="0.45" />
              <feComposite in2="blur" operator="in" />
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-edge" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* background grid dots */}
          {Array.from({ length: 13 }, (_, r) => Array.from({ length: 17 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={c * 40} cy={r * 40} r={1} fill={c.grid} opacity={0.3} />
          )))}

          {/* Edges */}
          {edges.map((edge, i) => {
            const fn = nodes.find(n => n.id === edge.from)
            const tn = nodes.find(n => n.id === edge.to)
            if (!fn || !tn) return null
            const key = edgeKey(edge.from, edge.to)
            const isPath   = pathEdges.has(key)
            const isActive = activeEdges.has(key)
            const mx = (fn.x + tn.x) / 2
            const my = (fn.y + tn.y) / 2
            return (
              <g key={i}>
                {/* glow copy for path */}
                {isPath && (
                  <line x1={fn.x} y1={fn.y} x2={tn.x} y2={tn.y}
                    stroke="#f59e0b" strokeWidth={6} opacity={0.35}
                    filter="url(#glow-edge)" strokeLinecap="round"
                  />
                )}
                <line
                  x1={fn.x} y1={fn.y} x2={tn.x} y2={tn.y}
                  stroke={isPath ? "#f59e0b" : isActive ? "#6366f1" : (isDark ? "#334155" : "#cbd5e1")}
                  strokeWidth={isPath ? 3 : isActive ? 2 : 1.5}
                  strokeLinecap="round"
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />
                {/* weight label — only for dijkstra/astar */}
                {(algorithm === "dijkstra" || algorithm === "astar") && (
                  <text x={mx} y={my - 6} fill="#64748b" fontSize={9} textAnchor="middle" fontFamily="monospace">
                    {edge.weight}
                  </text>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const s    = NODE_STYLE_T[node.state] || NODE_STYLE_T.default
            const hasGlow = !!s.glowColor
            const isCurrent = node.state === "current"
            return (
              <g
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                style={{ cursor: selectMode ? "crosshair" : "pointer" }}
              >
                {/* Neon pulse rings for current node */}
                {isCurrent && (
                  <>
                    <circle cx={node.x} cy={node.y} r={s.r + 10} fill="none"
                      stroke={s.glowColor} strokeWidth={1.5} opacity={0.2}
                      filter="url(#dijkstra-glow)">
                      <animate attributeName="r" values={`${s.r + 6};${s.r + 14};${s.r + 6}`} dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.35;0.1;0.35" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={node.x} cy={node.y} r={s.r + 5} fill="none"
                      stroke={s.glowColor} strokeWidth={1} opacity={0.3}>
                      <animate attributeName="r" values={`${s.r + 3};${s.r + 8};${s.r + 3}`} dur="1.2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0.12;0.4" dur="1.2s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}
                {/* outer glow ring for non-current glowing states */}
                {hasGlow && !isCurrent && (
                  <circle cx={node.x} cy={node.y} r={s.r + 6} fill="none"
                    stroke={s.glowColor} strokeWidth={2} opacity={0.25}
                  />
                )}
                {/* main circle */}
                <circle
                  cx={node.x} cy={node.y} r={s.r}
                  fill={s.fill} stroke={s.stroke} strokeWidth={2}
                  style={{ transition: "all 0.25s ease", filter: hasGlow ? `drop-shadow(0 0 12px ${s.glow})` : "none" }}
                />
                {/* node label */}
                <text x={node.x} y={node.y + 1} fill={s.textFill}
                  fontSize={11} fontWeight="700" textAnchor="middle" dominantBaseline="middle"
                  fontFamily="monospace"
                >
                  {node.id}
                </text>
                {/* start/end label */}
                {node.id === startNode && (
                  <text x={node.x} y={node.y - s.r - 6} fill="#34d399" fontSize={9} textAnchor="middle" fontWeight="600">S</text>
                )}
                {node.id === endNode && (
                  <text x={node.x} y={node.y - s.r - 6} fill="#f87171" fontSize={9} textAnchor="middle" fontWeight="600">E</text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* ── Live visited-nodes chart (Recharts) ── */}
      {visitedHistory.length > 2 && (
        <div className="rounded-2xl p-4" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp size={12} style={{ color: meta.color }} />
            <span className="text-[11px] font-semibold" style={{ color: c.text }}>Nodes Visited Over Time</span>
          </div>
          <ResponsiveContainer width="100%" height={90}>
            <AreaChart data={visitedHistory} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={meta.color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={meta.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={c.border} opacity={0.4} />
              <XAxis dataKey="step" hide />
              <YAxis tick={{ fill: c.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.panel, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 11, color: c.text }} />
              <Area type="monotone" dataKey="visited" stroke={meta.color} fill="url(#visitGrad)"
                strokeWidth={2} dot={false} isAnimationActive={false} name="Nodes visited" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ── Legend ── */}
      <div className="flex flex-wrap gap-3 justify-center">
        {[
          { label: "Unvisited",  color: isDark ? "#1e293b" : "#cbd5e1" },
          { label: "Start",      color: "#10b981" },
          { label: "End",        color: "#ef4444" },
          { label: "Current",    color: "#7c3aed" },
          { label: "Visited",    color: isDark ? "#3730a3" : "#818cf8" },
          { label: "Shortest Path", color: "#f59e0b" },
          { label: "Exploring", color: "#6366f1" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full flex-shrink-0 border border-white/10" style={{ background: color }} />
            <span className="text-[11px]" style={{ color: c.muted }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
