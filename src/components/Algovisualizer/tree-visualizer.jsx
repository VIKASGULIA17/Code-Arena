"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Play, Pause, RotateCcw, Plus, Search } from "lucide-react"

const algorithmInfo = {
  inorder: {
    name: "Inorder Traversal",
    complexity: "O(n)",
    description: "Left → Root → Right (gives sorted order in BST)",
  },
  preorder: {
    name: "Preorder Traversal",
    complexity: "O(n)",
    description: "Root → Left → Right (useful for copying tree)",
  },
  postorder: {
    name: "Postorder Traversal",
    complexity: "O(n)",
    description: "Left → Right → Root (useful for deletion)",
  },
  levelorder: {
    name: "Level Order Traversal",
    complexity: "O(n)",
    description: "BFS traversal level by level",
  },
  insert: {
    name: "BST Insert",
    complexity: "O(log n)",
    description: "Insert value maintaining BST property",
  },
  search: {
    name: "BST Search",
    complexity: "O(log n)",
    description: "Search for a value in BST",
  },
}

export function TreeVisualizer() {
  const [root, setRoot] = useState(null)
  const [algorithm, setAlgorithm] = useState("inorder")
  const [speed, setSpeed] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [traversalOrder, setTraversalOrder] = useState([])
  const [nodesVisited, setNodesVisited] = useState(0)
  const stopRef = useRef(false)
  const pauseRef = useRef(false)

  const calculatePositions = useCallback(
    (node, x, y, spread) => {
      if (!node) return null

      return {
        ...node,
        x,
        y,
        left: calculatePositions(node.left, x - spread, y + 70, spread * 0.55),
        right: calculatePositions(node.right, x + spread, y + 70, spread * 0.55),
      }
    },
    [],
  )

  const generateTree = useCallback(() => {
    const values = [50, 30, 70, 20, 40, 60, 80, 15, 25, 35, 45]
    let newRoot = null

    const insert = (node, value) => {
      if (!node) {
        return { value, left: null, right: null, x: 0, y: 0, state: "default" }
      }
      if (value < node.value) {
        node.left = insert(node.left, value)
      } else {
        node.right = insert(node.right, value)
      }
      return node
    }

    for (const value of values) {
      newRoot = insert(newRoot, value)
    }

    const positionedRoot = calculatePositions(newRoot, 320, 40, 140)
    setRoot(positionedRoot)
    setTraversalOrder([])
    setNodesVisited(0)
  }, [calculatePositions])

  useEffect(() => {
    generateTree()
  }, [generateTree])

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const waitWhilePaused = async () => {
    while (pauseRef.current && !stopRef.current) {
      await delay(100)
    }
  }

  const resetStates = (node) => {
    if (!node) return null
    return {
      ...node,
      state: "default",
      left: resetStates(node.left),
      right: resetStates(node.right),
    }
  }

  const updateNodeState = async (targetValue, state) => {
    if (stopRef.current) return
    await waitWhilePaused()

    const updateRecursive = (node) => {
      if (!node) return null
      return {
        ...node,
        state: node.value === targetValue ? state : node.state,
        left: updateRecursive(node.left),
        right: updateRecursive(node.right),
      }
    }

    setRoot((prev) => updateRecursive(prev))
    setNodesVisited((prev) => prev + 1)
    await delay(Math.max(100, 400 - speed * 4))
  }

  const inorderTraversal = async (node) => {
    if (!node || stopRef.current) return

    await inorderTraversal(node.left)
    await updateNodeState(node.value, "visiting")
    setTraversalOrder((prev) => [...prev, node.value])
    await updateNodeState(node.value, "visited")
    await inorderTraversal(node.right)
  }

  const preorderTraversal = async (node) => {
    if (!node || stopRef.current) return

    await updateNodeState(node.value, "visiting")
    setTraversalOrder((prev) => [...prev, node.value])
    await updateNodeState(node.value, "visited")
    await preorderTraversal(node.left)
    await preorderTraversal(node.right)
  }

  const postorderTraversal = async (node) => {
    if (!node || stopRef.current) return

    await postorderTraversal(node.left)
    await postorderTraversal(node.right)
    await updateNodeState(node.value, "visiting")
    setTraversalOrder((prev) => [...prev, node.value])
    await updateNodeState(node.value, "visited")
  }

  const levelOrderTraversal = async () => {
    if (!root) return

    const queue = [root]

    while (queue.length > 0 && !stopRef.current) {
      const node = queue.shift()
      await updateNodeState(node.value, "visiting")
      setTraversalOrder((prev) => [...prev, node.value])
      await updateNodeState(node.value, "visited")

      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
  }

  const insertNode = async (value) => {
    const insertRecursive = async (node, x, y, spread) => {
      if (!node) {
        return { value, left: null, right: null, x, y, state: "found" }
      }

      await updateNodeState(node.value, "visiting")

      if (value < node.value) {
        node.left = await insertRecursive(node.left, x - spread, y + 70, spread * 0.55)
      } else {
        node.right = await insertRecursive(node.right, x + spread, y + 70, spread * 0.55)
      }

      await updateNodeState(node.value, "visited")
      return node
    }

    const newRoot = await insertRecursive(root, 320, 40, 140)
    setRoot(newRoot)
  }

  const searchNode = async (node, value) => {
    if (!node || stopRef.current) return false

    await updateNodeState(node.value, "visiting")

    if (node.value === value) {
      await updateNodeState(node.value, "found")
      return true
    }

    await updateNodeState(node.value, "visited")

    if (value < node.value) {
      return searchNode(node.left, value)
    } else {
      return searchNode(node.right, value)
    }
  }

  const runAlgorithm = async () => {
    if (algorithm === "insert" || algorithm === "search") {
      const value = Number.parseInt(inputValue)
      if (isNaN(value)) return
    }

    setIsRunning(true)
    stopRef.current = false
    pauseRef.current = false
    setTraversalOrder([])
    setNodesVisited(0)
    setRoot((prev) => resetStates(prev))

    await delay(100)

    switch (algorithm) {
      case "inorder":
        await inorderTraversal(root)
        break
      case "preorder":
        await preorderTraversal(root)
        break
      case "postorder":
        await postorderTraversal(root)
        break
      case "levelorder":
        await levelOrderTraversal()
        break
      case "insert":
        {
          const insertValue = Number.parseInt(inputValue)
          if (!isNaN(insertValue)) await insertNode(insertValue)
        }
        break
      case "search":
        {
          const searchValue = Number.parseInt(inputValue)
          if (!isNaN(searchValue)) await searchNode(root, searchValue)
        }
        break
      default:
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
    generateTree()
  }

  const getNodeColor = (state) => {
    switch (state) {
      case "visiting":
        return "fill-chart-3"
      case "visited":
        return "fill-chart-1"
      case "found":
        return "fill-chart-2"
      case "current":
        return "fill-chart-4"
      default:
        return "fill-muted-foreground"
    }
  }

  const renderTree = (node) => {
    if (!node) return null

    return (
      <g key={node.value}>
        {node.left && (
          <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} className="stroke-border" strokeWidth={2} />
        )}
        {node.right && (
          <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} className="stroke-border" strokeWidth={2} />
        )}
        {renderTree(node.left)}
        {renderTree(node.right)}
        <circle
          cx={node.x}
          cy={node.y}
          r={22}
          className={`${getNodeColor(node.state)} transition-colors duration-200`}
        />
        <text x={node.x} y={node.y + 5} className="fill-background text-sm font-medium" textAnchor="middle">
          {node.value}
        </text>
      </g>
    )
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

              {(algorithm === "insert" || algorithm === "search") && (
                <Input
                  type="number"
                  placeholder="Enter value"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-32 bg-secondary text-secondary-foreground border-border"
                  disabled={isRunning}
                />
              )}

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
                ) : algorithm === "insert" ? (
                  <>
                    <Plus className="w-4 h-4" /> Insert
                  </>
                ) : algorithm === "search" ? (
                  <>
                    <Search className="w-4 h-4" /> Search
                  </>
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

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Speed: {speed}%</label>
              <Slider value={[speed]} onValueChange={([v]) => setSpeed(v)} min={1} max={100} step={1} />
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
              <span className="text-muted-foreground">Nodes Visited:</span>
              <span className="font-mono text-chart-1">{nodesVisited}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <svg viewBox="0 0 640 340" className="w-full h-64 md:h-80">
            {renderTree(root)}
          </svg>

          {traversalOrder.length > 0 && (
            <div className="mt-4 p-3 bg-secondary rounded-lg">
              <div className="text-xs text-muted-foreground mb-2">Traversal Order:</div>
              <div className="flex flex-wrap gap-2">
                {traversalOrder.map((value, index) => (
                  <span key={index} className="px-2 py-1 bg-chart-1 text-background rounded text-sm font-mono">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground">Unvisited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-3" />
              <span className="text-muted-foreground">Visiting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-1" />
              <span className="text-muted-foreground">Visited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-2" />
              <span className="text-muted-foreground">Found</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
