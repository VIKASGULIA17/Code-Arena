"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, RotateCcw, MousePointer2 } from "lucide-react"


const algorithmInfo = {
  dijkstra: {
    name: "Dijkstra's Algorithm",
    complexity: "O((V + E) log V)",
    description: "Finds shortest path from source to all vertices",
  },
  bfs: {
    name: "Breadth-First Search",
    complexity: "O(V + E)",
    description: "Explores neighbors before going deeper",
  },
  dfs: {
    name: "Depth-First Search",
    complexity: "O(V + E)",
    description: "Explores as far as possible before backtracking",
  },
}

export function GraphVisualizer() {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [algorithm, setAlgorithm] = useState("dijkstra")
  const [speed, setSpeed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [startNode, setStartNode] = useState(null)
  const [endNode, setEndNode] = useState(null)
  const [selectMode, setSelectMode] = useState(null)
  const [visitedCount, setVisitedCount] = useState(0)
  const stopRef = useRef(false)
  const pauseRef = useRef(false)
  const svgRef = useRef(null)

  const generateGraph = useCallback(() => {
    const newNodes = []
    const newEdges = []
    const nodeCount = 12

    const positions = [
      { x: 100, y: 150 },
      { x: 200, y: 80 },
      { x: 320, y: 60 },
      { x: 440, y: 80 },
      { x: 540, y: 150 },
      { x: 200, y: 220 },
      { x: 320, y: 180 },
      { x: 440, y: 220 },
      { x: 100, y: 300 },
      { x: 270, y: 320 },
      { x: 420, y: 320 },
      { x: 540, y: 300 },
    ]

    for (let i = 0; i < nodeCount; i++) {
      newNodes.push({
        id: i,
        x: positions[i].x,
        y: positions[i].y,
        state: "default",
        distance: Number.POSITIVE_INFINITY,
        parent: null,
      })
    }

    // Create edges with weights
    const edgePairs = [
      [0, 1, 4],
      [0, 5, 2],
      [1, 2, 3],
      [1, 6, 5],
      [2, 3, 2],
      [2, 6, 1],
      [3, 4, 3],
      [3, 7, 4],
      [4, 7, 2],
      [5, 6, 3],
      [5, 8, 4],
      [5, 9, 6],
      [6, 7, 2],
      [6, 9, 3],
      [7, 10, 5],
      [7, 11, 3],
      [8, 9, 2],
      [9, 10, 4],
      [10, 11, 2],
    ]

    for (const [from, to, weight] of edgePairs) {
      newEdges.push({ from, to, weight })
    }

    setNodes(newNodes)
    setEdges(newEdges)
    setStartNode(0)
    setEndNode(11)
    setVisitedCount(0)

    // Set initial start/end states
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n, i) => ({
          ...n,
          state: i === 0 ? "start" : i === 11 ? "end" : "default",
        })),
      )
    }, 0)
  }, [])

  useEffect(() => {
    generateGraph()
  }, [generateGraph])

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const waitWhilePaused = async () => {
    while (pauseRef.current && !stopRef.current) {
      await delay(100)
    }
  }

  const getNeighbors = (nodeId) => {
    const neighbors = []
    for (const edge of edges) {
      if (edge.from === nodeId) neighbors.push({ id: edge.to, weight: edge.weight })
      if (edge.to === nodeId) neighbors.push({ id: edge.from, weight: edge.weight })
    }
    return neighbors
  }

  const reconstructPath = async (endId) => {
    const path = []
    let current = endId

    while (current !== null) {
      path.unshift(current)
      current = nodes.find((n) => n.id === current)?.parent ?? null
    }

    for (const nodeId of path) {
      if (stopRef.current) return
      await waitWhilePaused()
      setNodes((prev) =>
        prev.map((n) =>
          n.id === nodeId ? { ...n, state: n.id === startNode ? "start" : n.id === endNode ? "end" : "path" } : n,
        ),
      )
      await delay(Math.max(50, 200 - speed * 2))
    }
  }

  const dijkstra = async () => {
    if (startNode === null) return

    const distances = {}
    const parents = {}
    const visited = new Set()
    const pq = []

    for (const node of nodes) {
      distances[node.id] = Number.POSITIVE_INFINITY
      parents[node.id] = null
    }
    distances[startNode] = 0
    pq.push({ id: startNode, distance: 0 })

    while (pq.length > 0) {
      if (stopRef.current) return
      await waitWhilePaused()

      pq.sort((a, b) => a.distance - b.distance)
      const next = pq.shift()
      if (!next) break
      const { id: currentId } = next

      if (visited.has(currentId)) continue
      visited.add(currentId)
      setVisitedCount(visited.size)

      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          state:
            n.id === currentId
              ? "current"
              : n.id === startNode
                ? "start"
                : n.id === endNode
                  ? "end"
                  : visited.has(n.id)
                    ? "visited"
                    : n.state,
          distance: distances[n.id],
          parent: parents[n.id],
        })),
      )

      await delay(Math.max(50, 200 - speed * 2))

      if (currentId === endNode) {
        await reconstructPath(endNode)
        return
      }

      for (const { id: neighborId, weight } of getNeighbors(currentId)) {
        if (!visited.has(neighborId)) {
          const newDist = distances[currentId] + weight
          if (newDist < distances[neighborId]) {
            distances[neighborId] = newDist
            parents[neighborId] = currentId
            pq.push({ id: neighborId, distance: newDist })
          }
        }
      }
    }
  }

  const bfs = async () => {
    if (startNode === null) return

    const visited = new Set()
    const parents = {}
    const queue = [startNode]
    visited.add(startNode)
    parents[startNode] = null

    while (queue.length > 0) {
      if (stopRef.current) return
      await waitWhilePaused()

      const currentId = queue.shift()
      if (currentId === undefined || currentId === null) break
      setVisitedCount(visited.size)

      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          state:
            n.id === currentId
              ? "current"
              : n.id === startNode
                ? "start"
                : n.id === endNode
                  ? "end"
                  : visited.has(n.id)
                    ? "visited"
                    : n.state,
          parent: parents[n.id] ?? null,
        })),
      )

      await delay(Math.max(50, 200 - speed * 2))

      if (currentId === endNode) {
        await reconstructPath(endNode)
        return
      }

      for (const { id: neighborId } of getNeighbors(currentId)) {
        if (!visited.has(neighborId)) {
          visited.add(neighborId)
          parents[neighborId] = currentId
          queue.push(neighborId)
        }
      }
    }
  }

  const dfs = async () => {
    if (startNode === null) return

    const visited = new Set()
    const parents = {}
    const stack = [startNode]
    parents[startNode] = null

    while (stack.length > 0) {
      if (stopRef.current) return
      await waitWhilePaused()

      const currentId = stack.pop()
      if (currentId === undefined || currentId === null) continue

      if (visited.has(currentId)) continue
      visited.add(currentId)
      setVisitedCount(visited.size)

      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          state:
            n.id === currentId
              ? "current"
              : n.id === startNode
                ? "start"
                : n.id === endNode
                  ? "end"
                  : visited.has(n.id)
                    ? "visited"
                    : n.state,
          parent: parents[n.id] ?? null,
        })),
      )

      await delay(Math.max(50, 200 - speed * 2))

      if (currentId === endNode) {
        await reconstructPath(endNode)
        return
      }

      for (const { id: neighborId } of getNeighbors(currentId)) {
        if (!visited.has(neighborId)) {
          parents[neighborId] = currentId
          stack.push(neighborId)
        }
      }
    }
  }

  const runAlgorithm = async () => {
    setIsRunning(true)
    stopRef.current = false
    pauseRef.current = false
    setVisitedCount(0)

    // Reset node states
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        state: n.id === startNode ? "start" : n.id === endNode ? "end" : "default",
        distance: Number.POSITIVE_INFINITY,
        parent: null,
      })),
    )

    await delay(100)

    switch (algorithm) {
      case "dijkstra":
        await dijkstra()
        break
      case "bfs":
        await bfs()
        break
      case "dfs":
        await dfs()
        break
    }

    setIsRunning(false)
    setIsPaused(false)
  }

  const togglePause = () => {
    pauseRef.current = !pauseRef.current
    setIsPaused(!isPaused)
  }

  const stop = () => {
    stopRef.current = true
    pauseRef.current = false
    setIsRunning(false)
    setIsPaused(false)
    generateGraph()
  }

  const handleNodeClick = (nodeId) => {
    if (isRunning) return

    if (selectMode === "start") {
      setStartNode(nodeId)
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          state: n.id === nodeId ? "start" : n.id === endNode ? "end" : "default",
        })),
      )
      setSelectMode(null)
    } else if (selectMode === "end") {
      setEndNode(nodeId)
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          state: n.id === startNode ? "start" : n.id === nodeId ? "end" : "default",
        })),
      )
      setSelectMode(null)
    }
  }

  const getNodeColor = (state) => {
    switch (state) {
      case "start":
        return "fill-chart-2"
      case "end":
        return "fill-chart-4"
      case "visited":
        return "fill-chart-1"
      case "current":
        return "fill-chart-3"
      case "path":
        return "fill-chart-2"
      default:
        return "fill-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="flex-1 bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-card-foreground">Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Select value={algorithm} onValueChange={(v) => setAlgorithm(v)} disabled={isRunning}>
                <SelectTrigger className="w-48 bg-secondary text-secondary-foreground border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(algorithmInfo).map(([key, info]) => (
                    <SelectItem key={key} value={key}>
                      {info.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={isRunning ? togglePause : runAlgorithm} className="text-black border gap-2">
                {isRunning ? (
                  isPaused ? (
                    <>
                      <Play className="w-4 h-4" /> Resume
                    </>
                  ) : (
                    <>
                      <Pause className="w-4 h-4" /> Pause
                    </>
                  )
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Start
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={stop} className="gap-2 bg-transparent">
                <RotateCcw className="w-4 h-4" /> Reset
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectMode === "start" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectMode(selectMode === "start" ? null : "start")}
                disabled={isRunning}
                className="gap-2"
              >
                <MousePointer2 className="w-4 h-4" />
                {selectMode === "start" ? "Click a node..." : "Set Start"}
              </Button>
              <Button
                variant={selectMode === "end" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectMode(selectMode === "end" ? null : "end")}
                disabled={isRunning}
                className="gap-2"
              >
                <MousePointer2 className="w-4 h-4" />
                {selectMode === "end" ? "Click a node..." : "Set End"}
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Speed: {speed}%</label>
              <Slider value={[speed]} onValueChange={([v]) => setSpeed(v)} min={-50} max={100} step={1} />
            </div>
          </CardContent>
        </Card>

        <Card className="w-full lg:w-64 bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-card-foreground">{algorithmInfo[algorithm].name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{algorithmInfo[algorithm].description}</p>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Complexity:</span>
              <span className="font-mono text-primary">{algorithmInfo[algorithm].complexity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Visited Nodes:</span>
              <span className="font-mono text-chart-1">{visitedCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <svg ref={svgRef} viewBox="0 0 640 380" className="w-full h-64 md:h-80">
            {/* Edges */}
            {edges.map((edge, i) => {
              const fromNode = nodes.find((n) => n.id === edge.from)
              const toNode = nodes.find((n) => n.id === edge.to)
              if (!fromNode || !toNode) return null

              const midX = (fromNode.x + toNode.x) / 2
              const midY = (fromNode.y + toNode.y) / 2

              return (
                <g key={i}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    className="stroke-border"
                    strokeWidth={2}
                  />
                  {algorithm === "dijkstra" && (
                    <text x={midX} y={midY - 8} className="fill-muted-foreground text-xs" textAnchor="middle">
                      {edge.weight}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Nodes */}
            {nodes.map((node) => (
              <g key={node.id} onClick={() => handleNodeClick(node.id)} className="cursor-pointer">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={20}
                  className={`${getNodeColor(node.state)} transition-colors duration-200`}
                />
                <text x={node.x} y={node.y + 5} className="fill-background text-sm font-medium" textAnchor="middle">
                  {node.id}
                </text>
              </g>
            ))}
          </svg>

          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground">Unvisited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-2" />
              <span className="text-muted-foreground">Start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-4" />
              <span className="text-muted-foreground">End</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-3" />
              <span className="text-muted-foreground">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-1" />
              <span className="text-muted-foreground">Visited</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
