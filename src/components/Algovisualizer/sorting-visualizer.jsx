"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, RotateCcw, Shuffle } from "lucide-react"
import { cn } from "@/lib/utils"

const algorithmInfo = {
  bubble: {
    name: "Bubble Sort",
    complexity: "O(n²)",
    description: "Repeatedly swaps adjacent elements if they are in wrong order",
  },
  selection: {
    name: "Selection Sort",
    complexity: "O(n²)",
    description: "Finds minimum element and places it at the beginning",
  },
  insertion: {
    name: "Insertion Sort",
    complexity: "O(n²)",
    description: "Builds sorted array one element at a time",
  },
  merge: {
    name: "Merge Sort",
    complexity: "O(n log n)",
    description: "Divides array in half, sorts, then merges",
  },
  quick: {
    name: "Quick Sort",
    complexity: "O(n log n)",
    description: "Picks a pivot and partitions array around it",
  },
  heap: {
    name: "Heap Sort",
    complexity: "O(n log n)",
    description: "Uses a binary heap data structure to sort",
  },
}

export function SortingVisualizer() {
  const [array, setArray] = useState([])
  const [algorithm, setAlgorithm] = useState("bubble")
  const [speed, setSpeed] = useState(50)
  const [size, setSize] = useState(30)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [comparisons, setComparisons] = useState(0)
  const [swaps, setSwaps] = useState(0)
  const stopRef = useRef(false)
  const pauseRef = useRef(false)

  const generateArray = useCallback(() => {
    const newArray = []
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 100) + 5,
        state: "default",
      })
    }
    setArray(newArray)
    setComparisons(0)
    setSwaps(0)
  }, [size])

  useEffect(() => {
    generateArray()
  }, [generateArray])

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const waitWhilePaused = async () => {
    while (pauseRef.current && !stopRef.current) {
      await delay(100)
    }
  }

  const updateArray = async (newArray, addComparison = false, addSwap = false) => {
    if (stopRef.current) return
    await waitWhilePaused()
    setArray([...newArray])
    if (addComparison) setComparisons((c) => c + 1)
    if (addSwap) setSwaps((s) => s + 1)
    await delay(Math.max(5, 105 - speed))
  }

  const bubbleSort = async () => {
    const arr = [...array]
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopRef.current) return
        arr[j].state = "comparing"
        arr[j + 1].state = "comparing"
        await updateArray(arr, true)

        if (arr[j].value > arr[j + 1].value) {
          arr[j].state = "swapping"
          arr[j + 1].state = "swapping"
          await updateArray(arr)
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          await updateArray(arr, false, true)
        }

        arr[j].state = "default"
        arr[j + 1].state = "default"
      }
      arr[arr.length - 1 - i].state = "sorted"
    }
    arr[0].state = "sorted"
    await updateArray(arr)
  }

  const selectionSort = async () => {
    const arr = [...array]
    for (let i = 0; i < arr.length - 1; i++) {
      if (stopRef.current) return
      let minIdx = i
      arr[i].state = "comparing"
      await updateArray(arr)

      for (let j = i + 1; j < arr.length; j++) {
        if (stopRef.current) return
        arr[j].state = "comparing"
        await updateArray(arr, true)

        if (arr[j].value < arr[minIdx].value) {
          if (minIdx !== i) arr[minIdx].state = "default"
          minIdx = j
          arr[minIdx].state = "pivot"
        } else {
          arr[j].state = "default"
        }
        await updateArray(arr)
      }

      if (minIdx !== i) {
        arr[i].state = "swapping"
        arr[minIdx].state = "swapping"
        await updateArray(arr)
        ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
        await updateArray(arr, false, true)
      }

      arr[i].state = "sorted"
      if (minIdx !== i) arr[minIdx].state = "default"
    }
    arr[arr.length - 1].state = "sorted"
    await updateArray(arr)
  }

  const insertionSort = async () => {
    const arr = [...array]
    if (arr.length > 0) {
      arr[0].state = "sorted"
      await updateArray(arr)
    }

    for (let i = 1; i < arr.length; i++) {
      if (stopRef.current) return
      const key = arr[i]
      key.state = "comparing"
      await updateArray(arr)

      let j = i - 1
      while (j >= 0 && arr[j].value > key.value) {
        if (stopRef.current) return
        arr[j].state = "comparing"
        await updateArray(arr, true)
        arr[j + 1] = arr[j]
        arr[j + 1].state = "swapping"
        await updateArray(arr, false, true)
        arr[j].state = "sorted"
        j--
      }
      arr[j + 1] = key
      arr[j + 1].state = "sorted"
      await updateArray(arr)
    }
  }

  const mergeSort = async () => {
    const arr = [...array]

    const merge = async (left, mid, right) => {
      const leftArr = arr.slice(left, mid + 1)
      const rightArr = arr.slice(mid + 1, right + 1)

      let i = 0,
        j = 0,
        k = left

      while (i < leftArr.length && j < rightArr.length) {
        if (stopRef.current) return
        arr[k].state = "comparing"
        await updateArray(arr, true)

        if (leftArr[i].value <= rightArr[j].value) {
          arr[k] = { ...leftArr[i], state: "swapping" }
          i++
        } else {
          arr[k] = { ...rightArr[j], state: "swapping" }
          j++
        }
        await updateArray(arr, false, true)
        arr[k].state = "default"
        k++
      }

      while (i < leftArr.length) {
        if (stopRef.current) return
        arr[k] = { ...leftArr[i], state: "swapping" }
        await updateArray(arr, false, true)
        arr[k].state = "default"
        i++
        k++
      }

      while (j < rightArr.length) {
        if (stopRef.current) return
        arr[k] = { ...rightArr[j], state: "swapping" }
        await updateArray(arr, false, true)
        arr[k].state = "default"
        j++
        k++
      }
    }

    const sort = async (left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2)
        await sort(left, mid)
        await sort(mid + 1, right)
        await merge(left, mid, right)
      }
    }

    await sort(0, arr.length - 1)
    for (let i = 0; i < arr.length; i++) {
      arr[i].state = "sorted"
    }
    await updateArray(arr)
  }

  const quickSort = async () => {
    const arr = [...array]

    const partition = async (low, high) => {
      const pivot = arr[high]
      pivot.state = "pivot"
      await updateArray(arr)

      let i = low - 1

      for (let j = low; j < high; j++) {
        if (stopRef.current) return -1
        arr[j].state = "comparing"
        await updateArray(arr, true)

        if (arr[j].value < pivot.value) {
          i++
          arr[i].state = "swapping"
          arr[j].state = "swapping"
          await updateArray(arr)
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          await updateArray(arr, false, true)
        }
        arr[j].state = "default"
        if (i >= low) arr[i].state = "default"
      }

      arr[i + 1].state = "swapping"
      arr[high].state = "swapping"
      await updateArray(arr)
      ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      await updateArray(arr, false, true)
      arr[i + 1].state = "sorted"

      return i + 1
    }

    const sort = async (low, high) => {
      if (low < high && !stopRef.current) {
        const pi = await partition(low, high)
        if (pi === -1) return
        await sort(low, pi - 1)
        await sort(pi + 1, high)
      }
    }

    await sort(0, arr.length - 1)
    for (let i = 0; i < arr.length; i++) {
      arr[i].state = "sorted"
    }
    await updateArray(arr)
  }

  const heapSort = async () => {
    const arr = [...array]

    const heapify = async (n, i) => {
      let largest = i
      const left = 2 * i + 1
      const right = 2 * i + 2

      if (left < n) {
        arr[left].state = "comparing"
        await updateArray(arr, true)
        if (arr[left].value > arr[largest].value) {
          largest = left
        }
        arr[left].state = "default"
      }

      if (right < n) {
        arr[right].state = "comparing"
        await updateArray(arr, true)
        if (arr[right].value > arr[largest].value) {
          largest = right
        }
        arr[right].state = "default"
      }

      if (largest !== i) {
        arr[i].state = "swapping"
        arr[largest].state = "swapping"
        await updateArray(arr)
        ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
        await updateArray(arr, false, true)
        arr[i].state = "default"
        arr[largest].state = "default"
        await heapify(n, largest)
      }
    }

    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      if (stopRef.current) return
      await heapify(arr.length, i)
    }

    for (let i = arr.length - 1; i > 0; i--) {
      if (stopRef.current) return
      arr[0].state = "swapping"
      arr[i].state = "swapping"
      await updateArray(arr)
      ;[arr[0], arr[i]] = [arr[i], arr[0]]
      await updateArray(arr, false, true)
      arr[i].state = "sorted"
      arr[0].state = "default"
      await heapify(i, 0)
    }
    arr[0].state = "sorted"
    await updateArray(arr)
  }

  const runSort = async () => {
    setIsRunning(true)
    stopRef.current = false
    pauseRef.current = false
    setComparisons(0)
    setSwaps(0)

    switch (algorithm) {
      case "bubble":
        await bubbleSort()
        break
      case "selection":
        await selectionSort()
        break
      case "insertion":
        await insertionSort()
        break
      case "merge":
        await mergeSort()
        break
      case "quick":
        await quickSort()
        break
      case "heap":
        await heapSort()
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
    generateArray()
  }

  const getBarColor = (state) => {
    switch (state) {
      case "comparing":
        return "bg-chart-1"
      case "swapping":
        return "bg-chart-3"
      case "sorted":
        return "bg-chart-2"
      case "pivot":
        return "bg-chart-4"
      default:
        return "bg-muted-foreground"
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

              <Button onClick={isRunning ? togglePause : runSort} className="text-black border gap-2">
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

              <Button variant="outline" onClick={stop} disabled={!isRunning} className="gap-2 bg-transparent">
                <RotateCcw className="w-4 h-4" /> Reset
              </Button>

              <Button variant="outline" onClick={generateArray} disabled={isRunning} className="gap-2 bg-transparent">
                <Shuffle className="w-4 h-4" /> Shuffle
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Speed: {speed}%</label>
                <Slider value={[speed]} onValueChange={([v]) => setSpeed(v)} min={1} max={100} step={1} />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Array Size: {size}</label>
                <Slider
                  value={[size]}
                  onValueChange={([v]) => {
                    setSize(v)
                    if (!isRunning) generateArray()
                  }}
                  min={10}
                  max={100}
                  step={1}
                  disabled={isRunning}
                />
              </div>
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
              <span className="text-muted-foreground">Time Complexity:</span>
              <span className="font-mono text-primary">{algorithmInfo[algorithm].complexity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Comparisons:</span>
              <span className="font-mono text-chart-1">{comparisons}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Swaps:</span>
              <span className="font-mono text-chart-3">{swaps}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="h-64 md:h-80 flex items-end justify-center gap-0.5 px-4">
            {array.map((bar, index) => (
              <div
                key={index}
                className={cn("transition-all duration-75 rounded-t-sm", getBarColor(bar.state))}
                style={{
                  height: `${bar.value}%`,
                  width: `${Math.max(100 / array.length - 1, 2)}%`,
                }}
              />
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-muted-foreground" />
              <span className="text-muted-foreground">Unsorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-chart-1" />
              <span className="text-muted-foreground">Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-chart-3" />
              <span className="text-muted-foreground">Swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-chart-2" />
              <span className="text-muted-foreground">Sorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-chart-5" />
              <span className="text-muted-foreground">Pivot</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
