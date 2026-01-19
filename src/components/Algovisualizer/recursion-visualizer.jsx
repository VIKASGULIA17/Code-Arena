"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Play, Pause, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const algorithmInfo = {
  fibonacci: {
    name: "Fibonacci",
    complexity: "O(2^n)",
    description: "F(n) = F(n-1) + F(n-2), classic recursive example",
  },
  factorial: {
    name: "Factorial",
    complexity: "O(n)",
    description: "n! = n × (n-1)!, demonstrates linear recursion",
  },
  hanoi: {
    name: "Tower of Hanoi",
    complexity: "O(2^n)",
    description: "Move disks between pegs following rules",
  },
}

export function RecursionVisualizer() {
  const [algorithm, setAlgorithm] = useState("fibonacci")
  const [speed, setSpeed] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [inputValue, setInputValue] = useState("6")
  const [callStack, setCallStack] = useState([])
  const [totalCalls, setTotalCalls] = useState(0)
  const [hanoiDisks, setHanoiDisks] = useState([])
  const [hanoiMoves, setHanoiMoves] = useState(0)
  const stopRef = useRef(false)
  const pauseRef = useRef(false)
  const callIdRef = useRef(0)

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const waitWhilePaused = async () => {
    while (pauseRef.current && !stopRef.current) {
      await delay(100)
    }
  }

  const pushToStack = async (name, args) => {
    if (stopRef.current) return -1
    await waitWhilePaused()

    const id = callIdRef.current++
    setCallStack((prev) => [...prev, { id, name, args, state: "active" }])
    setTotalCalls((prev) => prev + 1)
    await delay(Math.max(50, 300 - speed * 3))
    return id
  }

  const updateStackFrame = async (id, updates) => {
    if (stopRef.current) return
    await waitWhilePaused()

    setCallStack((prev) => prev.map((frame) => (frame.id === id ? { ...frame, ...updates } : frame)))
    await delay(Math.max(50, 200 - speed * 2))
  }

  const popFromStack = async (id) => {
    if (stopRef.current) return
    await waitWhilePaused()

    await updateStackFrame(id, { state: "returning" })
    await delay(Math.max(50, 200 - speed * 2))
    setCallStack((prev) => prev.filter((frame) => frame.id !== id))
  }

  const fibonacci = async (n) => {
    if (stopRef.current) return 0

    const frameId = await pushToStack("fib", `n=${n}`)
    if (frameId === -1) return 0

    await updateStackFrame(frameId, { state: "computing" })

    if (n <= 1) {
      await updateStackFrame(frameId, { result: `${n}`, state: "complete" })
      await popFromStack(frameId)
      return n
    }

    const left = await fibonacci(n - 1)
    if (stopRef.current) return 0
    const right = await fibonacci(n - 2)
    if (stopRef.current) return 0

    const result = left + right
    await updateStackFrame(frameId, { result: `${result}`, state: "complete" })
    await popFromStack(frameId)
    return result
  }

  const factorial = async (n) => {
    if (stopRef.current) return 1

    const frameId = await pushToStack("fact", `n=${n}`)
    if (frameId === -1) return 1

    await updateStackFrame(frameId, { state: "computing" })

    if (n <= 1) {
      await updateStackFrame(frameId, { result: "1", state: "complete" })
      await popFromStack(frameId)
      return 1
    }

    const subResult = await factorial(n - 1)
    if (stopRef.current) return 1

    const result = n * subResult
    await updateStackFrame(frameId, { result: `${result}`, state: "complete" })
    await popFromStack(frameId)
    return result
  }

  const initHanoi = (n) => {
    const disks = []
    for (let i = n; i >= 1; i--) {
      disks.push({ size: i, peg: 0 })
    }
    setHanoiDisks(disks)
    setHanoiMoves(0)
  }

  const moveDisk = async (from, to) => {
    if (stopRef.current) return
    await waitWhilePaused()

    setHanoiDisks((prev) => {
      const disks = [...prev]
      const diskIndex = disks.findIndex(
        (d) => d.peg === from && !disks.some((other) => other.peg === from && other.size < d.size),
      )
      if (diskIndex !== -1) {
        disks[diskIndex] = { ...disks[diskIndex], peg: to }
      }
      return disks
    })
    setHanoiMoves((prev) => prev + 1)
    await delay(Math.max(100, 400 - speed * 4))
  }

  const hanoi = async (n, from, to, aux) => {
    if (stopRef.current || n === 0) return

    const frameId = await pushToStack("hanoi", `n=${n}, ${from}→${to}`)
    if (frameId === -1) return

    await updateStackFrame(frameId, { state: "computing" })

    await hanoi(n - 1, from, aux, to)
    if (stopRef.current) return

    await moveDisk(from, to)
    if (stopRef.current) return

    await updateStackFrame(frameId, { state: "complete" })

    await hanoi(n - 1, aux, to, from)
    if (stopRef.current) return

    await popFromStack(frameId)
  }

  const runAlgorithm = async () => {
    const n = Number.parseInt(inputValue)
    if (isNaN(n) || n < 0) return

    setIsRunning(true)
    stopRef.current = false
    pauseRef.current = false
    callIdRef.current = 0
    setCallStack([])
    setTotalCalls(0)

    if (algorithm === "hanoi") {
      initHanoi(Math.min(n, 6))
    }

    await delay(100)

    switch (algorithm) {
      case "fibonacci":
        await fibonacci(Math.min(n, 10))
        break
      case "factorial":
        await factorial(Math.min(n, 12))
        break
      case "hanoi":
        await hanoi(Math.min(n, 6), 0, 2, 1)
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
    setCallStack([])
    setHanoiDisks([])
    setHanoiMoves(0)
  }

  const getFrameColor = (state) => {
    switch (state) {
      case "active":
        return "bg-chart-1"
      case "computing":
        return "bg-chart-3"
      case "returning":
        return "bg-chart-4"
      case "complete":
        return "bg-chart-2"
      default:
        return "bg-muted"
    }
  }

  const getMaxInput = () => {
    switch (algorithm) {
      case "fibonacci":
        return 10
      case "factorial":
        return 12
      case "hanoi":
        return 6
      default:
        return 10
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
              <Select
                value={algorithm}
                onValueChange={(v) => setAlgorithm(v)}
                disabled={isRunning}
              >
                <SelectTrigger className="w-40 bg-secondary text-secondary-foreground border-border">
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

              <Input
                type="number"
                placeholder={`n (max ${getMaxInput()})`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-32 bg-secondary text-secondary-foreground border-border"
                disabled={isRunning}
                min={0}
                max={getMaxInput()}
              />

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
              <span className="text-muted-foreground">Total Calls:</span>
              <span className="font-mono text-chart-1">{totalCalls}</span>
            </div>
            {algorithm === "hanoi" && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Moves:</span>
                <span className="font-mono text-chart-3">{hanoiMoves}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-card-foreground">Call Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 md:h-80 overflow-y-auto space-y-2">
              {callStack.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  Stack is empty - click Start to begin
                </div>
              ) : (
                [...callStack].reverse().map((frame, index) => (
                  <div
                    key={frame.id}
                    className={cn(
                      "p-3 rounded-lg transition-all duration-200",
                      getFrameColor(frame.state),
                      index === 0 ? "ring-2 ring-primary" : "",
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm text-background">
                        {frame.name}({frame.args})
                      </span>
                      {frame.result && <span className="font-mono text-sm text-background/80">→ {frame.result}</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {algorithm === "hanoi" ? (
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-card-foreground">Tower of Hanoi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 md:h-80 flex items-end justify-around px-4">
                {[0, 1, 2].map((peg) => {
                  const pegsDisks = hanoiDisks.filter((d) => d.peg === peg).sort((a, b) => b.size - a.size)

                  return (
                    <div key={peg} className="flex flex-col items-center">
                      <div className="relative w-32 h-48 flex flex-col-reverse items-center">
                        {/* Peg */}
                        <div className="absolute bottom-0 w-2 h-40 bg-muted-foreground rounded-t" />
                        {/* Base */}
                        <div className="w-28 h-2 bg-muted-foreground rounded" />
                        {/* Disks */}
                        <div className="absolute bottom-2 flex flex-col-reverse items-center gap-1">
                          {pegsDisks.map((disk) => (
                            <div
                              key={disk.size}
                              className="h-5 rounded transition-all duration-300"
                              style={{
                                width: `${disk.size * 18 + 20}px`,
                                backgroundColor: `hsl(${disk.size * 40}, 70%, 50%)`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {peg === 0 ? "Source" : peg === 1 ? "Auxiliary" : "Target"}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-card-foreground">Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 md:h-80 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-mono text-primary">{algorithm === "fibonacci" ? "F" : "n!"}</div>
                  <div className="text-sm text-muted-foreground">
                    {algorithm === "fibonacci" ? "F(n) = F(n-1) + F(n-2)" : "n! = n × (n-1)!"}
                  </div>
                  <div className="text-xs text-muted-foreground">Watch the call stack on the left</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-chart-1" />
          <span className="text-muted-foreground">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-chart-3" />
          <span className="text-muted-foreground">Computing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-chart-4" />
          <span className="text-muted-foreground">Returning</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-chart-2" />
          <span className="text-muted-foreground">Complete</span>
        </div>
      </div>
    </div>
  )
}
